# Stage 3

## Query Analysis

### Given Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

### Is the Query Accurate?

Yes. The query correctly retrieves all unread notifications for a specific student and displays them in descending order based on creation time.

### Why is the Query Slow?

The database currently contains:

* 50,000 students
* 5,000,000 notifications

If no suitable index exists, the database must scan a large number of rows to:

1. Find records matching the student ID.
2. Filter unread notifications.
3. Sort the results by `createdAt`.

This results in high query execution time as the table grows.

### Recommended Optimization

Create a composite index:

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);
```

Benefits:

* Faster filtering by `studentID`
* Faster filtering by `isRead`
* Faster sorting using `createdAt`

### Computational Cost

Without Index:

```text
O(N)
```

where N is the number of notifications.

With Composite Index:

```text
O(log N)
```

for index lookup operations.

### Should We Add Indexes on Every Column?

No.

Adding indexes on every column is not recommended because:

* Increases storage requirements.
* Slows INSERT operations.
* Slows UPDATE operations.
* Increases maintenance overhead.

Indexes should be added only to columns frequently used in filtering, sorting, and joins.

### Query to Find Students Who Received Placement Notifications in the Last 7 Days

MySQL:

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;
```

PostgreSQL:

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```
# Stage 4

## Problem

Currently, notifications are fetched from the database every time a student loads a page.

With:

* 50,000 students
* 5,000,000 notifications

the database receives a very large number of repeated read requests, causing:

* Increased database load
* Higher response times
* Poor user experience
* Reduced scalability

---

## Solution 1: Redis Caching (Recommended)

Store frequently accessed notifications in Redis.

### Flow

Student Request

↓

Redis Cache

↓

Database (only on cache miss)

### Advantages

* Very fast response time
* Reduces database load significantly
* Improves scalability

### Tradeoffs

* Additional infrastructure required
* Cache invalidation can be complex
* Extra memory consumption

---

## Solution 2: Pagination

Instead of loading all notifications, return a limited number per request.

Example:

```http
GET /notifications?page=1&limit=20
```

### Advantages

* Smaller response payloads
* Faster database queries
* Better frontend performance

### Tradeoffs

* Multiple requests required to view all notifications
* Slightly more complex API design

---

## Solution 3: Real-Time Notifications using WebSockets

Use WebSockets or Socket.IO to push notifications to students instantly.

### Flow

Notification Created

↓

WebSocket Server

↓

Student Client

### Advantages

* Real-time updates
* Eliminates constant polling
* Reduces unnecessary database reads

### Tradeoffs

* Persistent connections required
* More complex implementation
* Additional server resources needed

---

## Solution 4: Database Optimization

Implement proper indexing on:

```sql
(studentID, isRead, createdAt)
```

Benefits:

* Faster filtering
* Faster sorting
* Reduced query execution time

### Tradeoffs

* Increased storage usage
* Slightly slower INSERT and UPDATE operations

---

## Recommended Architecture

Student Client

↓

WebSocket / API

↓

Redis Cache

↓

Notification Service

↓

Database

This architecture minimizes database load, provides faster response times, and scales efficiently as the number of students and notifications grows.

# Stage 5

## Problems in the Current Implementation

### Given Pseudocode

```python id="1r8q7v"
function notify_all(student_ids, message):

    for student_id in student_ids:

        send_email(student_id, message)

        save_to_db(student_id, message)

        push_to_app(student_id, message)
```

### Shortcomings

1. Sequential Processing

* Notifications are sent one student at a time.
* Sending notifications to 50,000 students will take a long time.

2. Poor Scalability

* The system cannot efficiently handle large volumes of notifications.

3. No Retry Mechanism

* If an email fails, the notification is lost.

4. Inconsistent State

* Email may fail while the database record is saved.
* Some students receive notifications while others do not.

5. Single Point of Failure

* Failure of the email service impacts the entire process.

---

## What Happens if Email Fails for 200 Students?

The system becomes inconsistent.

Possible scenario:

* Notification saved in database.
* In-app notification delivered.
* Email not delivered.

As a result, 200 students miss the email communication.

Without retry logic, manual intervention would be required.

---

## Recommended Solution

Use an asynchronous event-driven architecture with a Message Queue.

Examples:

* RabbitMQ
* Apache Kafka
* AWS SQS

### Flow

HR Clicks Notify All

↓

Notification Service

↓

Message Queue

↓

Worker Services

↓

Email Service + In-App Notification Service

---

## Revised Pseudocode

```python id="tv2hmu"
function notify_all(student_ids, message):

    notification_id = create_notification(message)

    for student_id in student_ids:

        queue.publish({
            "student_id": student_id,
            "notification_id": notification_id
        })


worker():

    while true:

        event = queue.consume()

        try:

            save_to_db(
                event.student_id,
                event.notification_id
            )

            send_email(
                event.student_id,
                event.notification_id
            )

            push_to_app(
                event.student_id,
                event.notification_id
            )

        except Exception:

            queue.retry(event)
```

---
