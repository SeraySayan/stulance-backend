require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

const freelancerController = require('./controllers/freelancerController.js');
const customerController = require('./controllers/customerController.js');
const contractController = require('./controllers/contractController.js');
const proposalController = require('./controllers/proposalController.js');
const jobController = require('./controllers/jobController.js');
const skillController = require('./controllers/skillController.js');
const authController = require('./controllers/authController.js');

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

/* FINISHED */
app.get('/freelancers', freelancerController.getFreelancers);
app.get('/skills', skillController.getSkills);

/* TODO: /freelancers/:id will fetch the freelancer with the specific id */

/* FIXME: */
app.get('/customers', customerController.getCustomers);
app.get('/contracts', contractController.getContracts);
app.get('/proposals', proposalController.getProposals);

/* TODO: /jobs/:id will fetch the job with the specific id */
app.get('/jobs', jobController.getJobs);

app.put('/customer/:id', customerController.updatePostedJobs);

/* TODO: /login /register */
app.post('/login', authController.signin);
app.post('/signup', authController.signup);

app.listen(8000, () => {
    console.log(`App running on port 8000.`);
});
