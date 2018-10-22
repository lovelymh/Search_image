import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Userimageinfo = new Schema({
  userid: String,
  imageid: String,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('userimageinfo', Userimageinfo);
