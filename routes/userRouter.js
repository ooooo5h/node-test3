const router = require("express").Router();
const userController = require("../controllers/userController");

router.post('/signup', userController.signUp);

module.exports = {
    router
}


// const router = require("express").Router();
// const db = require("../config/mysql");
// const userController = require("../controllers/userController");

// // 유저 등록하기
// router.post("/", async (req, res, next) => {
//   try {
//     if (!req.body.username || !req.body.password) {
//         throw {status:400, message:"KEY_ERROR"}
//     }
//     const sql = `
//         insert into users (username, password) values ('${req.body.username}', '${req.body.password}');
//         `;
//     await db.query(sql);
//     return res.status(200).json({ message: "success" });
//   } catch (e) {
//     return res.status(e.status || 500).json({message: e.message||"SERVER_ERROR"})
// }
// });

// // 전제 유저 조회
// router.get("/", async (req, res, next) => {
//   try {
//     const sql = "select * from users";
//     const result = await db.query(sql);
//     return res.status(200).json({ message: "success", result: result[0] });
//   } catch (e) {
//     return res.status(500).json({message:"SERVER_ERROR"})
//   }
// });

// // 특정 유저 정보 가져오기
// router.get("/:userId", async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const sql = `select * from users where id=${userId}`;
//     const [rows, fields] = await db.query(sql);
//     if (rows.length) {
//       return res.status(200).json({ message: "success", result: rows });
//     } else {
//         const err = new Error("USER_NOT_FOUND");
//         err.status = 404
//         throw err
//     }
//   } catch (e) {
//     return res.status(e.status || 500).json({message: e.message || "SERVER_ERROR"})
// }
// });

// // 특정 유저 정보 수정하기
// router.post("/:userId", async (req, res, next) => {
//   try {
//     const check_sql = `select * from users where id=${req.params.userId}`;
//     const [row, field] = await db.query(check_sql);
//     console.log(row);
//     if (row.length) {
//       const sql = `UPDATE users SET username = '${req.body.username}', password='${req.body.password}' WHERE id = '${req.params.userId}'`;
//       await db.query(sql);
//       return res.status(200).json({ message: "updated" });
//     } else {
//         const err = new Error("USER_NOT_FOUND");
//         err.status = 404
//         throw err
//     }
//   } catch (e) {
//     return res.status(e.status || 500).json({message : e.message || "SERVER_ERROR"})
// }
// });

// // 특정 유저 삭제하기
// router.delete("/:userId", async (req, res, next) => {
//   try {
//     const sql = `select * from users where id = ${req.params.userId};`;
//     const [rows, fields] = await db.query(sql);
//     if (rows.length) {
//       const sql2 = `delete FROM users where id=${req.params.userId};`;
//       await db.query(sql2);
//       return res.status(200).json({ mesaage: "deleted" });
//     } else {
//       throw {status: 404, message:"USER_NOT_FOUND"};
//     }
//   } catch (e) {
//     return res.status(e.status || 500).json({message : e.message || "SERVER_ERROR"})
//   }
// });

// module.exports = router;

