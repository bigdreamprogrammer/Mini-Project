const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(()=>{
    console.log("Connection successful");
}).catch((err)=>console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://myproject:RIlFAGEl9mdFKjHD@cluster0.yzydpvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}




Chat.insertMany([
    {
    from:"Sujeet kuamr",
    to:"Amit kumar",
    msg:"Send me your exam sheets",
    created_at:new Date()
    },
    {
    from:"Naveen Parkash",
    to:"Sakham Prakash",
    msg:"Send me your exam sheets",
    created_at:new Date()
    },
    {
    from:"Kehav Jha",
    to:"Amit kumar",
    msg:"Send your email Id",
    created_at:new Date()
    },
    {
    from:"Sandeep Kumar",
    to:"Sujeet kumar",
    msg:"Send me some money",
    created_at:new Date()
    }

]);