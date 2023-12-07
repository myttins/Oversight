import React from 'react'

const Accounts = () => {
  return (
    <div className='bg-white p-4'>
        <h1>ACCOUNTS</h1>
        <div>
            ROLES
            5: SUPER ADMIN W/ LOGS, SQL QUERY, DEV INFO
            4: ADMIN W/ ACCOUNT CONTROL
            3: ADMIN W/ WRITE ACCESS
            2: USER WITH SPECIFIC WRITE ACCESS
            1: READ ONLY
            0: NONE
        </div>
    </div>
  )
}

export default Accounts