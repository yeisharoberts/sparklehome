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
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(5001, () => {
    console.log("server is now running on port 5001")
});

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:'*'
    }
})

const _dirname = path.dirname('')
const buildPath = path.join(__dirname, '../client/build')

app.use(express.static(buildPath))

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

connection.end();

