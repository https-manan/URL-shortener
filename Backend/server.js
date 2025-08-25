const express = require('express');
const route  = require('./Routes/url');
const app = express();
const port  = 8080;
const  dotenv =  require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const URL = require('./Model/url');
dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected ");
  } catch (err) {
    console.error("MongoDB connection error :", err);
  }
};

connectDB();

app.use(cors())
app.use(express.json());


app.use('/url',route);


app.get('/:shortId', async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})