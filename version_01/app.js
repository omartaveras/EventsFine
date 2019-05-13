const  express = require("express"),
           app = express(),
    bodyParser = require("body-parser");


//setup body parser
app.use(bodyParser.urlencoded({extended: true}));    
//setup EJS
app.set("view engine", "ejs")

//Array for All Events (example event) 
var allEvents = [
        {name: "MegaBash 2030", genre: "House", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/00_MTVCLUB_LOGO_black.png"},
        {name: "Yo! Mtv Raps", genre: "Hip Hop", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/snoochie-768x432.png"},
        {name: "R3wire & Varski", genre: "EDM", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/rewirevarski-768x432.jpg"},
        {name: "The Amazons", genre: "Rock", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/the_amazons-768x432.jpg"}
    ];


// A sample route Home page
app.get("/", (req, res) => {
    res.render("home");
});

//All Events info
app.get("/allevents", (req, res) => {    
     res.render("allEvents", {allEvents: allEvents});
}); 

//Setup new Event POST route
app.post("/allevents", (req, res) => {
    //Get data from form and add to all events in to array[allEvents]
    var name = req.body.name;
    var genre = req.body.genre;
    var image = req.body.image;
    var newEvent = {name: name, genre: genre, image: image}
    allEvents.push(newEvent);
    //Redirect back to all events page.
    res.redirect("/allevents");

});

// Create a new event
app.get("/allevents/new", (req, res) => {
    res.render("newevent.ejs");
});


// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'));


// Start server in deploying mode...
// app.listen(process.env.PORT, process.env.IP,() => {
//     console.log('Server running on Deploying mode')
// });    
