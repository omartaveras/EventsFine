const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


// connect mongoDB with mongoose
mongoose.connect('mongodb://localhost/eventsAPP_v2', { useNewUrlParser: true });
//setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
//setup EJS
app.set("view engine", "ejs")

//Schema setup for DB
const eventSchema = new mongoose.Schema({
    name: String,
    genre: String,
    description: String,
    image: String
});
const Event = mongoose.model("Event", eventSchema);

//Create event into the DB
// Event.create(
//     {
//         name: "R3wire & Varski",
//         genre: "EDM",
//         description: "YO! MTV Raps: Plymouth is a one-off special live event show that celebrates unique style and sound, and reminds the rest of the world why Great Britain is currently leading the way when it comes to creativity in rap and hip-hop music today. The event will be filmed in Plymouth’s unique venue The Hub on Friday 7th June and will bring the UK’s finest together to perform, support and celebrate one another.",
//         image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/rewirevarski-768x432.jpg"
//     }, (err, event) => {
//         if (err) {
//             console.log(err);

//         } else {
//             console.log("Newly created Event");
//             console.log(event);
//         }
//     }
// );


//Array for All Events (example event) 
// var allEvents = [
//     { name: "MegaBash 2030", genre: "House", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/00_MTVCLUB_LOGO_black.png" },
//     { name: "Yo! Mtv Raps", genre: "Hip Hop", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/snoochie-768x432.png" },
//     { name: "R3wire & Varski", genre: "EDM", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/rewirevarski-768x432.jpg" },
//     { name: "The Amazons", genre: "Rock", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/the_amazons-768x432.jpg" }
// ];


// A sample route Home page
app.get("/", (req, res) => {
    res.render("home");
});

//All Events info, INDEX
app.get("/allevents", (req, res) => {
    //Get all events from DB
    Event.find({}, (err, allEvents) => {
        if (err) {
            console.log(err);
        } else {
            res.render("allEvents", { allEvents: allEvents });
        }
    });
});

//Setup and Create a new Event on DB
app.post("/allevents", (req, res) => {
    //Get data from form and add to all events in to array[allEvents]
    var name = req.body.name;
    var genre = req.body.genre;
    var desc = req.body.description;
    var image = req.body.image;
    var newEvent = { name: name, genre: genre, description: desc, image: image }
    //create a new Event and save to Db
    Event.create(newEvent, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            //Redirect back to all events page.
            res.redirect("/allevents");
        }
    });
});

// Show Form to Create a new Event
app.get("/allevents/new", (req, res) => {
    res.render("newevent.ejs");
});

// Show more info about one Event(Show.ejs)
app.get("/allevents/:id", (req, res) => {
    //Find the event with provided ID
    Event.findById(req.params.id, (err, foundEvent) => {
        if (err) {
            console.log(err);
        } else {
            //render show template with that event
            res.render("show", {event: foundEvent});
        }
    });
});

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'));


// Start server in deploying mode...
// app.listen(process.env.PORT, process.env.IP,() => {
//     console.log('Server running on Deploying mode')
// });    
