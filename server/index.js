const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// access database

app.use(bodyParser.json());
app.use(cors());
const patients = require("./routes/patients/patients");
app.use("/api/patients", patients);
const appoitments = require("./routes/appoitments/appoitments");
app.use("/api/appoitments", appoitments);
const invoices = require("./routes/invoices/invoices");
app.use("/api/invoices", invoices);
const operations = require("./routes/operations/operations");
app.use("/api/operations", operations);
const admin = require("./routes/admin/admin");
app.use("/api/admin", admin);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

