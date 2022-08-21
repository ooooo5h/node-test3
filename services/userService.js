const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const signUp = async (username, password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );

    if (!pwValidation.test(password)) {
        const err  = new Error("PASSWORD_IS_NOT_VALID");
        err.status = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userDao.createUser(
        username,
        hashedPassword
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