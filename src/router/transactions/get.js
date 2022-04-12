const router = require("express").Router();
const pool = require("../../config/database");

const getTransactionSumPerMonth = router.get(
  "/sum/per-month",
  async (req, res) => {
    try {
      const connection = await pool.promise().getConnection();
      const sqlgetTransactionSumPerMonth = `SELECT created_at as Date , sum(totalAmount) as totalAmount 
      FROM transactions GROUP BY MONTH(created_at);`;
      const [result] = await connection.query(sqlgetTransactionSumPerMonth);
      connection.release();

      res.status(200).send({ result });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = { getTransactionSumPerMonth };
