const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const session = require('express-session');


massive(process.env.CONNECTION_STRING).then(dbInstance=>{
    app.set('db', dbInstance);
}).catch(err=>console.error(err))

const app = express();
app.use( bodyParser.json() );
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

const APIurl = '/api/auth/login/'
app.post(APIurl, (req, res, next) => {
    const dbInstance = req.app.get('db')
    dbInstance.get_user([req.body.username]).then(user=> { 
        req.session.user = user;
        res.json({ user: req.session.user });
        // res.status(200).send(user)
    }).catch(error=>{console.error(error)})
    })
// app.put(`${APIurl}/:id`, ctrl.update)
// app.post(APIurl, ctrl.create)
// app.delete(`${APIurl}/:id`, ctrl.delete)
app.get('/user-data', (req, res) => {
    res.json({ user: req.session.user });
  });

app.listen (3040, () => { console.log(`Server listening on port 3040`); } )