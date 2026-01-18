// Chart data preparation functions for Shelter Reporting

export const getGuestCategoriesPieData = (guests) => {
  if (!guests) return null;

  return {
    labels: ['Single Men', 'Housing Men', 'Single Women', 'Housing Women', 'Families'],
    datasets: [{
      data: [
        guests.total_single_men || 0,
        guests.total_housing_men || 0,
        guests.total_single_women || 0,
        guests.total_housing_women || 0,
        guests.total_families || 0
      ],
      backgroundColor: ['#36a2eb', '#4bc0c0', '#ff6384', '#ffce56', '#9966ff'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
};

export const getGuestCategoriesBarData = (guests) => {
  if (!guests) return null;

  return {
    labels: ['Single Men', 'Housing Men', 'Single Women', 'Housing Women', 'Families'],
    datasets: [{
      label: 'Total Guests',
      data: [
        guests.total_single_men || 0,
        guests.total_housing_men || 0,
        guests.total_single_women || 0,
        guests.total_housing_women || 0,
        guests.total_families || 0
      ],
      backgroundColor: ['#36a2eb', '#4bc0c0', '#ff6384', '#ffce56', '#9966ff'],
      borderWidth: 1,
      borderColor: '#fff'
    }]
  };
};

export const getIncidentsBreakdownData = (incidents) => {
  if (!incidents) return null;

  return {
    labels: ['Incident Reports', 'Community Served', 'Nights Outside'],
    datasets: [{
      label: 'Count',
      data: [
        incidents.total_incident_reports || 0,
        incidents.total_community_members_served || 0,
        incidents.total_nights_outside || 0
      ],
      backgroundColor: ['#dc3545', '#28a745', '#ffc107'],
      borderWidth: 1,
      borderColor: '#fff'
    }]
  };
};

export const getWeeklySummaryBarData = (summary) => {
  if (!summary || summary.length === 0) return null;

  return {
    labels: summary.map(w => {
      const date = new Date(w.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Total Guests',
        data: summary.map(w => w.total_guests || 0),
        backgroundColor: '#36a2eb',
        borderWidth: 1,
        borderColor: '#fff'
      },
      {
        label: 'Incident Reports',
        data: summary.map(w => w.incident_reports || 0),
        backgroundColor: '#dc3545',
        borderWidth: 1,
        borderColor: '#fff'
      },
      {
        label: 'Community Served',
        data: summary.map(w => w.community_members_served || 0),
        backgroundColor: '#28a745',
        borderWidth: 1,
        borderColor: '#fff'
      }
    ]
  };
};