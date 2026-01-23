# Churches United Dashboard

**Duration:** 2 Week Sprint  

This project is a centralized dashboard for Churches United, a nonprofit serving the Fargo–Moorhead community. The dashboard helps consolidate data from multiple programs — shelter, food pantry, housing, development, and community outreach — into one easy-to-use system. Leadership and board members can access real-time summaries, while department users can enter weekly data quickly and accurately.  

---

## Deployed Version

To see the fully functional dashboard, visit: [DEPLOYED VERSION LINK]

---

## Introduction / User Story

Churches United operates multiple programs and collects a wide variety of data. Each department previously tracked its data in separate tools, making organization-wide reporting time-consuming and error-prone.  

The dashboard solves this problem by:  

- Allowing department users to enter data directly in the system  
- Providing leadership and board members with consolidated summaries and visualizations  
- Reducing time spent managing spreadsheets so staff can focus on the people they serve  

During the demo, you’ll see the dashboard from several perspectives: department managers entering data, the CEO reviewing reports, and board members exploring metrics.  

---

## Prerequisites

Make sure the following are installed on your machine:

- Node.js  
- PostgreSQL  
- Optional: Postico (or another Postgres client)  

---

## Installation / Setup

1. Clone the repository  
2. Run `npm install` in the root directory to install dependencies  
3. Install additional UI and charting libraries:

```
npm install react-bootstrap bootstrap
npm install bootstrap-icons
npm install react-icons
npm install chart.js chartjs-plugin-datalabels
```
4. Create a PostgreSQL database named cu_dashboard
5. Run the queries in tables.sql to create all tables and seed any necessary data
6. Run the server and client :
```
npm run server
npm run client
```

## Project Structure
- src/ – React frontend with Zustand state management
- server/ – Express backend
- public/ – Static assets such as favicon and images

Shared UI components and global styles are included to maintain a consistent design across the dashboard.

## Usage

Example User Stories:
- Department Manager: Enters weekly data for meals, volunteers, donations, or events.
- CEO: Reviews high-level summaries in the Reporting Hub and clicks into department cards for detailed reports.
- Board Member: Explores visualizations and trends for specific departments.

The home page serves as a hub with 9 department cards, each linking to the respective department’s page.

## Built With

- Frontend: React, Zustand, React Bootstrap
- Backend: Node.js, Express
- Database: PostgreSQL
- Charts & Visualization: Chart.js, chartjs-plugin-datalabels
- Icons: Bootstrap Icons, React Icons

## Future Improvements
- Enable exporting reports as PDFs or CSVs for easy sharing
- Enable importing CSV files to reduce manual data entry and allow historical data integration
- Expand the Reporting Hub to display metrics from all departments in a single view
- Enhance charts and trend visualizations for deeper insights

## Acknowledgements

Thanks to Emerging Digital Academy and our client, Devlyn Brooks, for guiding and supporting this project.

Support

For questions or suggestions, please reach out via email: blaineb@emergingprairie.com