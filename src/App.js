import './App.css';
import CSVLoader from './CSVLoader';
import Map from './Map';
import Filter from './Filter';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  return (
    <div class="App">
      <h1 class="app-header">Temperature Exceedences Map</h1>
      <div class="app-container">
        <div class="list-view">
          <CSVLoader onDataLoaded={setData}/>
        </div>
        <div class="map-view">
          <Map data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
