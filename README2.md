# Department Reporting Dashboard
Duration: ~3–4 week sprint

## Description
This project is a Department Reporting Dashboard designed to consolidate key metrics from multiple organizational departments, including Community Outreach, Development, Finance, Housing, Media, Pantry, Kitchen, HR, Compliance, and Shelter.

It allows staff to quickly view KPIs, charts, and upcoming events for each department, providing both high-level summaries and detailed monthly reports. The dashboard is built to support a smooth client handoff and future maintenance or expansion.

### Problems Solved:
- Centralizes reporting for multiple departments into a single dashboard
- Visualizes metrics with KPIs, charts, and tables
- Provides easy-to-access monthly and event data
- Supports data filtering by year, building, volunteer, donor, etc.

### Solution:
- React-based frontend with reusable components for summary cards and charts
- Zustand for global state management
- Express server with Postgres database for data persistence
- Dynamic charts (e.g., Chart.js) and KPI components for at-a-glance insights
- Modular folder structure to easily add new departments or reports

## Deployed Version
To see the fully functional site, visit: [DEPLOYED URL HERE]

## Screenshots
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="./public/img/readme/homepage.jpg" alt="Homepage Screenshot" width="300" />
  <img src="./public/img/readme/housing.jpg" alt="Data Entry Screenshot" width="300" />
  <img src="./public/img/readme/reports.jpg" alt="Reports Screenshot" width="300" />
</div>

## Prerequisites
- Node.js (v16+ recommended)
- Postgres
- Optional: Postico (for running SQL scripts)

## Installation
Follow these steps to get the project running locally:
1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Create a .env file in the root directory with necessary environment variables:
```
DATABASE_URL=your_postgres_connection_string
```

4. Create the database named your_database_name
5. Run SQL scripts in tables.sql to set up tables and seed initial data
6. Start the server and client:
```
npm run server
npm run client

```
This will open the dashboard in a new browser tab

## Usage
1. Navigate to the Department Reporting Dashboard
2. Select a department card to view detailed reports
3. KPIs at the top of each summary card display high-level metrics (volunteers, donations, housing occupancy, etc.)
4. Charts provide monthly trends for the selected department
5. Tables allow filtering by relevant fields (year, donor name, building, volunteer, etc.)


## Built With
- Frontend: React, React Router, Zustand
- Backend: Express.js
- Database: PostgreSQL
- Charts: Chart.js
- Styling: CSS Modules and custom styles

## License
MIT — if you have a LICENSE file in the repo

## Acknowledgements
Thanks to Emerging Digital Academy for the instruction and support that made this project possible.

## Support
If you have suggestions or issues, please contact: youremail@domain.com