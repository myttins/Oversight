import React, { useEffect, useState } from 'react';
import { db } from './db';
import fileDownload from 'js-file-download';
import Dexie from "dexie";
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useOutletContext } from 'react-router';

import axios from 'axios';

const MainContainer = () => {
  const [english, setEnglish] = useOutletContext();

  const vehicles = useLiveQuery(() => db.vehicle.toArray());
  

  const handleExport = async () => {
    try {
      const blob = await db.export({prettyJson: true})
      fileDownload(blob, 'file.json')
      
      
    } catch (err) {
      console.log(err)
    }
  }

  const handleImport = async () => {
    const filePath = document.querySelector('#filepath')

    if (!filePath) return;
    const db = Dexie.import()

    
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button className="m-2 p-2 bg-slate-600" onClick={handleExport}>Export</button>
      <button className="m-2 p-2 bg-slate-600" onClick={handleImport}>Import</button>
    </div>
  );
};

export default MainContainer;
