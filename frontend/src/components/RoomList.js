import React from 'react';

// Komponent do wyświetlania listy pomieszczeń
const RoomList = ({ rooms }) => (
  <div>
    <h2>Lista Pomieszczeń</h2>
    <ul>
      {rooms.map(room => (
        <li key={room._id}>{room.name}</li>
      ))}
    </ul>
  </div>
);

export default RoomList;
