import React from 'react';

/*
  The button for deleting a partner info. 
*/

function DelButton({ onDelete }) {
  return (
    <del-button onClick={onDelete} className="del-button">
      Delete
    </del-button>
  );
}

export default DelButton; 
