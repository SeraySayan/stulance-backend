require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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
    const authHeader = req.headers['authorization'];

    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(token, 'HSDIUFSDYFYF8923HDHDQYD81DHJQHWJD', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            req.user = user;

            next();
        });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
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
app.post('/skills', skillController.addSkill);
app.delete('/skills', protectedRoutes, skillController.deleteSkill);
app.get('/customers', customerController.getCustomers);
app.get('/mycontracts', protectedRoutes, contractController.getContracts);
app.get('/allcontracts', protectedRoutes, contractController.getAllContracts);
app.get('/myjobs', protectedRoutes, jobController.getMyJobs);
app.get('/myproposals', protectedRoutes, proposalController.getProposals);
app.get('/jobs', jobController.getJobs);
app.get('/job/:proposalID', jobController.getProposalJob);
app.post('/sendproposal/:jobID', protectedRoutes, proposalController.addProposal);

app.get('/myprofile', protectedRoutes, (req, res) => {
    req.user.userType === 'freelancer'
        ? freelancerController.getFreelancerProfile(req, res)
        : customerController.getCustomerProfile(req, res);
});
app.put('/customer/:id', customerController.updatePostedJobs);
app.post('/logout', protectedRoutes, authController.logout);
app.get('/proposal/:jobID', protectedRoutes, proposalController.getJobProposal);
app.post('/job', protectedRoutes, jobController.addJob);
app.listen(8000, () => {
    console.log(`App running on port 8000.`);
});
