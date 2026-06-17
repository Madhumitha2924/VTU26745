# Vehicle Scheduling Backend

## Overview

This project solves the Vehicle Maintenance Scheduling problem for a logistics company.

Each vehicle maintenance task contains:

- Duration (hours required to complete the task)
- Impact Score (importance of completing the task)

Each depot has a limited number of mechanic hours available per day. The goal is to select the optimal set of maintenance tasks that maximizes the total impact score without exceeding the available mechanic hours.

---

## Problem Statement

Given:

- A list of vehicle maintenance tasks
- Duration and Impact Score for each task
- Mechanic-hour budget for each depot

Determine the subset of tasks that:

1. Does not exceed the available mechanic hours.
2. Maximizes the total operational impact score.

---

## Approach

The problem is modeled as a **0/1 Knapsack Problem**.

### Mapping

| Vehicle Scheduling | Knapsack |
|-------------------|-----------|
| Duration | Weight |
| Impact Score | Value |
| Mechanic Hours | Capacity |

A Dynamic Programming (DP) approach is used to find the optimal combination of tasks.

---

## APIs Used

### Depot API

GET http://4.224.186.213/evaluation-service/depots

Returns depot details including available mechanic hours.

### Vehicles API

GET http://4.224.186.213/evaluation-service/vehicles

Returns vehicle maintenance tasks with duration and impact scores.

---

## Project Structure

```text
vehicle_scheduling_be/
│
├── api.js
├── knapsack.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── screenshots/
```

## Installation

Install dependencies:

```bash
npm install
```

## Run the Project

```bash
node index.js
```

## Sample Output

```text
====================
Depot ID: 1
Mechanic Hours Available: 60
Total Duration Used: 60
Maximum Impact: 126
Tasks Selected: 20
====================

====================
Depot ID: 2
Mechanic Hours Available: 135
Total Duration Used: 134
Maximum Impact: 186
Tasks Selected: 33
====================
```

## Algorithm

The solution uses Dynamic Programming to compute:

- Maximum achievable impact score
- Optimal set of maintenance tasks

### Time Complexity

```text
O(n × capacity)
```

Where:

- n = Number of maintenance tasks
- capacity = Available mechanic hours

### Space Complexity

```text
O(n × capacity)
```

## Technologies Used

- Node.js
- JavaScript
- Axios
- Dynamic Programming

## Author

Madhumitha C
