const bcrypt = require("bcryptjs");

const hashPassword = async (pass) => {
    return await bcrypt.hash(pass, 10);
}

const comparePassword = async (pass_one, pass_two) => {
    return await bcrypt.compare(pass_one, pass_two);
}

module.exports = {
    hashPassword,
    comparePassword
}