const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentModels = require('../comments/commentModels');

const AlbumSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: false},
    artist_id: { type: Schema.Types.ObjectId, ref: 'artist', required: true },
    genre: [String],
    trackList: [{ type: Schema.Types.ObjectId, ref: 'track'}],
    createdBy: { type: Schema.Types.ObjectId, ref: "user", required: true },
    view: { type: Number, default: 0 },
    comment: { type: [commentModels], default: []}
},
    { timestamps: { createdAt: "createAt" }}
)

module.exports = mongoose.model('album', AlbumSchema);