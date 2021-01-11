const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

con.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie";
    con.query(sqlSelect, (error, result) => {
        res.send(result);
    })
})


app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie (movie_name,movie_review) VALUES (?,?)";
    con.query(sqlInsert, [movieName, movieReview], (error, result) => {
        if (error) console.log(error)
    })

})

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName
    const sqlDelete = "DELETE FROM movie WHERE movie_name = ?";
    con.query(sqlDelete, name, (error, result) => {
        if (error) console.log(error)
    })
})


app.put('/api/update', (req, res) => {
    const name = req.body.movieName
    const review = req.body.movieReview
    const sqlUpdate = "UPDATE movie SET movie_review = ? WHERE movie_name = ?";
    con.query(sqlUpdate, [review, name], (error, result) => {
        if (error) console.log(error)
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
})