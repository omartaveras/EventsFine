const express = require("express"),
    app = express();

//setup EJS
app.set("view engine", "ejs")

// A sample route
app.get("/", (req, res) => {
    res.render("home");
});

//All Events info
app.get("/allevents", (req, res) => {
    var allEvents = [
        {name: "MegaBash 2030", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/00_MTVCLUB_LOGO_black.png"},
        {name: "Yo! Mtv Raps", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/snoochie-768x432.png"},
        {name: "R3wire & Varski", image: "http://mtvmusicweek.co.uk/wp-content/uploads/2019/02/rewirevarski-768x432.jpg"}
    ]
     res.render("allEvents", {allEvents: allEvents});
    //res.render("allEvents.ejs");
}); 





// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'));
