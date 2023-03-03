var Connection = require("../../dataBase/index");
const express = require("express");
const router = express.Router();
const formateDate=function() {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const newFormat = `${year}-${month}-${day}`;
  return newFormat;
}
router.post("/set", async (req, res) => {
  const db = await Connection.con().connect();
  const re = await db.query(
    `UPDATE appoitments SET
      pid = '${req.query.pid}',createdAt = '${formateDate()}', appstart = '${
      req.query.appstart
    }',append= '${req.query.append}', cancelled = '${
      req.query.cans ? req.query.cans : false
    }',notes='${req.query.notes}' WHERE
      id = ${req.query.id} returning id;`,
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      let date = new Date(req.query.appstart);
      //   show day number in month and show hour of the day
      console.log(
        date.toLocaleString("en", {
          day: "numeric",
          hour: "numeric",
          timeZone: "Asia/Jerusalem",
        })
      );
      // console.log((date - new Date()) / 1000 / 60);
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
    // you can get today appoitments jsut write code
    "select appoitments.id,patients.id as pid,name, createdat ,appstart,append,cancelled,appoitments.notes FROM appoitments INNER JOIN patients ON appoitments.pid = patients.id where appstart>=current_date order by appstart;",
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
  await console.log(typeof req.query.pid);
  const re = await db.query(
    `INSERT INTO appoitments (pid,createdat,appstart,append,cancelled,notes) VALUES ('${
      req.query.pid
    }','${formateDate()}','${req.query.appstart}','${req.query.append}','${
      req.query.cans ? req.query.cans : false
    }','${req.query.notes}')
           returning id;`,
    (error, results) => {
      if (error) {
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
router.post("/delete", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `DELETE FROM appoitments
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
    `select * from appoitments where id=${req.query.id}`,
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
router.get("/checkstart", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `select append from APPOITMENTS where '${req.query.appstart}' between appstart and append;`,
    (error, results) => {
      if (error) {
        throw error;
      }

      let data = results.rows;
      if (data[0]) {
        res.status(200).json(results.rows);
      } else {
        res.status(200).json([{ status: "available" }]);
      }
    }
  );
});
router.get("/checkend", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `select appstart from APPOITMENTS where '${req.query.append}' between appstart and append;`,
    (error, results) => {
      if (error) {
        throw error;
      }

      let data = results.rows;
      if (data[0]) {
        res.status(200).json(results.rows);
      } else {
        res.status(200).json([{ status: "available" }]);
      }
    }
  );
});
module.exports = router;
