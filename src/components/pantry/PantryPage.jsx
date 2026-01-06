import WeeklyPantryRecordForm from './WeeklyPantryRecordForm';
import PantryRecordsList from './PantryRecordsList';

const PantryPage = () => {
  return (
    <div>
      <h1>Pantry - Weekly Distribution Tracking</h1>
      
      <WeeklyPantryRecordForm />
      
      <PantryRecordsList />
    </div>
  );
};

export default PantryPage;