import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// our files
import {do_signup, do_signin} from './db_connect.js';
import {add_organiser ,feedback_submit, add_event, get_discussions} from './home.js'


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
        venue1 : "AB1",
        availability1 : "Booked",
        starttime1 : "10.00am",
        endtime1 : "5.00pm",
        booked1 : "charan",
        phno1 : "29833289",

    })
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
