import useStore from "../../zustand/store";
import DepartmentCard from "./DepartmentCard";
import "./HomePage.css";

function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  // todo - polish descriptions 
  const sections = [
    {
      path: "/reporting",
      label: "Reporting Hub",
      description: "View all department reports",
      image: "/img/departments/reporting.jpg",
    },
    {
      path: "/compliance",
      label: "Compliance",
      description: "Weekly compliance",
      image: "/img/departments/compliance.jpg",
    },
    {
      path: "/shelter",
      label: "Shelter",
      description: "Weekly shelter operations and guest tracking",
      image: "/img/departments/shelter.jpg",
    },
    {
      path: "/finance",
      label: "Finance",
      description: "Weekly financial reporting and metrics",
      image: "/img/departments/finance.jpg",
    },
    {
      path: "/outreach",
      label: "Community Outreach",
      description: "Volunteers & Volunteer Engagement",
      image: "/img/departments/outreach.jpg",
    },
    {
      path: "/development",
      label: "Development",
      description: "Donor, donations, and notable events",
      image: "/img/departments/development.jpg",
    },
    {
      path: "/housing",
      label: "Housing",
      description: "Occupancy, vacancies, reserves",
      image: "/img/departments/housing.jpg",
    },
    {
      path: "/hr",
      label: "Human Resources",
      description: "Weekly HR updates",
      image: "/img/departments/hr.jpg",
    },
    {
      path: "/kitchen",
      label: "Kitchen",
      description: "Weekly kitchen reporting",
      image: "/img/departments/kitchen.jpg",
    },
    {
      path: "/media",
      label: "Media",
      description: "Website, social, newsletter metrics",
      image: "/img/departments/media.jpg",
    },
    {
      path: "/pantry",
      label: "Pantry",
      description: "Weekly pantry reporting",
      image: "/img/departments/pantry.jpg",
    },
  ];

  return (
    <section className="home-page">
      {/* Hero Banner */}
      <div className="hero-banner d-flex justify-content-center align-items-center mb-4">
        <img
          src="/img/cu-main-logo.png"
          alt="Company Logo"
          className="hero-logo"
        />
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-4">
        <h2>Welcome, {user.username}</h2>
        <p>Select a department to manage data and reports.</p>
      </div>

      {/* Departments Grid */}
      <div className="container">
        <div className="row g-4 justify-content-center">
          {sections.map((section) => (
            <div
              key={section.path}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <DepartmentCard section={section} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
