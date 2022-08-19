const router = require("express").Router();
const db = require("../config/mysql");
const userController = require("../controllers/userController");

// 유저 등록하기
router.post("/", async (req, res, next) => {
  try {
    const sql = `
        insert into users (username, password) values ('${req.body.username}', '${req.body.password}');
        `;
    await db.query(sql);
    return res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e.message);
  }
});

// 전체 유저 조회하기
router.get("/", async (req, res, next) => {
  try {
    const sql = "select * from users";
    const result = await db.query(sql);
    return res.status(200).json({ message: "success", result: result[0] });
  } catch (e) {
    console.log(e.message);
  }
});

// 특정 유저 정보 가져오기
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const sql = `select * from users where id=${userId}`;
    const [rows, fields] = await db.query(sql);
    // console.log(rows)
    if (rows.length) {
      return res.status(200).json({ message: "success", result: rows });
    } else {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

// 특정 유저 정보 수정하기
router.post("/:userId", async (req, res, next) => {
  try {
    const sql = `UPDATE users SET username = '${req.body.username}', password='${req.body.password}' WHERE id = '${req.params.userId}'`;
    const rows = await db.query(sql);
    console.log(rows[0]);
    return res.status(200).json({ message: "updated" });
  } catch (e) {
    console.log(e.message);
  }
});

// 특정 유저 삭제하기
router.delete("/:userId", async (req, res, next) => {
  try {
    const sql = `select * from users where id = ${req.params.userId};`;
    const [rows, fields] = await db.query(sql);
    if (rows.length) {
      const sql2 = `delete FROM users where id=${req.params.userId};`;
      const rows = await db.query(sql2);
      return res.status(200).json({ mesaage: "deleted" });
    } else {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
