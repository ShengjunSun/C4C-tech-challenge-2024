import express from 'express';

const app = express();
const port = 4000;


const partners = {}

partners["dog_project"] = {
  "thumbnailUrl": "https://picsum.photos/id/237/200/300",
  "name": "Dog Project",
  "description": "A project about dogs.",
  "activeYN": true
};

// Some partner data
const partners_sample = {
  "dog_project": {
    "thumbnailUrl": "https://picsum.photos/id/237/200/300",
    "name": "Dog Project",
    "description": "A project about dogs.",
    "activeYN": true
  },
  "lighthouse_project": {
    "thumbnailUrl":"https://fastly.picsum.photos/id/58/1280/853.jpg?hmac=YO3QnOm9TpyM5DqsJjoM4CHg8oIq4cMWLpd9ALoP908",
    "name": "Lighthouse Project", 
    "description": "A project about lighthouse.",
    "activeYN": false
  },
  "wave_project": {
    "thumbnailUrl": "https://fastly.picsum.photos/id/59/2464/1632.jpg?hmac=uTfe6jCzLvCzANvJgtpo-a0fKhO8BvjpwLNYX3lqx_Q", 
    "name": "wave project", 
    "description": "A project about waves.",
    "activeYN": true
  },
  "city_project": {
    "thumbnailUrl": "https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ", 
    "name": "city project", 
    "description": "A project about cities.",
    "activeYN": false
  }
}

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
})

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
    activeYN: active
  };

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
      activeYN
    };
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
    res.status(200).send({ success: true, message: 'Partner deleted successfully' });
  } else {
    res.status(404).send({ success: false, message: 'Partner not found' });
  }
});

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})