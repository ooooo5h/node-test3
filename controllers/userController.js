const userService = require("../services/userService");

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;

        if ( !username || !password ) {
            throw { status : 400, message : "KEY_ERROR"};
        }

        await userService.signUp (username, password);
        return res.status(201).json({ message : "SIGN_UP_SUCCESS" });

    } catch (e) {
        console.log(e);
        return res.status( e.status || 500 ).json({ message : e.message || "SERVER_ERROR" });
    }
};

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if ( !username || !password ) {
            throw { status : 400, message : "USERNAME_OR_PASSWORD_IS_MISSING"};
        }

        await userService.signIn (username, password);
        return res.status(200).json({ message : "SIGN_IN_SUCCESS "});

    } catch (e) {
        console.log(e);
        return res.status( e.status || 500 ).json({ message : e.message || "SERVER_ERROR "});
    }
};


module.exports = {
    signUp,
    signIn
}