// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

// Clear the module cache for date.js
delete require.cache[require.resolve(__dirname + '/date.js')];
const dateModule = require(__dirname + '/date.js');

console.log(dateModule.getDate()); // Log the current date when the server starts

const app = express();

const items = ["Breakfast", "Lunch", "Dinner"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Handle GET requests to the root route
app.get("/", function (req, res) {
    const day = dateModule.getDate(); // Get the current date

    console.log("GET request received for the root route."); // Log when a GET request is received for the root route
    console.log("Current day:", day); // Log the current day

    res.render("list", { listTitle: day, newListItems: items }); // Render the 'list.ejs' template with dynamic data
});

function addItemToList(item, list) {
    list.push(item);
}

// Handle POST requests to the root route (for adding new items)
app.post("/", function (req, res) {
    console.log("POST request received for the root route."); // Log when a POST request is received for the root route
    console.log("Request body:", req.body); // Log the request body

    const item = req.body.newItem;
    const listTitle = req.body.list.toLowerCase(); // Convert list title to lowercase

    if (listTitle === "work") { // Check with lowercase "work"
        addItemToList(item, workItems); // Add the item to the work list
        console.log("Added to workItems:", item); // Log when an item is added to workItems
        res.redirect("/work"); // Redirect to the work list
    } else {
        addItemToList(item, items); // Add the item to the default list
        console.log("Added to items:", item); // Log when an item is added to items
        res.redirect("/"); // Redirect to the default list
    }
});

// Handle GET requests to the 'work' route
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems }); // Render the 'list.ejs' template for the work list
});

// Handle POST requests to the 'work' route (for adding new work items)
app.post("/work", function (req, res) {
    let item = req.body.newItem; // Get the new work item from the form
    addItemToList(item, workItems); // Add the work item to the work list
    console.log("Added to workItems:", item); // Log when an item is added to workItems
    res.redirect("/work"); // Redirect to the work list
});

// Start the server
app.listen(3000, function () {
    console.log("Server is running on port 3000."); // Log when the server is running
});
