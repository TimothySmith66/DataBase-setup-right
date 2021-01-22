
// import mysql, inquirer
const mysql = require("mysql");
const inquirer = require("inquirer");
// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "whatitDo2You",
    database: "top_songsDB",
});
// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) {
        throw err;
    }
    // run the start function after the connection is made to prompt the user
    return start();
});
// create start function to ask the user what to do
function start() {
    return inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do next?",
            choices: [
                "Find songs by artist",
                "Find all artists who appear more than once",
                "Find data within a specific range",
                "Search for a specific song",
                "Find artists with a top song and top album in the same year",
                "exit",
            ],
        })
        .then((answer) => {
            // based on their answer, either call the bid or the post functions
            switch (answer.action) {
                case "Find songs by artist":
                    artistSearch();
                    break;
                case "Find all artists who appear more than once":
                    repeatArtists();
                    break;
                case "Find data within a specific range":
                    rangeSearch();
                    break;
                case "Search for a specific song":
                    songSearch();
                    break;
                case "Find artists with a top song and top album in the same year":
                    topSongAlbum();
                    break;
                default:
                    connection.end();
            }
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
}
function artistSearch() {
    inquirer
        .prompt({
            name: "artist",
            type: "input",
            message: "What artist would you like to search for?",
        })
        .then(function (answer) {
            var query = "SELECT position, song, year FROM top5000 WHERE ?";
            connection.query(query, { artist: answer.artist }, function (err, res) {
                if (err) {
                    return console.log(err);
                }
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Position: " +
                        res[i].position +
                        "\nSong: " +
                        res[i].song +
                        "\nYear: " +
                        res[i].year +
                        "\n----------------\n"
                    );
                }
                start();
            });
        });
}
function songSearch() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "song",
                message: "Enter Song Name",
            },
        ])
        .then((answers) => {
            connection.query(
                "SELECT * FROM top5000 WHERE ?",
                answers,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(
                            "\n----------------\n" +
                            "Position: " +
                            res[0].position +
                            "\nArtist: " +
                            res[0].artist +
                            "\nYear: " +
                            res[0].year +
                            "\n----------------\n"
                        );
                    }
                    start();
                }
            );
        });
}
function repeatArtists() {
    const query =
        "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function (err, res) {
        if (err) {
            return console.log(err);
        }
        res.forEach((row) => console.log(row.artist));
        start();
    });
}
function rangeSearch() {
    inquirer
        .prompt([
            {
                type: "input",
                message:
                    "Please enter the first position number you would like your range to start at",
                name: "range_start",
            },
            {
                type: "input",
                message:
                    "Please enter the last position number you would like your range to end at",
                name: "range_end",
            },
        ])
        .then((answers) => {
            connection.query(
                "SELECT * FROM top5000 WHERE position >= ? AND position <= ?",
                [answers.range_start, answers.range_end],
                function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        console.log(
                            "Position: " +
                            res[i].position +
                            "\nSong: " +
                            res[i].song +
                            "\nArtist: " +
                            res[i].artist +
                            "\nYear: " +
                            res[i].year +
                            "\n----------------\n"
                        );
                    }
                }
            );
            start();
        });
}
function topSongAlbum() {
    inquirer
        .prompt({
            name: "artist",
            type: "input",
            message: "What artist would you like to search for?",
        })
        .then(function (answer) {
            var query = "SELECT top_albums.year, top_albums.position, top_albums.artist, top_albums.album, top5000.song"
                + " FROM top_albums INNER JOIN top5000"
                + " ON (top_albums.artist = top5000.artist AND top_albums.year = top5000.year)"
                + " WHERE top_albums.artist = ?"
                + " ORDER BY top_albums.year, top_albums.position;";
            connection.query(query, answer.artist, function (err, res) {
                if (err) {
                    return console.log(err);
                }
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Position: " +
                        res[i].position +
                        "\nSong: " +
                        res[i].song +
                        "\nYear: " +
                        res[i].year +
                        "\nAlbum: " +
                        res[i].album +
                        "\n----------------\n"
                    );
                }
                start();
            });
        });
}