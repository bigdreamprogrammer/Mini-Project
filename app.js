const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const session = require('express-session');
const MongoStore = require('connect-mongo');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

app.use(session(sess))
const port = 8080;

main().then(()=>{
    console.log("Connection successful");
}).catch((err)=>console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://myproject:RIlFAGEl9mdFKjHD@cluster0.yzydpvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

app.use(session({
  store: MongoStore.create({
    secret: 'keyboard cat',
    mongoUrl: 'mongodb+srv://myproject:RIlFAGEl9mdFKjHD@cluster0.yzydpvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  })
}));


// let chat1 = new Chat({
//     from:"Sujeet kuamr",
//     to:"Amit kumar",
//     msg:"Send me your exam sheets",
//     created_at:new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res);
// });

app.get("/",async (req,res)=>{
    let chats = await Chat.find();
    res.render("show.ejs",{chats});
});

app.get("/new",(req,res)=>{
    res.render("new.ejs");
});

// Edit Route
app.get("/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

// update route
app.put("/:id",async (req,res)=>{
    let  {id} =  req.params;
    let {msg:newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg});
    res.redirect("/");

});


// delete route
app.delete("/:id", async (req, res)=> {
    let  {id} =  req.params;
    let deleted = await Chat.findByIdAndDelete(id);
    res.redirect("/");
});

app.post("/",(req,res)=>{
    let {from,msg,to}= req.body;
    let newchat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
        newchat.save().then((res)=>{
    });
    res.redirect("/");
});

app.listen(port,()=>{
    console.log("Listening to port 8080")
});