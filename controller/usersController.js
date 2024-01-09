const usersSchema = require("../model/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const createUsers = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.status(400).json({ error: "All fields are mandatory" });
            return;
        }
        const emailTaken = await usersSchema.findOne({ email });
        if (emailTaken) {
            res.status(400);
            throw new Error("Email Already Taken");
        }
        const encryptPwd = await bcrypt.hash(password, 10)
        const create = await usersSchema.create({ email, password: encryptPwd, role });
        res.status(201).json(create);
    } catch (error) {
        next(error);
    }
};
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All Fields are Mandatory");
        }
        const userCheck = await usersSchema.findOne({ email });
        if (userCheck && (await bcrypt.compare(password, userCheck.password))) {
            const accessToken = jwt.sign({
                user: {
                    email: userCheck.email,
                    password: userCheck.password,
                    role: userCheck.role
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "240m" })
            res.status(200).json({ accessToken: accessToken, userinfo: { email: userCheck.email, role: userCheck.role } })
        }
        else {
            res.status(400);
            throw new Error("Email and Password is not valid");
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { createUsers, loginUser };

