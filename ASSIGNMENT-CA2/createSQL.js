import sqlite3 from 'sqlite3';

// prepare database
const db = new sqlite3.Database('movies.sqlite');

db.serialize(() => {
    // create table
    db.run('DROP TABLE IF EXISTS movies');
    db.run(`CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        director TEXT,
        genre TEXT,
        runtime TEXT,
        year INTEGER,
        trailer TEXT
    )`);

    // add basic records to movies
    const statement = db.prepare('INSERT INTO movies (title, director, genre, runtime, year, trailer) VALUES (?,?,?,?,?,?)');
    statement.run('Scream 1','Wes Craven','Horror','1:54',2017,'pQLb4yBwxvg');
    statement.run('Scream 2','Wes Craven','Horror','1:55',2018,'pQLb4yBwxvg');
    statement.run('Scream 3','Wes Craven','Horror','1:56',2019,'pQLb4yBwxvg');
    statement.run('Scream 4','Wes Craven','Horror','1:57',2020,'pQLb4yBwxvg');
    statement.run('Scream 5','Matt Bettinelli-Olpin','Horror','1:58',2021,'pQLb4yBwxvg');
    statement.run('Scream 6','Tyler Gillett','Horror','1:59',2022,'pQLb4yBwxvg');

    // finalize the statement
    statement.finalize();

    // select each movie and print it out
    db.each("SELECT rowid AS id, title, director, genre, runtime, year, trailer FROM movies" , function(err, row) {
        console.log(`id:  ${row.id}  title:  ${row.title}  director:  ${row.director}  genre:  ${row.genre}  runtime:  ${row.runtime}  year:  ${row.year}  trailer:  ${row.trailer}`);
    });

    db.close();
});