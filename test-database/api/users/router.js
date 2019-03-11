const express = require('express');
const router = express.Router();
const userController = require('./controller');
const authMiddleware = require('../auth/auth');

const multer = require("multer");
const upload = multer({ dest: "user-avatar/" });
// CRUD , Create, Read, Update, Delete 
router.use("/:id/*", authMiddleware.authorize, (req, res, next) => {
  if (req.session.userInfo.id != req.params.id) {
    res.status(401).send("Unauthorized!");
  } else next();
});

//Create a user 
router.post('/', (req, res) => {
    userController
    .createUser(req.body)
    .then(id => res.send({ data: id }))
    .catch(err => {
        console.error(err);
        res.status(500).send(err);
    })
})

//Read all users
router.get("/", (req, res) => {
    userController
      .getAllUsers(req.query.page || 1)
      .then(users => res.send({ data: users}))
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
});

//Read user by id 
router.get('/:userID', (req, res) => {
  const {userID} = req.params;
  userController
  .getOneUser(userID)
  .then(users => res.send({ data: users}))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

//Update password 
router.put('/:userID/password', (req, res) => {
  const {userID} = req.params;
  const {password} = req.body;
  userController
  .updatePassWord(userID, password)
  .then(id => res.send(id))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

//Update email
router.put('/:userID/email', (req, res) => {
  const {userID} = req.params;
  const {email} = req.body;
  userController
  .updateEmail(userID, email)
  .then(id => res.send(id))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

//Delete user 
router.delete('/:userId', (req, res) => {
  const {userId} = req.params;
  userController
  .deleteUser(userId)
  .then(data => res.send(data))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

//update avatar 
router.put('/:userId/avatar', (req, res) => {
  userController
  .updateAva(req.params.userId)
  .then(data => {
    res.contentType(data.contentType);
    res.send(data.avatar);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})


module.exports = router;