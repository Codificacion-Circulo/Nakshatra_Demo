const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Please Provide an Image']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    result: {
      type: String,
      lowercase: true,
      required: [true, 'Please Provide a Result']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Report must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


reportSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo email'
  });
  next();
});


const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
