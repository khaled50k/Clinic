var Connection = require("../../dataBase/index");
const express = require("express");
const router = express.Router();

router.get("/get", async (req, res) => {
  const db = await Connection.con().connect();
  const data = await db.query(
    `select * from admin where username='${req.query.username}'`,
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
