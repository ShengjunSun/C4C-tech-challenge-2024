import React, { useState } from 'react';
import DelButton from './DelButton';

function PartnerTile({ partnerData, partnerKey, onDelete, onSave, isAdmin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...partnerData });

  const { thumbnailUrl, name, description, activeYN } = formData;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:4000/partner/${partnerKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        onSave(partnerKey, formData);
        setIsEditing(false);
      } else {
        console.error('Failed to save changes');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  return (
    <div className="partner-tile">
      <div className="center-item">
        {!isEditing && (
          <img className="partner-thumbnail" src={thumbnailUrl} alt={name} />
        )}
      </div>
      {isEditing ? (
        <>
          <input
            type="text"
            name="thumbnailUrl"
            value={thumbnailUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
          />
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Description"
          />
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Active:
            <input
              type="checkbox"
              name="activeYN"
              checked={activeYN}
              onChange={handleCheckboxChange}
            />
          </label>
          <button onClick={handleSaveClick} style={{ marginRight: '10px' }}>Save</button>
        </>
      ) : (
        <>
          <h1 className="subtitle">
            {name}
            <div className="active-status" style={{ color: activeYN ? 'green' : 'red' }}>
              {activeYN ? "Active" : "Not Active"}
            </div>
          </h1>
          <div className="partner-info">
            {description}
          </div>

          {isAdmin && (
          <div className="button-group" style={{ display: 'flex', gap: '10px'}}>
            <button onClick={handleEditClick}>Edit</button>
            <DelButton onDelete={() => onDelete(partnerKey)} />
          </div>
          )}
        </>
      )}
    </div>
  );
}

export default PartnerTile;
