import express from 'express';
import Account from '../models/account';

const router = express.Router();

//회원가입
router.post('/signup', (req, res) => {
  //userid 포맷 체크
  let usernameRegex = /^[a-zA-Z0-9]{4,40}$/;

  if(!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: "BAD USERNAME",
      code: 1
    });
  }

  //패스워드 길이 체크
  if(req.body.password.length < 6 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }
  //user 존재여부 체크
  Account.findOne({ username: req.body.userid }, (err, exists) => {
    if(err) throw err;
    if(exists) {
      return res.status(409).json({
        error: "USERNAME EXISTS",
        code: 3
      });
    }

    let account = new Account({
      userid: req.body.userid,
      name: req.body.name,
      password: req.body.password
    });

    account.password = account.genertateHash(account.password);

    account.save( err => {
      if(err) throw err;
      return res.json({ success: true });
    });
  });

});


//로그인
router.post('/signin', (req, res) => {
  if(typeof req.body.password !== "string"){
    return res.status(401).json({
      error: "LOGIN FAILED",
      code: 1
    });
  }
  //userid로 찾기
  Account.findOne({ username: req.body.userid}, (err, account)=>{
      if(err) throw err;

      //check account 존재여부
      if(!account){
        return res.status(401).json({
          error: "LOGIN FAILED",
          code: 1
        })
      }

       //password가 유효한지 체크
      if(!account.validateHash(req.body.password)) {
        return res.status(401).json({
          error: "LOGIN FAILED",
          code: 1
        });
      }
      //sesson 변경
      let session = req.session;

      session.loginInfo = {
        _id: account._id,
        userid: account.userid,
        username: account.name
      }

      session.save();
      res.send(true);
    });
});

//정보 수정
router.put('/user/:userid', (req, res) => {
    Account.findOneAndUpdate({ userid: req.params.userid }, {$set:{name: req.body.username}}, {new: true},
    (err, account) => {
        if(err) throw err;

        //password가 유효한지 체크
        if(!account.validateHash(req.body.password)) {
          return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
          });
        }

         let session = req.session;

         session.loginInfo = {
           _id: account._id,
           userid: account.userid,
           username: account.name
         }

         session.save();
         res.send(true);
    });
});

//현재 세션 체크
//새로고침을 해서 어플리케이션이 처음부터 다시 렌더링하게 될때,
//현재 갖고있는 쿠키가 유효한건지 체크하기 위해서 필요하다
router.get('/getinfo', (req, res) => {
  if(typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: 1
    });
  }

  res.json({ info: req.session.loginInfo });
});

//로그아웃 (세션 제거)
router.post('/logout', (req, res) => {
  delete req.session.loginInfo;
  req.session.save();

  return res.json({ success: true });
});


export default router;
