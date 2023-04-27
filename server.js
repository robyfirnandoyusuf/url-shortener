const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require("sequelize");
const { sequelize, Op } = require('./models/base');
const bodyParser = require('body-parser')
const { Urls } = require('./models/Urls')
const utils = require('./utils')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '../public')));

app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// index page
app.get('/', function (req, res) {

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    })

    res.render('index');
});

// about page
app.post('/', async function (req, res) {
    let {custom_url, url } = req.body

    short = utils.makeShortUrl()
    if (custom_url != "") {
        short = custom_url
    }
    const obj = {
        source: DOMPurify.sanitize(url),
        short: short,
        createdAt: new Date()
    };

    web = await Urls.findOne({
        where: {
            short: custom_url,
        }
    })

    // console.log(custom_url)
    if (!utils.isValidUrl(url)) {
        return res.status(402).json({
            "status": false,
            "message": "URL Not valid!",
        });
    }

    if (custom_url != "") {
        if (web != null) {
            return res.status(402).json({
                "status": false,
                "message": "Short URL already exists !. Please change to another word",
            });
        }
    }


    sequelize.sync().then(async () => {
        Urls.create(obj)
            .then(data => {
                res.setHeader('Content-Type', 'application/json');
                // res.end(JSON.stringify());
                res.json({
                    "status": true,
                    "data": {
                        source: url,
                        short: short
                    },
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Url."
                });
            });
    })
});


app.get('/r/:short', async function (req, res) {

    web = await Urls.findOne({
        where: {
            short: req.params.short,
        }
    })

    if (web === null) {
        return res.redirect('/')
    }
    console.log(web)
    return res.redirect(web.source)
});

app.listen(8080);
console.log('Server is listening on port 8080');