import express from 'express';
import Userimageinfo from '../models/userimageinfo';

const router = express.Router();

router.get('/:userid/:img_id', (req, res) => {
  Userimageinfo.findOne({ userid: req.params.userid, imageid: req.params.img_id }, (err, userimage) => {
    if(err) throw err;
    if(userimage) {
      return res.json({ success: true, img_id: userimage.imageid, img_query: userimage.imagequery });
    } else {
      return res.status(401).json({success: false});
    }
  })
});

router.get('/:userid', (req, res) => {
  Userimageinfo.find({ userid: req.params.userid }, '-_id imageid imagequery', {sort: {created: -1}},
  (err, userimage) => {
    if(err) throw err;
    if(userimage) {
      console.log(userimage)
      return res.json({ success: true, userimage });
    } else {
      return res.status(401).json({success: false});
    }
  })
});

router.post('/:user', (req, res) => {
  let userimageinfo = new Userimageinfo({
    userid: req.body.userid,
    imageid: req.body.img_id
  });

  userimageinfo.save(err => {
    if(err) throw err;
    return res.json({ success: true });
  });
});

router.delete('/:userid/:img_id', (req, res) => {
   Userimageinfo.findOneAndDelete({ userid: req.params.userid, imageid: req.params.img_id }, (err, account) => {
       if(err) throw err;
       return res.json({ success: true });
   });
});


export default router;
