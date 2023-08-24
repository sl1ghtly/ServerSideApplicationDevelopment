import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import * as ops from "./moviesDB.js"
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// set express app and port
const app = express();
const port = 3000;

// set file and dir(path) name
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// set engine to handlebars, views as folder from where pages are rendered
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.set('port', port);

/* needed to access public assets */
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("node_modules/bootstrap/dist"));

// default page
app.get('/', (req, res) => {
    // view all movies using ops.viewAllMovies();
    ops.viewAllMovies().then(function (data) {
        res.render('index', { movies: data } );
    })
    .catch(function () {
        console.log('error message here');
    });
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

// help page
app.get('/help', (req, res) => {
    res.render('help');
});

// create page
app.get('/create', (req, res) => {
    res.render('create');
});
// create movie
app.post('/create', (req, res) => {
    // create mobie object to store items in
    var movieObject = {
        title: req.body.title,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime,
        year: req.body.year,
        trailer: req.body.trailer
    }
    console.log(movieObject);
    // save it using ops.createMovie(movieObject);
    ops.createMovie(movieObject);
    res.render('create');
});

// delete page
app.get('/delete', (req, res) => {
    res.render('delete')
});
// delete movie
app.post('/delete', (req, res) => {
    var movieID = req.body.movieid;
    // delete it using ops.deleteMovie(movieID);
    ops.deleteMovie(movieID);
    res.render('delete');
});

// edit page
app.get('/edit', (req, res) => {
    res.render('edit');
});

// edit movie
app.post('/edit', (req, res) => {
    var movieID = req.body.movieid;
    var movieObject = {
        title: req.body.title,
        director: req.body.director,
        genre: req.body.genre,
        runtime: req.body.runtime,
        year: req.body.year,
        trailer: req.body.trailer
    }
    console.log(movieID, movieObject);
    // edit it using ops.editMovie(movieID, movieObject);
    ops.updateMovie(movieID, movieObject);
    res.render('edit');
});

// view page
app.get('/view', (req, res) => {
    res.render('view');
});
// view movie
app.post('/viewed', (req, res) => {
    var movieID = req.body.movieid;
    // view it using ops.viewMovie(movieID);
    ops.viewMovie(movieID).then(function (data) {
        res.render('viewed', { movies: data } );
    })
    .catch(function () {
        console.log('error message here');
    });
});

// render style.css
app.get('/style.css', (req, res) => {
    res.render('style.css');
});

app.get('*', (req, res) => {
    res.send("<h1>404 Page not found!</h1>");
});

app.listen(port, () => {
    console.log("Live on Port: 3000");
});