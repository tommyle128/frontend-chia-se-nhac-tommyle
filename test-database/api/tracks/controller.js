// const checkString = require("../checkstring/checkString");

const TrackModels = require('./trackModels');
// const authMiddleWare = require('../auth/auth');
//Controller for track 
const fs = require('fs');
//Create a track 
const createTrack = ({ name, artist, trackUrl, keyword }) => 
new Promise((resolve, reject) => {    
    TrackModels
    .create({
      name,
      artist,
      trackUrl,
      keyword,
    })
    .then(trackCreated => {
        resolve(trackCreated)})
    .catch(err => reject(err))
})

//write a comment
const addComment = (trackID, {user, content}) => new Promise((resolve, reject) => {
    TrackModels
    .update({
        _id: trackID
    },
    {
        $push: { comment: { createdBy: user, content: content }}
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
})

//delete something you've said
const deleteComment = (trackId, commentId, userId) =>
  new Promise((resolve, reject) => {
    trackModel
    .update(
      {
        _id: trackId
      },
      {
        $pull: { comment: { _id: commentId, createdBy: userId }}
      }
    )
    .then(data => resolve(data))
    .catch(err => reject(err));
  })

//get all tracks in database 
const getAllTracks = (page) => 
    new Promise((resolve, reject) => {
        TrackModels
        .find({ active: true })
        .select('name artist')
        .sort({ createdAt: -1 })
        .skip((page - 1)*10)
        .limit(10)
        .then(data => {
          resolve(
            data.map(tracks =>
              Object.assign({}, tracks._doc, {
                trackUrl: `/api/tracks/${tracks._id}/data`,
                artist: { 
                  avatar: `/api/tracks/${tracks._id}/avatar` 
                }
              })
            )
          );
        })
        .catch(err => reject(err))
    })

//get a song
const getOneTrack = (id) => 
    new Promise((resolve, reject) => {
        TrackModels
        .findOne({
            active: true,
            _id: id
        })
        .populate('artist', {
          name: 1,
          _id: 0
        })
        .populate('createdBy', {
          username: 1,
          _id: 0
        })
        .populate('comment.createdBy', 'username')
        .then(data => resolve(
          data.map(track => Object.assign({}, track._doc, {
            trackUrl: `/api/tracks/${tracks._id}/data`,
            artist: { avatar: `/api/tracks/${tracks._id}/avatar` }
          }))
        ))
        .catch(err => reject(err))
    })

//modify lyrics 
const updateLyrics = (lyrics, id) => new Promise((resolve, reject) => {
    TrackModels
    .findById(id)
    .then(track => {
        track.lyrics = lyrics;
        return track.save();
    })
    .then(data => resolve(data.lyrics))
    .catch(err => reject(err))
})

//plus 1 like 
const increaseLike = trackId =>
new Promise((resolve, reject) => {
  trackModel
    .update(
      {
        _id: trackId
      },
      {
        $inc: { like: 1 }
      }
    )
    .then(data => resolve(data))
    .catch(err => reject(err));
});

//minus 1 like 
const decreaseLike = trackId =>
new Promise((resolve, reject) => {
  trackModel
    .update(
      {
        _id: trackId
      },
      {
        $inc: { like: -1 }
      }
    )
    .then(data => resolve(data))
    .catch(err => reject(err));
});

//delete a track
const deleteTrack = (id, userId) =>
new Promise((resolve, reject) => {
  trackModel
  .update(
    {
      _id: id,
      createBy: userId
    },
    { active: false}
  )
  .then(data => resolve({ id: data}))
  .catch(err => reject({ status: 500, err }));
})

//get track data 
const getTrackData = id => new Promise((resolve, reject) => {
  TrackModels
  .findOne({
    active: true,
    _id: id
  })
  .select('trackUrl contentType')
  .then(data => resolve(data))
  .catch(err => reject(err))
})

//get ava data 
const getAvaData = id => new Promise((resolve, reject) => {
  TrackModels
  .findOne({
    active: true,
    _id: id
  })
  .populate('artist', {
    avatar: 1,
    contentType: 1
  })
  .select('artist')
  .then(data => resolve(data))
  .catch(err => reject(err))
})

// filter search
const handleSearchQuery = (query) => new Promise((resolve, reject) => {
  TrackModels
  .find({ name: { $regex: query, $options: "sixm" } })
  .populate('artist', {
    name: 1
  })
  .select('name artist')
  .then(data => resolve(data))
  .catch(err => reject(err))

})


module.exports = {
    createTrack,
    getAllTracks,
    getOneTrack,
    getTrackData,
    updateLyrics,
    addComment,
    deleteComment,
    deleteTrack,
    increaseLike,
    decreaseLike,
    getAvaData,
    handleSearchQuery
}