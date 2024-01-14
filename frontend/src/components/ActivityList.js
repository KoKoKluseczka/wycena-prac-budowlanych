import React from 'react';

// Komponent do wyświetlania listy czynności
const ActivityList = ({ activities }) => (
  <div>
    <h2>Lista Czynności</h2>
    <ul>
      {activities.map(activity => (
        <li key={activity._id}>{activity.name}</li>
      ))}
    </ul>
  </div>
);

export default ActivityList;
