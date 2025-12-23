import useStore from '../../zustand/store'
import { Link } from 'react-router-dom';


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);
  const sections = [
    { path: "/compliance", label: "Compliance", description: "Weekly compliance checks" },
    { path: "/outreach", label: "Community Outreach", description: "Volunteers & Volunteer Engagement" },
    { path: "/development", label: "Development", description: "Donor, donations, and notable events" },
    { path: "/finance", label: "Finance", description: "Weekly financials" },
    { path: "/housing", label: "Housing", description: "Occupancy, vacancies, reserves" },
    { path: "/hr", label: "Human Resources", description: "Weekly HR updates" },
    { path: "/kitchen", label: "Kitchen", description: "Weekly kitchen reporting" },
    { path: "/media", label: "Media", description: "Website, social, newsletter metrics" },
    { path: "/pantry", label: "Pantry", description: "Weekly pantry reporting" },

  ]

  return (
    <section>
      <h2>Churches United Department Dashboard</h2>
      <p>Welcome: {user.username}</p>
      <p>Select a department to manage data and reports.</p>
            <div className="dashboard-grid">
        {sections.map((section) => (
          <div key={section.path} className="dashboard-card">
            <h3>{section.label}</h3>
            <p>{section.description}</p>
            <Link to={section.path}>
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>
      {/* todo move this to navBar */}
      <button onClick={logOut}> 
        Log Out
      </button>
    </section>
  );
}


export default HomePage;
