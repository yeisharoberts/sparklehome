//////////////////////////////////////DO NOT TOUCH///////////////////////////////////////////////////////
const express = require('express')
const http = require('http')
const Server = require('socket.io').Server
const app = express()
const path = require('path')
const mysql = require('mysql')

const cors = require('cors')
const bodyParser = require('body-parser')

const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'ASIATHXFDTBHZUUWEBJW',
    secretAccessKey: 'UpRxe+aZ3Qior+EGHSRz3pHmUp5SUqTFhW7KNvk6',
    sessionToken: 'FwoGZXIvYXdzEEEaDMkKE8bTRNsMTJDKzyLJAQSBc2leFT5YnM79DtnURgjhlCTsVfVoC/+qV28HqZnwim3XYY1R8B0I5+SfVd1ETnPxTVZjIJoKWKZ9L/0DvLUOmlqIjIigbOrrNZey4PPktjYTO7D1xydZWq0exXxMmPGh6EUkba1vKL9V0TRamRjBwpqKr5G22zDEhFT85gcXNhOyC3GY3KodF+BUjYaxKd6N7razsFDIfwCYYxvQPZipvWpQdWbLYm/VWCNOb4uCHfbpXhB0VPmW4rWrOD+sQv6qyMyE8DW9HCi2tpejBjIttUGw+27bQbD4zS2XWSXuU//qkj+d+PSlQxreCBUCAQrnZ98FN6SWSR7CFTUt',
    region: 'us-east-1'
});
app.use(bodyParser.json());

const lambda = new AWS.Lambda();

app.use(express.json());
app.use(cors({
    // origin: ["http://localhost:3000"],
    origin: ["http://100.27.20.250"],
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

app.post('/booking', async (req, res) => {
    try {
        const schedule_id = req.body.schedule_id;
        const user_id = req.body.user_id;
        const booking_date = req.body.booking_date;
        const email_date = req.body.sns_booking_date;
        const maid_name = req.body.maid_name;
        const maid_phone = req.body.maid_phone;

        const invokeLambdaWithRetry = async (params, retries = 20) => {
            try {
                const data = await lambda.invoke(params).promise();
                console.log('Lambda response:', data.Payload);
                return data;
            } catch (error) {
                console.error('Lambda error:', error);
                if (retries > 0) {
                    console.log(`Retrying Lambda invocation. Retries left: ${retries}`);
                    return invokeLambdaWithRetry(params, retries - 1);
                } else {
                    throw error;
                }
            }
        };

        const payload = { schedule_id: schedule_id };
        console.log(payload);
        const params = {
            FunctionName: 'update-schedule-booked',
            Payload: JSON.stringify(payload),
        };

        try {
            const data = await invokeLambdaWithRetry(params);
            // Only send SNS notification if the Lambda function is successful
            // Sending booking confirmation email to users using SNS
            const email = req.body.user_email;
            const name = req.body.user_name;
            const message = `Dear ${name}, \n\nThank you for using SparkleHome!\n\nYour booking has been confirmed. Please check your booking details below:
          \n\nDate & Time: ${email_date}\nCleaner Name: ${maid_name}\nCleaner Contact: ${maid_phone}\n\nBest Regards,\nSparkleHome Team`;
            const params2 = {
                TopicArn: 'arn:aws:sns:us-east-1:222745040975:ConfirmBooking',
                Message: message,
                MessageAttributes: {
                    email: {
                        DataType: 'String',
                        StringValue: email,
                    },
                },
            };
            sns.publish(params2, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Failed to send booking confirmation email');
                }

                console.log(data);

                // Insert the booking into the database
                connection.query(
                    'INSERT INTO sparklehome.booking (user_id, schedule_id, booking_amount, booking_datetime) VALUES (?, ?, ?, ?)',
                    [user_id, schedule_id, 100.0, booking_date],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).send('An error occurred during booking');
                        }

                        res.send('Booking confirmation email sent successfully');
                    }
                );
            });
        } catch (error) {
            console.error('Lambda error:', error);
            return res.status(500).send('An error occurred during booking');
        }
    } catch (error) {
        res.status(500).send('An error occurred during booking');
    }
});


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

setInterval(() => {
    connection.query('SELECT 1', (error, results) => {
        if (error) {
            console.error('Error executing keep-alive query:', error);
        }
    });
}, 5 * 60 * 1000); // 5 minutes

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
            }

            const params = {
                Protocol: 'email',
                TopicArn: 'arn:aws:sns:us-east-1:222745040975:ConfirmBooking',
                Endpoint: email,
                Attributes: {
                    FilterPolicy: JSON.stringify({
                        'email': [email],
                    }),
                },
            };
            sns.subscribe(params, (error, data) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Failed to subscribe user');
                }

                console.log(data);
                res.send('User subscribed successfully');
            });
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
    req.session.user = [];
    res.clearCookie("userId", { path: "/" });
    res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
});

app.post('/get_my_booking', (req, res) => {
    const user_id = req.body.user_id;
    connection.query('SELECT * FROM sparklehome.booking INNER JOIN sparklehome.schedule ON booking.schedule_id = schedule.schedule_id INNER JOIN sparklehome.maid ON schedule.maid_id = maid.maid_id WHERE booking.user_id = ?', [user_id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.post('/cancel_booking', (req, res) => {
    const schedule_id = req.body.schedule_id;
    const booking_id = req.body.booking_id;

    connection.query('DELETE FROM sparklehome.booking WHERE booking.booking_id = ?', [booking_id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            connection.query('UPDATE sparklehome.schedule SET booked = 0 WHERE schedule_id = ?', [schedule_id], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ code: 200, result: result });
                }
            });
        }
    });
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


