import React from 'react'
import { useOutletContext } from 'react-router'

const Vehicle = () => {
  const [state, setState] = useOutletContext()
  return (
    <div>Vehicle
      {state}
      <button onClick={() => setState(state + 1)}>count</button>
    </div>
  )
}

export default Vehicle