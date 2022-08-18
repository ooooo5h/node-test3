const router = require("express").Router();
const db = require("../config/mysql");

router.post("/", async (req, res, next) => {
  try {
    const sql = `
        insert into users (user_id, name, age) values (${req.body.user_id}, '${req.body.name}', ${req.body.age});
        `;
    await db.query(sql);
    return res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e.message);
  }
});

// 안되는 코드 => 이대로 테스트하면 뒤에 buff라고 해서 이상한 데이터들이 붙어온다.
// router.get("/", async(req, res, next) => {
//     try {
//         const sql = 'select * from users'
//         const result = await db.query(sql);
//         return res.status(200).json({message:"success", 'result':result})
//     } catch(e) {
//         console.log(e.message);
//     }
// }

// 되는 코드 1 => 인덱스로 짤라내면 된다.
router.get("/", async (req, res, next) => {
  try {
    const sql = "select * from users";
    const result = await db.query(sql);
    return res.status(200).json({ message: "success", result: result[0] });
  } catch (e) {
    console.log(e.message);
  }
});

// 되는 코드2
// router.get("/", async (req, res, next) => {
//   try {
//     const [rows, fields] = await db.query("select * from users");
//     return res.status(200).json({ message: "success", result: rows });
//   } catch (e) {
//     console.log(e.message);
//   }
// });

// 특정 유저 정보 가져오기
router.get("/:userId", async (req, res, next) => {
  try {
    const userId         = req.params.userId;        
    const sql            = `select * from users where user_id=${userId}`;
    const [rows, fields] = await db.query(sql);
    // console.log(rows)
    if (rows.length) {
        // console.log('데이터있음')
        return res.status(200).json({ message: "success", result: rows });
    } else {
        // console.log('데이터없음')
        return res.status(404).json({message:"USER_NOT_FOUND"})
    }
    
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
