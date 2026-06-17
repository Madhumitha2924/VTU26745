# Vehicle Scheduling Backend

## Problem Statement

A logistics company performs daily vehicle maintenance across multiple depots.

Each maintenance task contains:

- Duration (Mechanic Hours Required)
- Impact Score (Operational Importance)

Each depot has a limited number of mechanic hours available per day.

The objective is to select a subset of maintenance tasks such that:

- Total duration does not exceed available mechanic hours.
- Total operational impact is maximized.

This problem is solved using the 0/1 Knapsack Dynamic Programming Algorithm.

---

## Technologies Used

- Node.js
- JavaScript
- Axios
- Dynamic Programming

---

## Project Structure

```text
vehicle_scheduling_be
│
├── api.js
├── index.js
├── knapsack.js
├── package.json
└── README.md
```

## API Endpoints Used

### Depots API

```http
GET http://4.224.186.213/evaluation-service/depots
```

### Vehicles API

```http
GET http://4.224.186.213/evaluation-service/vehicles
```

## Solution Approach

1. Fetch depot information from API.
2. Fetch vehicle maintenance tasks from API.
3. Apply 0/1 Knapsack Algorithm.
4. Select tasks that maximize impact score.
5. Ensure total duration stays within available mechanic hours.
6. Display results for each depot.

## Installation

```bash
npm install
```

## Run Project

```bash
node index.js
```

## Sample Output

```text
Depot ID: 1
Mechanic Hours Available: 60
Total Duration Used: 60
Maximum Impact: 126
Tasks Selected: 20

Depot ID: 2
Mechanic Hours Available: 135
Total Duration Used: 134
Maximum Impact: 186
Tasks Selected: 33
```

## Algorithm Used

0/1 Knapsack Dynamic Programming

### Time Complexity

```text
O(N × W)
```

Where:

- N = Number of Tasks
- W = Mechanic Hours Capacity

### Space Complexity

```text
O(N × W)
```

## Author

Madhumitha C
VTU26745
