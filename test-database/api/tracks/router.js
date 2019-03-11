const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const trackController = require("./controller");
const authMiddleware = require("../auth/auth");


//get all tracks 
router.get("/", (req, res) => {
    trackController
    .getAllTracks(req.query.page || 1)
    .then(tracks => res.send(tracks))
    .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
  });

//get a track by id
router.get("/:trackId", (req, res) => {
  trackController
  .getOneTrack(req.params.trackId)
  .then(track => res.send(track))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
});

//create a track
router.post("/", (req, res) => {
  // console.log(req.files);
  // console.log(req.body);
  trackController
  .createTrack(req.body)
  .then(result => res.send(result))
  .catch(err => {
    console.error(err)
    res.status(500).send(err);
  });
}
)

//delete a track
router.delete("/:id", 
  authMiddleware.authorize, 
  (req, res) => {
  trackController
  .deleteTrack(req.params.id, req.session.userInfo.id)
  .then(track => res.send(track))
  .catch(err => {
    console.error(err);
    res.status(err.status).send(err.status);
  });
});

//write a comment
router.post("/:trackId/comments", 
  authMiddleware.authorize,
  (req, res) => {
  req.body.userId = req.session.userInfo.id;

  trackController
  .addComment(req.params.trackId, req.body)
  .then(result => res.send(result))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

//delete a comment
router.delete("/:trackId/comments/:commentId", authMiddleware.authorize, (req, res) => {
    trackController
    .deleteComment(
      req.params.trackId,
      req.params.commentId,
      req.session.userInfo.id
    )
    .then(result => res.send(result))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    })
  }
)

//get track data 
router.get('/:trackId/data', (req, res) => {
  console.log(req.params.trackId);
  trackController
  .getTrackData(req.params.trackId)
  .then(data => {
    res.contentType(data.contentType);
    res.send(data.trackUrl);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})

//get artist's avatar inside track data 
router.get('/:trackId/avatar', (req, res) => {
  console.log(req.params.trackId);
  trackController
  .getAvaData(req.params.trackId)
  .then(data => {
    console.log(data);
    
    res.contentType(data.artist.contentType);
    res.send(data.artist.avatar);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})

//update lyrics 
router.put('/:trackId/lyrics', (req, res)=> {
  trackController
  .updateLyrics(req.params.trackId, req.body.lyrics)
  .then(data => res.send(data))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})

//increase like
router.post('/:trackId/like', authMiddleware.authorize, (req, res) => {
  trackController
  .increaseLike(req.params.trackId)
  .then(data => res.send(data))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})

//decrease like
router.post('/:trackId/like', authMiddleware.authorize, (req, res) => {
  trackController
  .decreaseLike(req.params.trackId)
  .then(data => res.send(data))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})

// check search query
router.post('/query/', (req, res) => {
  // console.log(req.body.query);
  trackController
  .handleSearchQuery(req.body.query)
  .then(data => res.send(data))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
  // res.send('query tra ve ')
})
  

module.exports = router;