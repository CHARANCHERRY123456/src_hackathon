import path from "path";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const atlas_uri = "mongodb+srv://cherrycharan238:CHERRYCHARAN2380@cluster0.tavn5wb.mongodb.net/srchackathon"
const compass_uri = "mongodb://localhost:27017/srchacakathon"
// Connect to MongoDB
mongoose.connect(compass_uri).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('Connection error', err.message);
});

// Define schemas and models
const studentSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
}, {
  collection: 'studentsignup'
});
const StudentSignup = mongoose.model('StudentSignup', studentSignupSchema);
const facultySignupSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
}, {
  collection: 'facultysignup'
});
const FacultySignup = mongoose.model('facultySignup', facultySignupSchema);


export async function  do_signup(req, res) {
  console.log(req.body);
  try {
    const { name, email, role, branch, password } = req.body;
    if (role == "student") {
      const newUser = new StudentSignup({ name, email, branch, password, role });
      await newUser.save();
    }
    else if (role == "faculty") {
      const newUser = new FacultySignup({ name, email, branch, password, role });
      await newUser.save();
    }
    res.render(__dirname+ "/public/home.ejs", {
      user_name: 'charan'
    });
  } catch (err) {
    res.status(500).send(err);
  }
};



export async function do_signin(req, res) {
    console.log(req.body);
    try {
      const { email, password } = req.body;
  
      // Find user by email
      
      const user = await StudentSignup.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).send('User does not exist');
      }
      // Check ifpassword matches
      console.log(password);
      console.log(user.password);
      if ((password != user.password)) {
        return res.status(400).send('Incorrect password');
      }
  
      res.render(__dirname+"/public/home.ejs", {
        user_name: 'charan'
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }



  // home files will come here 
const organisationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});

const Organiser = mongoose.models.Organiser || mongoose.model('Organiser', organisationSchema);

export async function add_organiser(req , res){
  try {
    const studentEmail  = req.body.email;
    console.log(studentEmail);
    const organisation = new Organiser({
      email:studentEmail
    });
    await organisation.save();
    res.render(__dirname+ "/public/home.ejs");
  } catch (error) {
    res.status(500).send('Error submitting emails: ' + error.message);
  }

}

