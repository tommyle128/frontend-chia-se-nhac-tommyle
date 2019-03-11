const artistModel = require('./artistModels');
const fs = require('fs');

//create an artist 
const createArtist = ({ name, description, avatarFile}) =>
    new Promise ((resolve, reject) => {
        artistModel
        .create({
            avatar: fs.readFileSync(avatarFile.path),
            contentType: avatarFile.mimetype,
            name,
            description
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })

//get all artists in database 
const getAllArtist = page =>
    new Promise((resolve, reject) => {
        artistModel
        .find({ active: true })
        .populate('comment.createdBy',{
          username: 1
        })
        .sort({ createAt: -1 })
        .skip((page -1) * 20)
        .limit(20)
        .select("-__v -createAt -updatedAt")
        .then(data => 
          resolve( 
            data.map( artists =>  
              Object.assign({}, artists._doc, {
                avatar: `/api/artists/${artists._id}/avatar`
        }))))
        .catch(err => reject(err));
    })

//update artist's in4mation if needed 
const updateArtist = (id, {name, avatar, description} ) =>
    new Promise((resolve, reject) => {
      artistModel
      .findOne({ active: true, _id: id})
      .then(artist => {
        if(name) artist.name = name;
        if(avatar) artist.avatar = avatar;
        if(description) artist.description = description;
        return artist.save();
      })
      .then(data => resolve({ data }))
      .catch(err => reject(err));
    });

//delete an artist who is not attractive anymore 
const deleteArtist = (id) =>
    new Promise((resolve, reject) => {
      artistModel
      .updateOne(
        { _id: id }, 
        {active: false}
      )
      .then(data => resolve( data ))
      .catch(err => reject({ status: 500, err }));
    })

//get one artist 
const getArtist = id =>
  new Promise((resolve, reject) => {
    artistModel
    .findOne({ _id: id, active: true })
    .then(artist => resolve(artist))
    .catch(err => reject(err))
  });

//write a comment
const addComment = (artistId, { userId, content }) =>
  new Promise((resolve, reject) => {
    console.log(userId + '' + content);
    // console.log(typeof(userId));
    console.log(artistId);
    artistModel
    .findByIdAndUpdate(
      artistId,
      {
        $push: { comment: { createdBy: userId, content: content }}
      },
      {
        new: true
      }
    )
    .then(data => resolve(data))
    .catch(err => reject(err));
  });

//delete something you've said 
const deleteComment = (artistId, commentId, userId) =>
  new Promise((resolve, reject) => {
    artistModel
    .update(
      {
        _id: artistId
      },
      {
        $pull: { comment: { _id: commentId, createdBy: userId }}
      }
    )
    .then(data => resolve(data))
    .catch(err => reject(err));
  })

module.exports = {
 createArtist,
 getAllArtist,
 getArtist,
 updateArtist,
 deleteArtist,
 addComment,
 deleteComment,
};