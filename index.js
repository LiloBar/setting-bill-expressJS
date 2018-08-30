const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

// var moment = require('moment');






let settingsFunction = require('./settings-bills-logic.js');
const settings = settingsFunction();


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {

    let values = settings.allValues();
    let color = settings.myColor()


    res.render('index', {
        values,
        color
        
    });
});

app.post('/settings', function (req, res) {
    settings.setCall(req.body.callCost);
    settings.setSms(req.body.smsCost);
    settings.setWarningLevel(req.body.warningLevel);
    settings.setCriticalLevel(req.body.criticalLevel);

    res.redirect('/');
});

app.get('/settings/:costType', function (req, res) {
    let costType = req.params.costType;

    let cost = 0;
    //lookup cost for costType
    if (costType === 'sms') {
        cost = settings.smsCost;
    } else if (costType === 'call') {
        cost = settings.callCost;
    }

    req.render('cost', {
        costType,
        cost
    });
});



app.post('/action', function (req, res) {
    settings.calcBill(req.body.actionType);

    res.redirect('/');

});

app.get('/actions', function (req, res) {

    res.render('actions', {actions : settings.action() });

});


app.get('/actions/:act', function (req, res) {
    let costType = req.params.act;

    let cost = 0;
    //lookup cost for costType
    if (costType === 'sms') {
        cost = settings.smsCost;
    } else if (costType === 'call') {
        cost = settings.callCost;
    }


    res.render('cost', {
        costType,
        cost,
        actions : settings.filter(costType)
    });
});
  

app.post('/reset', function (req, res) {
    settings.reset();


    res.render('.main');
});






app.post('/settings', function (req, res) {
    let smsCost = req.body.smsCost;
    let callCost = req.body.callCost;
    let warningLevel = req.body.warningLevel;
    let criticalLevel = req.body.criticalLevel;




    // process data
    globalSetings = settings;

    // note that data can be sent to the template
    res.render('main', {
        settings
    });
});

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log("Starting on port ", +PORT);
});