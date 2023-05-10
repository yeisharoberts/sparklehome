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

const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'ASIATHXFDTBH2F3DDNWL',
    secretAccessKey: 'woGckyZCY4NTuI03Gl7Uq//uGyqGcOpS6XXO3MJy',
    sessionToken: 'FwoGZXIvYXdzEHkaDF8rJyDcZPNFHzStkSLJAX2xJEK3pFwygtuZNqCP+97zM8RTh+0DStvj3Re+9fmrNQkFLkpNJgVa1tNcw3mVKQMDRtAJ9xIwADpkdaFO9TtinssLwqCQwubsYJyb439WnC5e9eodiW/IcdF4yRn/z+uPhbRs9mwE5G0RMctk7A1/1yxRCjQWNyeqqqSzWHq4MklNk6TTA/VS0LccZ9I34CTGfHgk7HC8ijdhVPP2MTJXB3irtT8guFRUva5QcQbgNOkyeWDqPdREdyrXetDKkCA3NfDNlEy4Xii/q+uiBjItzOvHd/FLQTVtGk1dpeyg4JjMu3LJgubqQozH7E2/C+y5zRNizLiAyKEG43iY',
    region: 'us-east-1'
});
app.use(bodyParser.json());

// const lambda = new AWS.Lambda({
//     accessKeyId: 'ASIATHXFDTBH2F3DDNWL',
//     secretAccessKey: 'woGckyZCY4NTuI03Gl7Uq//uGyqGcOpS6XXO3MJy',
//     region: 'us-east-1',
// });
const lambda = new AWS.Lambda();

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

// LAMBDA FUNCTION 
const sns = new AWS.SNS();
// const invokeLambda = async (functionName, payload) => {
//     try {
//         const params = {
//             FunctionName: functionName,
//             Payload: JSON.stringify(payload),
//         };
//         const result = await lambda.invoke(params).promise();
//         return JSON.parse(result.Payload);
//     } catch (error) {
//         console.error('Error invoking Lambda function:', error);
//         throw error;
//     }
// };


app.post('/booking', async (req, res) => {

    const email = req.body.user_email;
    const name = req.body.user_name;
    const message = `Dear ${name}, your booking has been confirmed!`;
    const params = {
        TopicArn: 'arn:aws:sns:us-east-1:222745040975:confirm-booking.fifo',
        Message: message,
        MessageAttributes: {
            'email': {
                DataType: 'String',
                StringValue: email,
            },
        },
    };
    sns.publish(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to send booking confirmation email');
        }

        console.log(data);
        res.send('Booking confirmation email sent successfully');
    });

    // try {
    //     const schedule_id = req.body.schedule_id;
    //     const user_id = req.body.user_id;
    //     const user_email = req.body.user_email;

    //     connection.query(
    //         'INSERT INTO sparklehome.booking (user_id, schedule_id, booking_amount) VALUES (?, ?, ?)',
    //         [user_id, schedule_id, 100.0], (error, result) => {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 res.send({ message: 'Booking successful' });
    //             }
    //         }
    //     );

    //     const payload = { schedule_id };

    //     const params = {
    //         FunctionName: 'update-schedule-booked',
    //         Payload: JSON.stringify(payload),
    //     };

    //     try {
    //         const data = await lambda.invoke(params).promise();
    //         console.log('Lambda response:', data.Payload);
    //     } catch (error) {
    //         console.error('Lambda error:', error);
    //     }

    // } catch (error) {
    //     handleBookingError(error, res);
    // }
});

// app.post('/booking', async (req, res) => {
//     const schedule_id = req.body.schedule_id;
//     const user_id = req.body.user_id;
//     const user_email = req.body.user_email;
//     connection.query("INSERT INTO sparklehome.booking (user_id, schedule_id, booking_amount) VALUES (?, ?, ?)", [user_id, schedule_id, 100.00], async (err, result) => {
//         if (err) {
//             console.error('Error handling booking:', error);
//             res.status(500).send({ message: 'Booking failed' });
//         } else {
//             try {
//                 const payload = { schedule_id: schedule_id };
//                 await invokeLambda('update-schedule-booked', payload);
//                 res.send({ message: 'Booking successful' })
//             } catch (error) {
//                 console.error('Error handling booking:', error);
//                 res.status(500).send({ message: 'Booking failed' });
//             }
//         }
//     });
// });


// app.get('/api/update-schedule-booked', async (req, res) => {
//     try {
//       // create a params object with the necessary properties for invoking your Lambda function
//       const params = {
//         FunctionName: 'update-schedule-booked', 
//         Payload: JSON.stringify({ id: 5, user_name: 'John' }), // pass the payload as JSON
//       };

//       // invoke the Lambda function using the params object
//       const result = await lambda.invoke(params).promise();
//       const data = JSON.parse(result.Payload);

//       // return the response from the Lambda function as JSON
//       res.json(data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to invoke Lambda function.' });
//     }
// });

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

// Retrieve booking schedule
app.get('/get_schedule', (req, res) => {
    connection.query('SELECT * FROM sparklehome.schedule INNER JOIN sparklehome.maid ON schedule.maid_id = maid.maid_id WHERE schedule.booked = 0', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.post('/user_register', (req, res) => {
    const name = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const phone = req.body.userPhone;

    connection.query('INSERT INTO user (user_name, user_email, user_password, user_phone) VALUES (?, ?, ?, ?)', [name, email, password, phone],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Failed to insert user');
            }else{
                res.send(result);
            }

            // const params = {
            //     Protocol: 'email',
            //     TopicArn: 'arn:aws:sns:us-east-1:222745040975:confirm-booking.fifo',
            //     Endpoint: email,
            //     Attributes: {
            //         FilterPolicy: JSON.stringify({
            //             'email': [email],
            //         }),
            //     },
            // };
            // sns.subscribe(params, (error, data) => {
            //     if (error) {
            //         console.error(error);
            //         return res.status(500).send('Failed to subscribe user');
            //     }

            //     console.log(data);
            //     res.send('User subscribed successfully');
            // });
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




