import path from "path";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const a_uri = "mongodb+srv://cherrycharan238:CHERRYCHARAN2380@cluster0.tavn5wb.mongodb.net/srchackathon"
const c_uri = "mongodb://localhost:27017/srchacakathon"; // Use the local connection string
mongoose.connect(a_uri).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('Connection error', err.message);
});

// Define schemas and models
const studentSignupSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  password: { type: String, minlength: 2, required: true },
  role: { type: String, required: true },
}, { collection: 'studentsignup' });

const StudentSignup = mongoose.model('StudentSignup', studentSignupSchema);

const facultySignupSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  password: { type: String, minlength: 2, required: true },
  role: { type: String, required: true },
}, { collection: 'facultysignup' });

const FacultySignup = mongoose.model('FacultySignup', facultySignupSchema);

var user_name = "unknown_user";

export async function do_signup(req, res) {
  console.log(req.body);
  try {
    const { name, email, role, branch, password } = req.body;
    user_name = name;
    if (role === "student") {
      const newUser = new StudentSignup({ name, email, branch, password, role });
      await newUser.save();
    } else if (role === "faculty") {
      const newUser = new FacultySignup({ name, email, branch, password, role });
      await newUser.save();
    }
    res.render(path.join(__dirname, "/public/home.ejs"), { user_name: 'charan' });
  } catch (err) {
    res.status(500).send(err);
  }
};

export async function do_signin(req, res) {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await StudentSignup.findOne({ email }) || await FacultySignup.findOne({ email });
    if (!user) return res.status(400).send('User does not exist');
    if (password !== user.password) return res.status(400).send('Incorrect password');
    user_name = user.name;
    res.render(path.join(__dirname, "/public/home.ejs"), { user_name: 'charan' });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export function get_user_name() {
  return user_name;
}

export function get_user_phno() {
  return 8520811855;
}

// home files will come here 
const organisationSchema = new mongoose.Schema({
  email: { type: String, required: true }
});

const Organiser = mongoose.model('Organiser', organisationSchema);

export async function add_organiser(req, res) {
  try {
    const studentEmail = req.body.email;
    const organisation = new Organiser({ email: studentEmail });
    await organisation.save();
    res.render(path.join(__dirname, "/public/home.ejs"));
  } catch (error) {
    res.status(500).send('Error submitting emails: ' + error.message);
  }
}

const VenueSchema = new mongoose.Schema({
  venue: String,
  availability: String,
  start: String,
  end: String,
  booked: String,
  phno: String
});

const Venue = mongoose.model('Venue', VenueSchema);

export async function add_venue(req, res) {
  try {
    const newOrganisation = new Venue(req.body);
    await newOrganisation.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Error adding venue: ' + err.message);
  }
}

export async function get_venues(req, res) {
  try {
    const venues = await Venue.find({});
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch venues' });
  }
}
export async function delete_venue(req, res) {
  try {
    const id = req.params.id;
    await Venue.findByIdAndDelete(id);
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete venue', error: error.message });
  }
}

export async function get_venue_by_indexx(req, res) {
  const index = parseInt(req.params.index, 10);
  try {
    const venues = await Venue.find({}).sort({ _id: 1 }).skip(index).limit(1);
    if (venues.length === 0) {
      return res.status(404).json({ message: 'No venue found at the specified index' });
    }
    res.json(venues[0]);
  } catch (error) {
    console.error('Error fetching venue by index:', error);
    res.status(500).json({ message: 'Failed to fetch venue' });
  }
}


export async function get_venue_by_index(req ,res){
  try {
    const { n } = req.body;
    const nthDocument = await Venue.findOne().skip(n - 1);
    console.log(nthDocument);
  } catch (error) {
    console.error('Error retrieving document:', error);
  }
}

