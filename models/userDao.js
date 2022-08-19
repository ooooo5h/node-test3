const db = require("../config/mysql");

const createUser = async (username, password) => {
    try {
        const sql = 
        `
        INSERT INTO 
            users 
            (username, password) 
        VALUES 
            ('${username}', '${password}');
        `;
        await db.query(sql);

    } catch (e) {
        const error  = new Error("INVALID_DATA_INPUT");
        error.status = 500;
        throw error;
    }
}

const getUserByUsername = async(username) => {
    const sql = 
    `
    SELECT 
        * 
    FROM 
        users 
    WHERE 
        username='${username}'
    `

    const [rows, fields] = await db.query(sql)
    return rows;
}


module.exports = {
    createUser,
    getUserByUsername,
}