const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.virtual('full_name').get(function() {
  return this.first_name + ' ' + this.last_name;
})

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
      delete ret.__v;
      delete ret.password;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
