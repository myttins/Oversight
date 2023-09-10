import React, { useEffect, useState } from 'react';
import { db } from './db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Outlet, useNavigate } from 'react-router';

const MainContainer = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const friends = useLiveQuery(() => db.friends.toArray());
  const add = async () => {
    try {
      await db.friends.add({
        name,
        age,
      });
    } catch {
      console.log('error');
    }
  };
  return <div>mainContainer</div>;
};

export default MainContainer;
