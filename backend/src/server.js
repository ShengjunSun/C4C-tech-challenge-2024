import express from 'express';
import fs from 'fs';

const app = express();
const port = 4000;

// Path to the JSON file where partners data will be saved
const partnersFilePath = './partners.json';

// Function to load partners from the JSON file
const loadPartners = () => {
  try {
    const data = fs.readFileSync(partnersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading partners data:', error);
    return {};
  }
};

// Function to save partners to the JSON file
const savePartners = (data) => {
  try {
    fs.writeFileSync(partnersFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving partners data:', error);
  }
};

const partners = loadPartners();

/*
partners["dog_project"] = {
  "thumbnailUrl": "https://picsum.photos/id/237/200/300",
  "name": "Dog Project",
  "description": "A project about dogs.",
  "activeYN": true
};
*/

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json())
// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/

app.get('/', (req, res) => {
  res.status(200).send(partners);
});

// Route to handle adding a new partner
app.post('/partners', (req, res) => {
  const { name, description, logo, active } = req.body;

  // Generate a unique key for the new partner
  const key = `${name.toLowerCase().replace(/ /g, '_')}_project`;

  // Add the new partner to the partners object
  partners[key] = {
    thumbnailUrl: logo,
    name,
    description,
    activeYN: active,
  };

  // Save the updated partners data to the file
  savePartners(partners);

  res.status(201).json({ message: 'Partner added successfully', partners });
});

// Route to handle updating partner information
app.put('/partner/:id', (req, res) => {
  const { id } = req.params;
  const { thumbnailUrl, name, description, activeYN } = req.body;

  if (partners[id]) {
    partners[id] = {
      thumbnailUrl,
      name,
      description,
      activeYN,
    };

    // Save the updated partners data to the file
    savePartners(partners);

    res.status(200).send({ success: true, message: 'Partner updated successfully', partner: partners[id] });
  } else {
    res.status(404).send({ success: false, message: 'Partner not found' });
  }
});

// Add a delete endpoint
app.delete('/partner/:id', (req, res) => {
  const { id } = req.params;
  if (partners[id]) {
    delete partners[id];

    // Save the updated partners data to the file
    savePartners(partners);

    res.status(200).send({ success: true, message: 'Partner deleted successfully' });
  } else {
    res.status(404).send({ success: false, message: 'Partner not found' });
  }
});

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})