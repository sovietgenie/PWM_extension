var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var firebase = require('firebase');

require('firebase/auth');
require('firebase/database');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var config = {
    apiKey: "AIzaSyAckD3795hwvjPpW-IQL4FI2PhBgpyxpAI",
    authDomain: "pwm-extension-beta.firebaseapp.com",
    databaseURL: "https://pwm-extension-beta.firebaseio.com",
    projectId: "pwm-extension-beta",
    storageBucket: "pwm-extension-beta.appspot.com",
    messagingSenderId: "867953170530"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  

app.get('/', function(req, res){
    res.send('Hello World');
});

app.post('/UserAuthentication', function(req, res){
    if(req.body.logOpt == "signin"){
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(firebaseUser) {
           /* var userAuth = {
                e: req.body.email,
                p: req.body.password
            } */
        
            res.send(firebaseUser.uid);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            res.send("Invalid email/password");
        });
    }else if(req.body.logOpt == "signout"){
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            res.send("Signed Out");
          }, function(error) {
            console.error('Sign Out Error', error);
            res.send("Sign Out ERROR");
          });
    }
    
});

app.post('/Signup', function(req, res){
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function(firebaseUser) {
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(firebaseUser) {
            database.ref('users').child(firebaseUser.uid).set(
                {init: "0"}
            );
            res.send(firebaseUser.uid);

         }).catch(function(error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
             res.send("Invalid email/password");
         });

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send("Signup ERROR!");
    });
});

app.listen(8080, function(){
    console.log('Server started on Port 8080');
})