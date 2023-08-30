// jshint esversion:6

console.log(module); // Log the module object when the module is loaded

// Export a function to get the current date
exports.getDate = function() {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    let day = today.toLocaleDateString("en-US", options);

    console.log("Getting date:", day); // Log when the getDate function is called

    return day;
};

// Export a function to get the current day of the week
exports.getDay = function() {
    const today = new Date();
    const options = {
        weekday: "long",
    };
    let day = today.toLocaleDateString("en-US", options);

    console.log("Getting day:", day); // Log when the getDay function is called

    return day;
};

console.log(module.exports); // Log the module.exports object at the end of the module
