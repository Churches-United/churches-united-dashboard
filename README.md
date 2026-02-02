# Department Reporting Dashboard

Duration: ~3–4 week sprint

## Overview

The Department Reporting Dashboard is a full-stack web application designed to consolidate and visualize key metrics across multiple organizational departments, including:

Community Outreach, Development, Finance, Housing, Media, Pantry, Kitchen, HR, Compliance, and Shelter.

This repository serves as the **technical handoff** for future developers who may maintain, extend, or redeploy the application.

Client credentials, service logins, and sensitive configuration values are intentionally **not included** in this repository and are provided separately in the client handoff document.

---

## Project Description

The dashboard enables staff and administrators to quickly view KPIs, charts, tables, and upcoming events for each department. It supports both high-level summaries and detailed monthly reporting, allowing data to be filtered by year, building, volunteer, donor, and other relevant attributes.

The application was built with long-term maintainability in mind, using reusable components, centralized state management, and a modular folder structure.

### Problems Solved

- Centralizes reporting for multiple departments into a single application
- Replaces manual or spreadsheet-based reporting workflows
- Visualizes data through KPIs, charts, and tables
- Enables filtering and exploration of historical data
- Provides a scalable structure for adding new departments or metrics

### Solution Summary

- React-based frontend with reusable KPI cards, charts, and tables
- Zustand for global state management
- Express.js backend API
- PostgreSQL database for persistent data storage
- Chart.js for data visualization
- Modular architecture to support future expansion

---

## Deployed Application

The application is currently deployed and publicly accessible at:

**[[DEPLOYED URL](https://churches-united-dashboard-app.fly.dev/#/)]** 

Deployment credentials, hosting provider access, and pricing details are provided to the client in the separate handoff document.

---

## Screenshots

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="./public/img/readme/homepage.jpg" alt="Dashboard Overview" width="300" />
  <img src="./public/img/readme/housing.jpg" alt="Housing Data Entry" width="300" />
  <img src="./public/img/readme/reports.jpg" alt="Department Reports" width="300" />
</div>

---

## Prerequisites

The following tools must be installed before running the project locally:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/)
- Optional: [Postico](https://eggerapps.at/postico/) or another Postgres client

---

## Environment Variables

This project requires environment variables to function correctly.

Create a `.env` file in the project root using the following format:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
SESSION_SECRET=your_session_secret
```

A .env.sample file should be included in the repo with placeholder values.
Do not commit real credentials.

## Local Installation & Setup

Follow these steps to run the application locally:

1. Clone the repository
2. Install dependencies:

```
 npm install
```

3. Create a PostgreSQL database:

```
 CREATE DATABASE your_database_name;
```

4. Run the SQL scripts in tables.sql to create tables and seed initial data
5. Create a .env file as described above
6. Start the application:
```
npm run server
npm run client
```

7. The client will open automatically in a new browser tab

## Usage

- Navigate to the dashboard homepage to view department summary cards
- Select a department to view detailed KPIs, charts, and tables
- KPI cards display high-level metrics (e.g., volunteers, donations, housing occupancy)
- Charts show monthly or yearly trends
- Tables allow filtering by relevant fields such as year, building, volunteer, or donor

## Deployment
The application is currently deployed using [hosting provider name].

To deploy a new instance:
- Configure environment variables in the hosting platform
- Set up a managed PostgreSQL database
- Build and deploy the server and client applications
Hosting and scaling costs vary depending on traffic and data volume. Current pricing and recommendations are outlined in the client handoff document.

## Known Issues
Any known bugs or limitations should be tracked as GitHub Issues in this repository. These issues are non-blocking unless otherwise noted.

## Built With
- Frontend: React, React Router, Zustand
- Backend: Express.js
- Database: PostgreSQL
- Data Visualization: Chart.js
- Styling: CSS Modules, Bootstrap, and custom theme styles

## License
MIT
(Only include this section if a LICENSE file exists in the repository.)

## Acknowledgements
Thanks to Emerging Digital Academy for the instruction, mentorship, and support that made this project possible.

## Support
For questions related to ongoing maintenance or feature requests, please contact:

abdilleahmed779@gmail.com
abdiwahabnunow@gmail.com
nicholas.weisser@gmail.com

