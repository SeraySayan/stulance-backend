require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const freelancerController = require('./controllers/freelancerController.js');
const customerController = require('./controllers/customerController.js');
const contractController = require('./controllers/contractController.js');
const proposalController = require('./controllers/proposalController.js');
const jobController = require('./controllers/jobController.js');
const skillController = require('./controllers/skillController.js');
const authController = require('./controllers/authController.js');

const protectedRoutes = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

/* FINISHED */
app.post('/login', authController.signin);
app.post('/signup', authController.signup);
app.get('/freelancers', freelancerController.getFreelancers);
app.get('/myskills', protectedRoutes, skillController.getMySkills);
app.post('/myskills', protectedRoutes, skillController.addMySkills);
app.delete('/myskills', protectedRoutes, skillController.deleteMySkills);
app.get('/skills', protectedRoutes, skillController.getSkills);
app.post('/skills', protectedRoutes, skillController.addSkill);
app.delete('/skills', protectedRoutes, skillController.deleteSkill);
app.get('/customers', customerController.getCustomers);
app.get('/mycontracts', protectedRoutes, contractController.getContracts);
app.get('/allcontracts', protectedRoutes, contractController.getAllContracts);
app.get('/myjobs', protectedRoutes, jobController.getMyJobs);
app.get('/myproposals', protectedRoutes, proposalController.getProposals);
app.get('/jobs', jobController.getJobs);
app.get('/jobs/:id', jobController.getJobById);
app.put('/customer/:id', customerController.updatePostedJobs);

app.listen(8000, () => {
    console.log(`App running on port 8000.`);
});
