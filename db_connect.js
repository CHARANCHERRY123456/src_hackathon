import path from "path";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Connect to MongoDB
mongoose.connect('mongodb+srv://cherrycharan238:CHERRYCHARAN2380@cluster0.tavn5wb.mongodb.net/srchackathon').then(() => {
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
    unique: true,
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

export async function  do_signup(req, res) {
  console.log(req.body);
  try {
    const { name, email, role, branch, password } = req.body;
    if (role == "Student") {
      const newUser = new StudentSignup({ name, email, branch, password, role });
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



