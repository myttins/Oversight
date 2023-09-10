import React, { useEffect, useState } from 'react';
import { db } from './db';
import { useLiveQuery } from 'dexie-react-hooks';

const MainContainer = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

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
  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      ></input>
      <button
        style={{ background: 'gray' }}
        onClick={() => {
          console.log('clicked');
          console.log('name', name);
          add();
        }}
      >
        button
      </button>
      <ul>
        {friends?.map((friend) => (
          <li key={friend.id}>
            {friend.name}, {friend.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainContainer;
