import React from 'react';

const Greeting = ({ name }) => {
  return (
    <div>
      <div className='white f3 pa5'>
        {`Welcome ${name}, your reminders are listed below:`}
      </div>
    </div>
  );
}

export default Greeting;