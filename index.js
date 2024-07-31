import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

// our files
  
import { get_venue_by_index, delete_venue,add_organiser, do_signup, do_signin, get_user_name, get_user_phno, add_venue, get_venues } from './db_connect.js';
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

app.post('/book-class',get_venue_by_index);

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
