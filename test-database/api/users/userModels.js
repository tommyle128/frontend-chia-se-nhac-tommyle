const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const playlistShcema = new Schema({
    createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
    list: [{ type: Schema.Types.ObjectId, ref:'track'}]
})

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    avatar: { type: Buffer, required: false},
    contenType: { type: String, required: false },
    email: { type: String, required: true}, 
    playlist: [{ type: playlistShcema, default: [] }],
    active: { type: Boolean, default: true } 
})

UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
      return next();
    }
    bcrypt
      .genSalt(12)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  });

module.exports = mongoose.model('user', UserSchema);
