import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// our files
import {add_organiser,do_signup, do_signin} from './db_connect.js';
import {feedback_submit, add_event, get_discussions} from './home.js'


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/signin' , do_signin);
app.post('/signup', do_signup);
app.get("/login/home/discussions" , get_discussions);
app.post("/login/organisation" , add_event);
app.post("/login/home/faculty" ,add_organiser );


// sumiting feed back
app.post("/login/home/feedback" , feedback_submit);
app.post("/login/home/organisation" , (req , res)=>{
    res.render("/home/rgukt123/Desktop/pre requisites/public/organisation.ejs",{
        venue1 : "AB1from render",
        availability1 : "Booked",
        starttime1 : "10.00am",
        endtime1 : "5.00pm",
        booked1 : "charan",
        phno1 : "29833289",

    })
});


app.post('/book-class', (req, res) => {
    const { rowId } = req.body;
  
    // For demonstration, this data is static. In a real app, this would be fetched from a database
    const data = {
      1: { availability: 'Booked!(charan)', startTime: '8 PM', endTime: '10 PM', bookedBy: 'Anil', contactNo: '23456789123' },
      2: { availability: 'Booked!(cjherry)', startTime: '6 PM', endTime: '8 PM', bookedBy: 'Srikanth', contactNo: '99875644312' },
      3: { availability: 'Booked!(raga)', startTime: '7 PM', endTime: '9 PM', bookedBy: 'Ajithesh', contactNo: '985457342' },
      4: { availability: 'FREE(now)', startTime: '4 PM', endTime: '7 PM', bookedBy: '--', contactNo: '---' },
    };
  
    // Send the data for the specified rowId
    res.json(data[rowId] || {});
  });

    app.post('/free-class', (req, res) => {
        res.json({})

    // Send the data for the specified rowId
    });

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '/public/index.ejs') , {
        what : "sign up"
    });
});

// app.post("/login/home/addevent" , )

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
