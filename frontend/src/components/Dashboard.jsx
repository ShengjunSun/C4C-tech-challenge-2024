import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddButton from './AddButton';
import AddPartner from './AddPartner';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {
  const [partners, setPartners] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const correctAdminPassword = 'password';

  // Load all partners on initial page load
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => setPartners(data))
    .catch((error) => console.error('Error fetching partners:', error));
  }, []);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (adminPassword === correctAdminPassword) {
      setIsAdmin(true);
    } else {
      alert('Incorrect password');
    }
  };

  // Filter partners based on the search query and active status
  const filteredPartners = Object.keys(partners).filter((key) => {
    const partner = partners[key];
    const matchesSearchQuery = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatusFilter = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && partner.activeYN) || 
      (statusFilter === 'inactive' && !partner.activeYN);

    return matchesSearchQuery && matchesStatusFilter;
  });

  return (
    <div id="main-content">
      <div id="filter-bar-grid">
          <input
            type="text"
            placeholder="Search by project name..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ padding: '10px', fontSize: '16px', height: '40px' }}
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            style={{ padding: '10px', fontSize: '16px', height: '40px' }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
      </div>
      <div id="add-partner-grid">
        {isAdmin ? (
          <AddPartner onAddPartner={handleAddPartner}/>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={handlePasswordChange}
              style={{ padding: '10px', fontSize: '16px', height: '40px' }}
            />
            <button type="submit" style={{ padding: '10px', fontSize: '16px', height: '40px' }}>
              Submit
            </button>
          </form>
        )}
      </div>
      <div id="main-partners-grid">
        {filteredPartners.map((key) => (
          <PartnerTile 
            key={key} 
            partnerData={partners[key]} 
            partnerKey={key}
            onDelete={deletePartner}
            onSave={handleSave}
            isAdmin={isAdmin} 
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
