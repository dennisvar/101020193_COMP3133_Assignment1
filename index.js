const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log("CONNECTED!!")
}).catch(error => {
    console.log("FAILED TO CONNECT??")
})

const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server running @ http://localhost:${process.env.PORT}`)
})

