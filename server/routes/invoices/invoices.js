var Connection = require("../../dataBase/index");
const express = require("express");
const formateDate=function() {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const newFormat = `${year}-${month}-${day}`;
  return newFormat;
}
const router = express.Router();
router.post("/set", async (req, res) => {
  const db = await Connection.con().connect();
  let price = req.query.price;
  let disc = req.query.disc;
  let total = price - price * (disc / 100);
  const re = await db.query(
    `UPDATE invoices SET
      pid = '${req.query.pid}', price = '${price}',discount= '${
      disc ? disc : 0
    }', opid = '${
      req.query.opid
    }', total = '${total}',createdat='${formateDate()}',notes='${req.query.notes}' WHERE
      id = ${req.query.id} returning id;`,
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      let data = results.rows;
      if (data[0]) {
        res.status(200).json({ status: "true" });
      } else {
        res.status(200).json({ status: "false" });
      }
    }
  );
});
router.get("/", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    "SELECT patients.name as name,patients.id as pid,operations.id as opid, invoices.id as id, invoices.price as price, invoices.discount as discount, invoices.total as total,invoices.notes as notes, operations.name as operation_name, invoices.createdat as createdat FROM patients JOIN invoices ON patients.id = invoices.pid JOIN operations ON invoices.opid = operations.id;",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

router.post("/add", async (req, res) => {
  const db = await Connection.con().connect();
  let price = req.query.price;
  let disc = req.query.disc;
  let total = price - price * (disc / 100);
  console.log(total);
  const re = await db.query(
    `INSERT INTO invoices (pid,price,discount,total,opid,createdat,notes) VALUES ('${
      req.query.pid
    }','${price}','${disc ? disc : 0}','${total}','${
      req.query.opid
    }','${formateDate()}','${req.query.notes}')
           returning id;`,
    (error, results) => {
      if (error) {
        throw error;
      }

      let data = results.rows;
      if (data[0]) {
        res.status(200).json({ status: "true" });
      } else {
        res.status(200).json({ status: "false" });
      }
    }
  );
});
router.post("/delete", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `DELETE FROM invoices
    WHERE id=${req.query.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
router.get("/get", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `SELECT patients.name as name,patients.id as pid,operations.id as opid, invoices.id as id, invoices.price as price, invoices.discount as discount, invoices.total as total,invoices.notes as notes, operations.name as operation_name, invoices.createdat as createdat FROM patients JOIN invoices ON patients.id = invoices.pid JOIN operations ON invoices.opid = operations.id where invoices.id=${req.query.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      let data = results.rows;
      if (data[0]) {
        res.status(200).json(results.rows);
      } else {
        res.status(200).json({ status: "false" });
      }
    }
  );
});
module.exports = router;
