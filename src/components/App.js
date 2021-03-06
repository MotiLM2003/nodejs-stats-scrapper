import React, { useState, useEffect } from 'react';
import api from '../api';
import axios from 'axios';

import image from '../images/background-image.jpg';
import '../style.css';
const App = () => {
  const [stats, setStats] = useState({
    wins: 0,
    level: 0,
    kd: 0,
    kills: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 60000);
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get('api/data');
    setStats(data);
  };

  return (
    <div className='container'>
      <img className='img' src={image} alt='statistics' />
      <p className='wins'>{stats.wins}</p>
      <p className='level'>{stats.level}</p>
      <p className='kd'>{stats.kd}</p>
      <p className='kills'>{stats.kills}</p>
    </div>
  );
};

export default App;
