require('dotenv').config();
const express = require('express');

// Instantiate an express server:
const app = express();

// Use process.env.PORT if it exists, otherwise use 5001:
const PORT = process.env.PORT || 5001;

// Require auth-related middleware:
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Require router files:
const userRouter = require('./routes/user.router');
const donorRouter = require('./routes/donor.router');
const donationRouter = require('./routes/donation.router');
const eventsRouter = require('./routes/events.router');
const kitchenRouter = require('./routes/kitchenWeekly.router')
const volunteersRouter = require('./routes/volunteers.router');
const volunteerEngagements = require('./routes/volunteerEngagements.router');
const weekCompliance = require('./routes/complianceWeekly.router');
const housingRouter = require('./routes/housing.router');
const shelterWeeklyRouter = require('./routes/shelterWeekly.router');
const pantryWeeklyRouter = require("./routes/pantryweekly.router");
const financeWeeklyRouter = require('./routes/Financeweekly.router');
const mediaRouter = require('./routes/media.router');
const hrRouter = require('./routes/hrWeekly.router');
const adminRouter = require('./routes/admin.router');



// Apply middleware:
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Apply router files:
app.use('/api/user', userRouter);
app.use('/api/development/donors', donorRouter);
app.use('/api/development/donations', donationRouter);
app.use('/api/development/events', eventsRouter);
app.use('/api/volunteers/engagements', volunteerEngagements);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/compliance/weekly', weekCompliance);
app.use('/api/shelter', shelterWeeklyRouter);  
app.use('/api/kitchen', kitchenRouter);
app.use('/api/pantry', pantryWeeklyRouter);
app.use('/api/housing', housingRouter);
app.use('/api/finance/weekly', financeWeeklyRouter);
app.use('/api/hr', hrRouter);
app.use('/api/media', mediaRouter);
app.use('/api/admin', adminRouter);



// Start the server:
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port: ${PORT}`);
});