module.exports = function (app, passport, db) {
const ObjectID = require('mongodb').ObjectID
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile1', isLoggedIn, function (req, res) {
    db.collection('messages').find({episode: req.query.episode}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile1.ejs', {
        user: req.user,
        messages: result
      })
    })
  });
  app.get('/profile2', isLoggedIn, function (req, res) {
    db.collection('messages').find({episode: req.query.episode}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile2.ejs', {
        user: req.user,
        messages: result
      })
    })
  });
  app.get('/profile3', isLoggedIn, function (req, res) {
    db.collection('messages').find({episode: req.query.episode}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile3.ejs', {
        user: req.user,
        messages: result
      })
    })
  });
  app.get('/profile4', isLoggedIn, function (req, res) {
    db.collection('messages').find({episode: req.query.episode}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile4.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================

  app.post('/messages', (req, res) => {
    db.collection('messages').save({ name: req.body.name, msg: req.body.msg, replies: [], episode: req.body.episode }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect(`/profile${req.body.episode}?episode=${req.body.episode}`)
    })
  })
  
  app.put('/reply', function (req, res) {
    db.collection('messages')
      .findOneAndUpdate({ _id: ObjectID(req.body.msgId)}, {
        $push: {
          replies: req.body.msg
        }
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  }
  )

  app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete({_id: ObjectID(req.body.msgId)}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Deleted!')
    })
    // res.redirect(`/profile/${req.body.episode}?episode=${req.body.episode}`)
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile1?episode=1', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile1?episode=1', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove username and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.username = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
