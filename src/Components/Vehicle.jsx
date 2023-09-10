import React from 'react'
import { useOutletContext } from 'react-router'

const Vehicle = () => {
  const [english, setEnglish] = useOutletContext()
  return (
    <div>Vehicle
      <button onClick={() => {}}>count</button>
    </div>
  )
}

export default Vehicle