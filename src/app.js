const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
require("./db/connection");
const Register = require("./models/register");
const bcrypt = require("bcryptjs");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {

    res.status(200).render("index");
});

app.get("/register", (req, res) => {

    res.status(200).render("register");
});

app.post("/register", (req, res)=>{

    const registeredUser = new Register(req.body);

    registeredUser.save()
    .then(()=>{

        res.status(201).render("register");
    })
    .catch((err)=>{

        res.status(400).send(err);
    });
});

app.get("/login", (req, res)=>{

    res.status(200).render("login");
});

app.post("/login", async (req, res)=>{

    const username = req.body.uname;
    const psw = req.body.psw;

    try {

        const user = await Register.findOne({uname: username});

        const isMatch = await bcrypt.compare(psw, user.psw);

        if(isMatch) {

            res.status(200).render("index");
        }
        else {

            res.send("Invalid Username or Password!");
        }
    }
    catch(err) {

            res.status(400).send("Invalid Username or Password!");
    }
});

app.listen(port, () => {

    console.log(`Server is running at port: ${port}`);
});



