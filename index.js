const express=require("express")
// Importing all the routes
const numbers=require("./routes/numbers.js")



const app=express()
app.listen((3000),()=>{
    console.log("Server is Running")
    app.use(express.json());

})
// Handling routes request
app.use(express.json());
app.use("/",numbers)
// app.use("/",loginroute)


