const express = require("express"),
    app = express();

//setup EJS
app.set("view engine", "ejs")

// A sample route
app.get("/", (req, res) => {
    res.render("home");
});

//All events
app.get("/allEvents", (req, res) => {
    res.render("home");
}); 





// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'));
