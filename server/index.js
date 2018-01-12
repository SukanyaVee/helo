require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('error', error);
});

app.post('/api/auth/login', (req, res) => {
  const { userId } = req.body;
  console.log(req.body)
  const auth0Url = `https://auth0-mini.auth0.com/api/v2/users/${userId}`;
  axios.get(auth0Url, {
    headers: {
      Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VRXhNRVEzTlRnNFJqazNNREEzT0RsRE5VSkVPVEE0UVVGQ1JqYzJSVFEwT0RSQ01UQkRSZyJ9.eyJpc3MiOiJodHRwczovL2F1dGgwLW1pbmkuYXV0aDAuY29tLyIsInN1YiI6IkxCeXN0VXRaQ2lYZUE3b1R0ZTJoU1hoQ0dyUTNuajdOQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2F1dGgwLW1pbmkuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1MTU3ODE4NzksImV4cCI6MTUxNTg2ODI3OSwiYXpwIjoiTEJ5c3RVdFpDaVhlQTdvVHRlMmhTWGhDR3JRM25qN04iLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.6zhP-RrBVVXhluF1PnBdIn8FULDvXfcbsTqsglsLwosbLmFV_pldMVq_uHXz0JZNlKldtBtymjhZ2I7OkRc9IMC5m-uQXNTaTWIUgFbJOVCaP6Rcm-ysEyLKLyKWEKUyAmHTbxvgcmmnWJhDlMfSHItw7YzDI-Kv_6qZqtO1cJD5_yLonYmG7B-gtug-8K5X22F155-ol1_MZtkWzGC1Oq97KXiekkMgh2rX4-S7i0kOHUROFZzsKX-6DRJzi8Ywhqn7dqOVOZKJLHXDlY4OtVccp6iTbmOK1w_8gBhgiAAIzQB7YCUSPuwtZyfT1U3YI3LQZRJMWqXu9gVAFut4hQ'
    }
  }).then(response => {
    console.log(response.data)
    const userData = response.data;
    const userForDatabase = {
      name: userData.name,
      email: userData.email,
      auth0_id: userData.user_id,
      pictureUrl: userData.picture
    };
    app.get('db').get_user(userData.user_id).then(users => {
      if (users.length) {
        req.session.user = userForDatabase;
        res.json({ user: req.session.user });
      } else {
        app.get('db').create_user([userData.user_id, userData.email, userData.picture, userData.name]).then(() => {
          req.session.user = userForDatabase;
          res.json({ user: req.session.user });
        }).catch(error => {
          console.log('error', error);
          res.status(500).json({ message: 'Server 500' });
        });
      }
    })
  }).catch(error => {
    console.log('error', error);
    res.status(500).json({ message: 'Houston, we have a problem' });
  }); 
});

app.get('/user-data', (req, res) => {
  res.json({ user: req.session.user });
});

const PORT = 3036;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});