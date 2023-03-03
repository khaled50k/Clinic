var Connection = require("../../dataBase/index");
const express = require("express");
const router = express.Router();
router.post("/set", async (req, res) => {
  const db = await Connection.con().connect();
  const re = await db.query(
    `UPDATE operations SET
      name= '${req.query.name}' WHERE
      id = ${req.query.id} returning id;`,
    (error, results) => {
      if (error) {
        res.json({ status: "false" });
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
    "select * from operations  order by name",
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
  const re = await db.query(
    `INSERT INTO operations (name) VALUES ('${req.query.name}')
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
    `DELETE FROM operations
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
    `select * from operations where id=${req.query.id}`,
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
