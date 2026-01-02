import { useState } from 'react';
import HouseholdRegistrationForm from './HouseholdRegistrationForm';
import WeeklyPantryRecordForm from './WeeklyPantryRecordForm';
import PantryRecordsList from './PantryRecordsList';

const PantryPage = () => {
    // 'household' or 'weekly'
    // set active form to house hould initially
  const [activeForm, setActiveForm] = useState('household'); 

  return (
    <div>
      <h1>Pantry - Household & Distribution Tracking</h1>
      
      <div>
        <button onClick={() => setActiveForm('household')}>
          Household Registration
        </button>
        <button onClick={() => setActiveForm('weekly')}>
          Weekly Pantry Record
        </button>
      </div>

      {activeForm === 'household' && <HouseholdRegistrationForm />}
      {activeForm === 'weekly' && <WeeklyPantryRecordForm />}

      <PantryRecordsList />
    </div>
  );
};

export default PantryPage;