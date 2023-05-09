//////////////////////////////////////DO NOT TOUCH///////////////////////////////////////////////////////
const express = require('express')
const http = require('http')
const Server = require('socket.io').Server
const app = express()
const path = require('path')
const mysql = require('mysql')

const cors = require('cors')
const bodyParser = require('body-parser')
const { connect } = require('http2')

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowing the cookie to be enabled
    credentials: true
}));

app.listen(5001, () => {
    console.log("server is now running on port 5001")
});

// LOGIN COOKIES
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        key: "userId",
        secret: "justinbieber",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 1000 * 24
        }
    })
);

// EC2 CONNECTION

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:'*'
    }
})

const _dirname = path.dirname('')
const buildPath = path.join(__dirname, '../client/build')

app.use(express.static(buildPath))

//////////////////////////////////////DO NOT TOUCH///////////////////////////////////////////////////////

//RDS MYSQL CONNECTION

var connection = mysql.createConnection({
    host: "database-sparklehome.cc0zdfgpl9qm.us-east-1.rds.amazonaws.com",
    user: "adminsparklehome",
    password: "adminsparklehome",
    port: "3306"
});

connection.connect(function(err){
    if(err){
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to RDS.');
});

connection.query('use sparklehome', function (err, results){
    if(err) throw error;
    console.log("connected to database sparklehome");
});

app.get('/login_action', (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
});

// connection.query('select * from user', (err, result, fields) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// });

app.post('/user_register', (req, res) => {
    const name = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const phone = req.body.userPhone;

    connection.query('INSERT INTO user (user_name, user_email, user_password, user_phone) VALUES (?, ?, ?, ?)', [name, email, password, phone], 
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.post('/user_login', (req, res) => {
    const email = req.body.inputEmail;
    const password = req.body.inputPassword;

    connection.query('SELECT * FROM user WHERE user_email = ? AND user_password = ?', [email, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
        } else {
            res.send({ status: 401, message: "Incorrect Credentials!" });
        }
    });
});

app.post('/logout_action', (req, res) => {
    res.clearCookie("userId", { path: "/" });
    res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
});

app.get('/*', function(req, res){
    res.sendFile(
        path.join(buildPath, 'index.html'),
        function(err){
            if (err){
                res.status(500).send(err);
            }
        }
    );
})


  

