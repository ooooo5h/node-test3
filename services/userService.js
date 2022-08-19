const userDao = require("../models/userDao");

const signUp = async (username, password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );

    if (!pwValidation.test(password)) {
        const err = new Error("PASSWORD_IS_NOT_VALID");
        err.status = 400;
        throw err;
    }

    const createUser = await userDao.createUser(
        username,
        password
    );

    return createUser;
}

module.exports = {
    signUp
}