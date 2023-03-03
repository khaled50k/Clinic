var Connection = require("../../dataBase/index");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `select * from patients where deleted='${false}'  order by name `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
router.post("/delete", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `UPDATE patients SET deleted= '${true}'
    WHERE id=${req.query.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      let data = results.rows;
      if (data) {
        res.status(200).json(results.rows);
      } else {
        res.status(200).json([{ status: "false" }]);
      }
    }
  );
});
router.get("/get", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `select * from patients where id=${req.query.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      let data = results.rows;
      if (data[0]) {
        res.status(200).json(results.rows);
      } else {
        res.status(200).json([{ status: "false" }]);
      }
    }
  );
});
router.post("/set", async (req, res) => {
  const db = await Connection.con().connect();
  const re = await db.query(
    `UPDATE patients SET
    name = '${req.query.name}', phonenumber = '${req.query.pn}', gender = '${
      req.query.gen
    }'::character varying, dateofbirth = '${
      req.query.dob
    }'::date ,casestudy = '${
      req.query.cs 
    }'::character varying,currentmedication = '${
      req.query.cm 
    }'::character varying,notes = '${
      req.query.not 
    }'::character varying WHERE
    id = ${req.query.id} returning id;`,
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      let data = results.rows;
      if (data[0]) {
        res.status(200).json([{ status: "true" }]);
      } else {
        res.status(200).json([{ status: "false" }]);
      }
    }
  );
});
router.post("/add", async (req, res) => {
  const db = await Connection.con().connect();
  const re = await db.query(
    `INSERT INTO patients (
        name, phonenumber, gender, dateofbirth,currentmedication,casestudy,notes) VALUES (
        '${req.query.name}', '${req.query.pn}', '${
      req.query.gen
    }'::character varying, '${req.query.dob}', '${
      req.query.cm 
    }'::character varying, '${
      req.query.cs 
    }'::character varying, '${
      req.query.not 
    }'::character varying)
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

module.exports = router;
