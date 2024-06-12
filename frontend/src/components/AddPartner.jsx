/*
 Block for adding a new partner. Need to ask for: 
 - Partner name
 - Partner description
 - Partner logo source
 - Active or not. 
 In addition, need to have: 
 - The submit button. 
*/

import React, { useState } from 'react';
import './AddPartner.css'; // Import the CSS file

function AddPartner({onAddPartner}) {
  // State to hold the values of the input fields
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    logo: '',
    active: false
  });

  // Handler for input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Handler for checkbox change
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: checked
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      if (response.ok) {
        console.log('Partner added successfully');
        // refresh the UI page
        onAddPartner();
        // Reset form after successful submission
        setFormValues({
          name: '',
          description: '',
          logo: '',
          active: false
        });
      } else {
        console.error('Failed to add partner');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="AddPartner-container">
      <form onSubmit={handleSubmit} className="form-grid">
        <label className="bold-label">
          Partner name:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="bold-label">
          Partner description:
          <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </label>
        <label className="bold-label">
          Partner Logo Source:
          <input
            type="text"
            name="logo"
            value={formValues.logo}
            onChange={handleInputChange}
          />
        </label>
        <label className="bold-label checkbox-container">
          Active?
          <input
            type="checkbox"
            name="active"
            checked={formValues.active}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPartner;
