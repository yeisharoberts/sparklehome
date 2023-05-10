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
    cors: {
        origin: '*'
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

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to RDS.');
});

connection.query('use sparklehome', function (err, results) {
    if (err) throw error;
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
            if (err) {
                console.log(err);
            } else {
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


app.post('/admin_login', (req, res) => {
    const email = req.body.inputEmail;
    const password = req.body.inputPassword;
    if (email === "sh-admin@gmail.com" && password === "Admin@123") {
        req.session.user = [{ user_email: email, user_name: 'Admin', user_password: password }];
        console.log(req.session.user);
        res.send({ status: 200, message: "Admin Login Success!" });
    } else {
        res.send({ status: 401, message: "Incorrect Credentials!" });
    }
});

app.post('/logout_action', (req, res) => {
    res.clearCookie("userId", { path: "/" });
    res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
});

//get all customers
app.get('/get_all_customers', (req, res) => {
    connection.query('SELECT * FROM sparklehome.user', (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ status: 401, message: "Error Retrieving Customers!" });
        }
    });
});

// Update user data by user ID
app.put('/update_user/:id', (req, res) => {
    const userId = req.params.id;
    const { user_name, user_email, user_password, user_phone } = req.body;

    connection.query('UPDATE sparklehome.user SET user_name=?, user_email=?, user_password=?, user_phone=? WHERE user_id=?', [user_name, user_email, user_password, user_phone, userId], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send({ message: "User data updated successfully!" });
        }
    });
});

// Delete user by user ID
app.delete('/delete_user/:id', (req, res) => {
    const userId = req.params.id;

    connection.query('DELETE FROM sparklehome.user WHERE user_id = ?', userId, (err, result) => {
        if (err) {
            res.send({ err: err });
        } else if (result.affectedRows === 0) {
            res.send({ message: "User not found" });
        } else {
            res.send({ message: "User deleted successfully!" });
        }
    });
});


//maid
//get all maids
app.get('/get_all_maids', (req, res) => {
    connection.query('SELECT * FROM sparklehome.maid', (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ status: 401, message: "Error Retrieving Maids!" });
        }
    });
});

//add maid
app.post('/add_maid', (req, res) => {
    const name = req.body.maid_name;
    const phone = req.body.maid_phone;
    const image = req.body.maid_image;

    connection.query('INSERT INTO maid (maid_name, maid_phone, maid_image) VALUES (?, ?, ?)', [name, phone, image],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ res: result, message: "Maid added successfully!" });
            }
        });
});

// Update maid data by maid ID
app.put('/update_maid/:id', (req, res) => {
    const maidId = req.params.id;
    const { maid_name, maid_phone, maid_image } = req.body;

    connection.query('UPDATE sparklehome.maid SET maid_name=?, maid_phone=?, maid_image=? WHERE maid_id=?', [maid_name, maid_phone, maid_image, maidId], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send({ message: "Maid data updated successfully!" });
        }
    });
});

// Delete maid by maid ID
app.delete('/delete_maid/:id', (req, res) => {
    const maidId = req.params.id;

    connection.query('DELETE FROM sparklehome.maid WHERE maid_id = ?', maidId, (err, result) => {
        if (err) {
            res.send({ err: err });
        } else if (result.affectedRows === 0) {
            res.send({ message: "Maid not found" });
        } else {
            res.send({ message: "Maid deleted successfully!" });
        }
    });
});

//schedule
//get all Schedule
app.get('/get_all_schedules', (req, res) => {
    connection.query('SELECT * FROM sparklehome.schedule', (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ status: 401, message: "Error Retrieving Schedules!" });
        }
    });
});

//add schedule
app.post('/add_schedule', (req, res) => {
    const maid = req.body.maid_id;
    const dateTime = req.body.schedule_datetime;

    connection.query('INSERT INTO schedule (maid_id, schedule_datetime, booked) VALUES (?, ?, 0)', [maid, dateTime],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ res: result, message: "Schedule added successfully!" });
            }
        });
});

// Update schedule data by schedule ID
app.put('/update_schedule/:id', (req, res) => {
    const scheduleId = req.params.id;
    const { schedule_name, schedule_phone, schedule_image } = req.body;

    connection.query('UPDATE sparklehome.schedule SET schedule_name=?, schedule_phone=?, schedule_image=? WHERE schedule_id=?', [schedule_name, schedule_phone, schedule_image, scheduleId], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send({ message: "Schedule data updated successfully!" });
        }
    });
});

// Delete schedule by schedule ID
app.delete('/delete_schedule/:id', (req, res) => {
    const scheduleId = req.params.id;

    connection.query('DELETE FROM sparklehome.schedule WHERE schedule_id = ?', scheduleId, (err, result) => {
        if (err) {
            res.send({ err: err });
        } else if (result.affectedRows === 0) {
            res.send({ message: "Schedule not found" });
        } else {
            res.send({ message: "Schedule deleted successfully!" });
        }
    });
});


app.get('/*', function (req, res) {
    res.sendFile(
        path.join(buildPath, 'index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
})


