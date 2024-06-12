import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddButton from './AddButton';
import AddPartner from './AddPartner'

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState({});

  // Load all partners on initial page load 
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => setPartners(data))
    .catch((error) => console.error('Error fetching partners:', error));
    // fetchPartners();
  }, [])

  const fetchPartners = async () => {
    try {
      const response = await fetch('http://localhost:4000/');
      if (response.ok) {
        const data = await response.json();
        setPartners(data);
      } else {
        console.error('Failed to fetch partners');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddPartner = () => {
    fetchPartners(); // Fetch partners again after adding a new partner
  };

  const handleSave = (partnerKey, updatedData) => {
    setPartners((prevPartners) => ({
      ...prevPartners,
      [partnerKey]: updatedData,
    }));
  };

  // Function to delete a partner
  const deletePartner = (partnerKey) => {
    fetch(`http://localhost:4000/partner/${partnerKey}`, {
      method: 'DELETE',
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const newPartners = { ...partners };
        delete newPartners[partnerKey];
        setPartners(newPartners);
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error('Error deleting partner:', error));
  };
  
  return (
    <div id="main-content">
      <div id="button-container">
        <AddButton />
      </div>
      <AddPartner onAddPartner={handleAddPartner}/>
      <div id="main-partners-grid">
        {Object.keys(partners).map((key) => (
          <PartnerTile 
            key={key} 
            partnerData={partners[key]} 
            partnerKey={key}
            onDelete={deletePartner}
            onSave={handleSave}
           />
        ))}
      </div>
    </div>
  )
  
}

export default Dashboard;