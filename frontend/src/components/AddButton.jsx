import React from 'react';

/*
  The button for adding a partner info. 
*/

function AddButton() {

  function handleClick() {
    alert('You clicked me!');
  }

  return ( 
    <button onClick={handleClick}>
      - Add Partner Info
    </button>
  );
}

export default AddButton; 
