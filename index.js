import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

// our files
import { delete_venue,add_organiser, do_signup, do_signin, get_user_name, get_user_phno, add_venue, get_venues } from './db_connect.js';
import { feedback_submit, add_event, get_discussions, add_volunteer } from './home.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/signin', do_signin);
app.post('/signup', do_signup);
app.get("/login/home/discussions", get_discussions);
app.post("/login/organisation", add_event);
app.post("/login/home/faculty", add_organiser);
app.post("/login/home/volunteer", add_volunteer);
app.post("/login/home/feedback", feedback_submit);
app.post("/login/home/organisation", (req, res) => {
  res.render("/home/rgukt123/Desktop/pre requisites/public/organisation.ejs", {
    venue1: "AB1from render",
    availability1: "Booked",
    starttime1: "10.00am",
    endtime1: "5.00pm",
    booked1: "charan",
    phno1: "29833289",
  });
});

app.post('/book-class', (req, res) => {
  const { rowId } = req.body;
  const data = {
    1: { availability: 'Booked', startTime: '8 PM', endTime: '10 PM', bookedBy: get_user_name(), contactNo: get_user_phno() },
    2: { availability: 'Booked', startTime: '6 PM', endTime: '8 PM', bookedBy: get_user_name(), contactNo: get_user_phno() },
    3: { availability: 'Booked', startTime: '7 PM', endTime: '9 PM', bookedBy: get_user_name(), contactNo: get_user_phno() },
    4: { availability: 'Booked', startTime: '4 PM', endTime: '7 PM', bookedBy: get_user_name(), contactNo: get_user_phno() },
  };
  res.json(data[rowId] || {});
});

app.post('/free-class', (req, res) => {
  const that_bro = get_user_name();
  res.json({ that_bro });
});

app.post('/addOrganisation', add_venue);
app.get('/getOrganisations', get_venues);

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/public/index.ejs'), { what: "sign up" });
});


app.delete('/deleteVenue/:id', delete_venue);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
