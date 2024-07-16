//import express from 'express';
const express = require('express');

// Create an express application
const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define the port
const PORT = process.env.PORT || 8080;

// Create empty dictionary to store the data
const data = {};

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Define the routes
app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status);
});

//Route POST for /api/v1/<token>/telemetry
app.post("/api/v1/:token/telemetry", (request, response) => {
    const token = request.params.token;
    const body = request.body;

    //log all the data
    console.log(`Token: ${token}`);
    console.log(`Body: ${JSON.stringify(body)}`);

    data[token] = {
        "last_seen": new Date(),
        "data": body
    };

    response.send({
        "token": token,
        "body": body
    });
});

//Route GET for /api/v1/devices

app.get("/api/v1/devices", (request, response) => {
    response.send(data);
});
