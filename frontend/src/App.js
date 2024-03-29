import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomList from './components/RoomList';
import ActivityList from './components/ActivityList';

function App() {
  // State dla pomieszczeń, czynności, nowego pomieszczenia, nowej czynności, typu powierzchni, id czynności i id pomieszczenia
  const [rooms, setRooms] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newRoom, setNewRoom] = useState({});
  const [newActivity, setNewActivity] = useState({});
  const [surfaceType, setSurfaceType] = useState('floor');
  const [activityId, setActivityId] = useState('');
  const [roomId, setRoomId] = useState('');

  // Pobranie danych na starcie aplikacji
  useEffect(() => {
    axios.get('http://localhost:5000/rooms')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));

    axios.get('http://localhost:5000/activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []); // Pusta tablica oznacza, że useEffect zostanie uruchomiony tylko raz po załadowaniu komponentu

  // Dodawanie nowego pomieszczenia
  const addRoom = () => {
    axios.post('http://localhost:5000/rooms', newRoom)
      .then(response => setRooms([...rooms, response.data]))
      .catch(error => console.error('Error adding room:', error));
  };

  // Dodawanie nowej czynności
  const addActivity = () => {
    axios.post('http://localhost:5000/activities', newActivity)
      .then(response => setActivities([...activities, response.data]))
      .catch(error => console.error('Error adding activity:', error));
  };

  // Obliczanie i wyświetlanie kosztu
  const calculateAndDisplayCost = async (roomId, surfaceType, activityId) => {
    try {
      const response = await axios.post('http://localhost:5000/calculateCost', { roomId, surfaceType, activityId });
      console.log('Calculated cost:', response.data.cost);
    } catch (error) {
      console.error('Error calculating and displaying cost:', error);
    }
  };

  // Renderowanie komponentu
  return (
    <div>
      <h1>Wycena Prac Budowlanych</h1>

      <div>
        <h2>Dodaj Pomieszczenie</h2>
        <input type="text" placeholder="Nazwa" onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })} />
        <input type="number" placeholder="Długość" onChange={(e) => setNewRoom({ ...newRoom, length: e.target.value })} />
        <input type="number" placeholder="Szerokość" onChange={(e) => setNewRoom({ ...newRoom, width: e.target.value })} />
        <input type="number" placeholder="Wysokość" onChange={(e) => setNewRoom({ ...newRoom, height: e.target.value })} />
        <button onClick={addRoom}>Dodaj</button>
      </div>

      <div>
        <h2>Dodaj Czynność</h2>
        <input type="text" placeholder="Nazwa" onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })} />
        <input type="number" placeholder="Koszt za m2" onChange={(e) => setNewActivity({ ...newActivity, costPerSquareMeter: e.target.value })} />
        <button onClick={addActivity}>Dodaj</button>
      </div>

      <div>
        <h2>Lista Pomieszczeń</h2>
        <RoomList rooms={rooms} />
      </div>

      <div>
        <h2>Lista Czynności</h2>
        <ActivityList activities={activities} />
      </div>

      <div>
        <h2>Oblicz Koszt</h2>
        <select onChange={(e) => setRoomId(e.target.value)}>
          <option value="">Wybierz Pomieszczenie</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>{room.name}</option>
          ))}
        </select>
        <select onChange={(e) => setSurfaceType(e.target.value)}>
          <option value="floor">Podłoga</option>
          <option value="wall">Ściana</option>
          <option value="ceiling">Sufit</option>
        </select>
        <select onChange={(e) => setActivityId(e.target.value)}>
          {activities.map(activity => (
            <option key={activity._id} value={activity._id}>{activity.name}</option>
          ))}
        </select>
        <button onClick={() => calculateAndDisplayCost(roomId, surfaceType, activityId)}>Oblicz Koszt</button>
      </div>
    </div>
  );
}

export default App;
