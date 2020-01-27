const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//create express app
const app = express();

// default options
app.use(fileUpload());

//port at which the server will run
const port = 8000;

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});
// POST method route
app.post("/", function(req, res) {
  res.send("POST request to the homepage");
});

app.get("/upload", urlencodedParser, function(request, response) {
  response.sendFile(__dirname + "/upload.html");
});

app.post("/upload", function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.foo;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`/src/UserUpload/${sampleFile.name}`, function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });

  console.log(req.files.foo); // the uploaded file object
});

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);
