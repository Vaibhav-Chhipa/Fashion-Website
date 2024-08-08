const mongoose = require("mongoose")

const connectDB=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // res.send({
        //     message:"DAtabase connected"
        // })
        console.log("Database is connected".bgGreen.white)
    } catch (error) {
        // res.send({
        //     message:`Internal Server Error ${error}`,
        //     success: false,
        //     description:"Database not connected"
        // })
        console.log(`Error Occured ${error}`.bgRed.white)
    }
}

module.exports = connectDB