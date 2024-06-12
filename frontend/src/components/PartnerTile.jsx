import React from 'react';
import DelButton from './DelButton';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData, partnerKey, onDelete }) {

  const { thumbnailUrl, name, description, activeYN } = partnerData;

  return (
    <div className="partner-tile">
      <div className = "center-item">
        <img className="partner-thumbnail" src={thumbnailUrl} />
      </div>
      
      <h1 className = "subtitle">
        {name}
        <div className="active-status" style={{color: activeYN? 'green' : 'red'}}>
          {activeYN ? "Active" : "Not Active"}
        </div>
      </h1>

      <div className="partner-info">
        {description}
      </div>

      <DelButton onDelete={() => onDelete(partnerKey)} />
    </div>
  )
}

export default PartnerTile;