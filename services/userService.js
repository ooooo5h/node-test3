const userDao = require("../models/userDao");

const signUp = async (username, password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );

    if (!pwValidation.test(password)) {
        const err  = new Error("PASSWORD_IS_NOT_VALID");
        err.status = 400;
        throw err;
    }

    // const createUser = await userDao.createUser(
    //     username,
    //     password
    // );

    // console.log('createUSER는 모야', createUser)   // undefined가 찍힘. 왜 찍힐까? 내 생각에는 userDao.createUser가 아무것도 반환하고있지않음.
    // return createUser;  //딱히 필요가 없는 것 같음? 함순데 return값이 없어도 되나? 실행은 되네?? 

    await userDao.createUser(
        username,
        password
    );
}

const signIn = async (username, password) => {
    const [userInfo] = await userDao.getUserByUsername(username);

    if (!userInfo) {
        const err = new Error("USER_DOES_NOT_EXIST");
        err.status = 404;
        throw err;
    }
    
    if (password !== userInfo.password) {
        throw {status : 400, message : "PASSWORD_DOES_NOT_MATCH"}
    }

    // 로그인에 성공했다면? 토큰 보내줘야함
}

module.exports = {
    signUp,
    signIn
}