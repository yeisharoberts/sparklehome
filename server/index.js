const express = require('express')
const http = require('http')
const Server = require('socket.io').Server
const app = express()
const path = require('path')

const cors = require('cors')
const bodyParser = require('body-parser')


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