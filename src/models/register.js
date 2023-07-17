const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const registerSchema = new mongoose.Schema({

    uname: {

        type: String,
        required: true
    },

    mail: {

        type: String,
        required: true,
        unique: true
    },

    psw: {

        type: String,
        required: true
    }
});

registerSchema.pre("save", async function(next) {

    this.psw = await bcrypt.hash(this.psw, 12);

    next();
        
});

const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;