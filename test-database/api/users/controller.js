const userModels = require('./userModels');
const fs = require('fs');
const createUser = ({ username, password }) =>
    new Promise(( resolve, reject ) => {
        userModels
        .create({
          username,
          password,
        })
        .then(user => resolve(user))
        .catch(err => reject(err))
    });
    
const getAllUsers = page =>
new Promise((resolve, reject) => {
    userModels
    .find({ active: true })
    .populate('playlist', {
      songname: 1
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * 20)
    .limit(20)
    .select("-active -password -__v")
    .then(user => {
      resolve(user.map( Object.assign({}, user._doc, {
        avatar: `/api/users/${user._id}/data`
      })))
    })
    .catch(err => reject(err));
}); 

const getOneUser = id => 
  new Promise((resolve, reject) => {
    userModels
    .findOne({
      active: true,
      _id: id
    })
    .select('_id username email')
    .then(user => {
      resolve(user.map( Object.assign({}, user._doc, {
        avatar: `/api/users/${user._id}/data`
      })))
    })
    .catch(err => reject(err))
  })

const deleteUser = id => 
  new Promise((resolve, reject) => {
    userModels
    .update({_id, id}, { active: false })
    .then(data => resolve(data))
    .catch(err => reject(err))
  })

const updatePassWord = (id ,password) => 
  new Promise((resolve, reject) => {
    userModels
    .findById(id)
    .then(user => {
      user.password = password;
      return user.save();
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
  })

const updateEmail = (id, email) => 
  new Promise((resolve, reject) => {
    userModels
    .findById(id)
    .then(user => {
      user.email = email;
      return user.save();
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
  })

const getUserForAuth = username =>
new Promise((resolve, reject) => {
  userModels
    .findOne({ username })
    .select("username password _id")
    .then(user => resolve(user))
    .catch(err => reject(err));
});

const updateAva = (avaFile, id) => 
new Promise((resolve, reject) => {
  userModels
  .updateOne({
    active: true,
    _id: id
  },
  {
    avatar: fs.readFileSync(avaFile.path),
    contentType: avaFile.mimetype
  })
  .then(data => resolve(data))
  .catch(err => reject(err))
})

const getUserAva = (id) => 
new Promise((resolve, reject) => {
  userModels
  .findOne(id)
  .select('avatar contentType')
  .then(data => resolve(data))
  .catch(err => reject(err))
})

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    deleteUser,
    updatePassWord,
    updateEmail,
    getUserForAuth,
    updateAva,
    getUserAva
}