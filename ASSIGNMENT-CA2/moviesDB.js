import  sqlite3  from 'sqlite3';
const db = new sqlite3.Database('movies.sqlite');

function viewAllMovies() {
    return new Promise ((resolve, reject) => {
        var recStr = [];
        var count = 0;
        const db = new sqlite3.Database('movies.sqlite');
        db.serialize(function() {
            db.each('SELECT id, title, director, genre, runtime, year FROM movies', function (err, row) {
                recStr[count++] = row;
                if (err) {
                    reject(err);
                }
            });

            db.close(function () {
                resolve(recStr);
            });
        });
    });
}

function viewMovie(movieID) {
    return new Promise ((resolve, reject) => {
        var recStr = [];
        const db = new sqlite3.Database('movies.sqlite');
        db.serialize(function() {
            db.each('SELECT * FROM movies WHERE id = ' + movieID, function (err, row) {
                recStr[0] = row;
                if (err) {
                    reject(err);
                }

                db.close(function () {
                    resolve(recStr);
                });
            });
        });
    });
}

function updateMovie(movieID, movieObject) {

        const db = new sqlite3.Database('movies.sqlite');
        db.serialize(function() {
            const statement = db.prepare('UPDATE movies SET title = ?, director = ?, genre = ?, runtime = ?, year = ?, trailer = ? WHERE id = ?')
            statement.run(movieObject.title, movieObject.director, movieObject.genre, movieObject.runtime, movieObject.year, movieObject.trailer, movieID);
            statement.finalize();
            db.close();
        });
}

function createMovie(movieObject) {
        const db = new sqlite3.Database('movies.sqlite');
        db.serialize(function() {
            const statement = db.prepare('INSERT INTO movies (title, director, genre, runtime, year, trailer) VALUES (?,?,?,?,?,?)');
            statement.run(movieObject.title, movieObject.director, movieObject.genre, movieObject.runtime, movieObject.year, movieObject.trailer);
            statement.finalize();
            db.close();
        });     
}

function deleteMovie(movieID) {
    const db = new sqlite3.Database('movies.sqlite');
    db.serialize(function() {
        const statement = db.prepare('DELETE FROM movies WHERE id = ?');
        statement.run(movieID);
        statement.finalize();
        db.close();
    });     
}

export { viewAllMovies, viewMovie, updateMovie, createMovie, deleteMovie }