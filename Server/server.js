const express = require('express');
const collection = require('./mdb');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
//backend port
const PORT = 8000 || process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/', cors(), (req, res) => {});

app.get('/clientsdata', async (req, res) => {
  collection
    .find()
    .sort({ _id: -1 })
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });

  // collection.find({}, (err, result)=>{
  //   if(!err){
  //     res.send(result)
  //   }else{
  //     console.log(err)
  //   }
  // })
});

app.post('/', async (req, res) => {
  const { name, email, phone, company, service, msg } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: '',
    },
  });

  let mailOptions = {
    from: 'Hirola Infotech Solutions Pvt ltd<dineshroyc25@gmail.com>', // sender address
    to: 'dineshroyc25@gmail.com', // list of receivers
    subject: 'New Hirola Infotech Form', // Subject line
    text: 'Hello world?', // plain text body
    html: `<table border="1px"><tr><td>Name</td><td>${name}</td>
    </tr><tr><td>Email</td><td>${email}</td></tr>
    <tr><td>Phone-Number</td><td>${phone}</td></tr>
    <tr><td>Company</td><td>${company}</td></tr>
    <tr><td>Service</td><td>${service}</td></tr>
    <tr><td>Message</td><td>${msg}</td></tr>
    </table>`, // html body
  };

  let mailOptionsClient = {
    from: "dineshroyc25@gmail.com", // sender address
    to: email, // list of receivers
    subject: 'Hirola Infotech Solution pvt ltd', // Subject line
    text: 'Hello world?', // plain text body
    html: `<h1>Thanks for Submitting form Our Team will Contact You Soon</h1>
    <p>Below are the form details you sent to Us.</p>
    <table border="1px"><tr><td>Name</td><td>${name}</td>
    </tr><tr><td>Email</td><td>${email}</td></tr>
    <tr><td>Phone-Number</td><td>${phone}</td></tr>
    <tr><td>Company</td><td>${company}</td></tr>
    <tr><td>Service</td><td>${service}</td></tr>
    <tr><td>Message</td><td>${msg}</td></tr>
    </table>`, // html body
  };

  const data = {
    name: name,
    email: email,
    phone: phone,
    company: company,
    service: service,
    msg:msg
  };
  await collection.insertMany([data]).then(
    transporter.sendMail( mailOptions,(err, info) => {
      if (!err) {
      } else {
        console.log(err);
      }
    })
  );
  try {
    transporter.sendMail(mailOptionsClient, (err, info) => {
      if (!err) {
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    console.log('Client sent email error occured');
  }
});

app.listen(PORT, () => {
  console.log('port Connected');
});
