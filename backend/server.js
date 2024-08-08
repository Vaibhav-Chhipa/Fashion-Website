const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const rootroutes = require("./routes/routeroute");
const productroute = require("./routes/productroute")
const connectDB = require("./config/db")

const PORT = process.env.PORT || 6000 || 8000
const app = express();
connectDB()

// app.get("/",(req,res)=>{
//     res.send("api is working");
// })

app.use("/",rootroutes);
app.use("/Fastion_Treands",productroute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`.bgBlue.black)
})