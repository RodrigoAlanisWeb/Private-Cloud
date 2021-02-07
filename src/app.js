const express = require("express");
const app = express();

const morgan = require("morgan");

// Middlewares
app.use(morgan("dev"));

// Settings
app.set("port", process.env.PORT || 3000);

// Routers

// Start the server
app.listen(app.get("port"),() => {
    console.log("Server On Port " + app.get("port"));
});

