import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const a_uri = "mongodb+srv://cherrycharan238:CHERRYCHARAN2380@cluster0.tavn5wb.mongodb.net/srchackathon"
const c_uri = "mongodb://localhost:27017/srchacakathon"

// Connect to MongoDB
mongoose.connect(a_uri).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('Connection error', err.message);
});

// models/Event.js

const eventSchema = new mongoose.Schema({
    eventname: String,
    venue: String,
    date: Date,
    starttime: String,
    endtime: String,
    taskname: String,
    assignee: String,
    deadline: Date
});

const Event = mongoose.model('Event', eventSchema);


export async function add_event(req, res){
    const { eventname, venue, date, starttime, endtime, taskname, assignee, deadline } = req.body;
    console.log(req.bdoy);
    const newEvent = new Event({eventname,venue,date,starttime,endtime,taskname,assignee,deadline});
    try {
        await newEvent.save();
        res.render(__dirname+ "/public/organisation.ejs");
        res.status(200).send('Event added successfully');
    } catch (error) {
        res.status(500).send('Error adding event');
    }
};
const feedbackSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comments: {
      type: String,
      required: true
    }
  });
  
const Feedback = mongoose.model('Feedback', feedbackSchema);

export async function feedback_submit(req, res){
    console.log(req.body);
    try {
      const feedbackData = {
        name: req.body.name,
        email: req.body.email,
        eventName: req.body.eventname,
        rating: req.body.rating,
        comments: req.body.comments
      };
      const feedback = new Feedback(feedbackData);
      await feedback.save();
      res.status(200).send('Feedback submitted successfully!');
    } catch (error) {
      res.status(500).send('Error submitting feedback: ' + error.message);
    }
  };
  

  const organisationSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    }
  });
  
  const Organisation = mongoose.model('Organisation', organisationSchema);

export async function add_organiser(req , res){
  console.log("enterd here and delte ti after checking");
  try {
    const { studentEmail } = req.body;
    const organisationData = {
      studentEmail
    };

    const organisation = new Organisation(organisationData);
    await organisation.save();
    res.render(__dirname+"/public/home.ejs");
  } catch (error) {
    res.status(500).send('Error submitting emails: ' + error.message);
  }

} 


export  function get_discussions(req , res){
    res.render(path.join(__dirname,'/public/discussion.ejs') , {
        what : "sign up"
    });
}


