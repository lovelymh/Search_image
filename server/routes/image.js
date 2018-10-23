const express = require('express');
const request = require('request');
const rq = require('request-promise');
const download = require('image-downloader');
const fs = require('fs');
const router = express.Router();
const apikey = require('../apikey');

const URL = `https://pixabay.com/api/?key=${apikey.pixabay}&lang=ko`;
let data;

function getData(searchname, pagenum){
  let keyword = `&q=${encodeURIComponent(searchname)}`;
  let page = `&page=${pagenum}`;
  console.log(searchname ? URL+keyword+page : URL+page)
  return rq({
       url: (searchname ? URL+keyword+page : URL+page),
       method: 'GET'
   }).then(res => {
     if(parseInt(JSON.parse(res).totalHits) > 0){
        data = JSON.parse(res);
     } else {
        data = '';
     }
   })
}

 router.post('/', (req, res) => {
   getData(req.body.searchname, req.body.pagenum)
     .then(resolve => {
       return res.send({data: data})
   })
     .catch(error => console.log(error));
 })

 router.post('/server', (req, res) => {
   //저장하기 전에 파일이 있는지 확인
   fs.stat(`./images/${req.body.id}_${req.body.type ? 'S' : 'L'}.jpg`, function(error, stat) {
       if(error == null) {
           console.log('file exists');
           return res.send(true);
       } else {
           let options = {
            url: req.body.url,
            dest: `./images/${req.body.id}_${req.body.type ? 'S' : 'L'}.jpg`
          }

          download.image(options)
            .then(({ filename, image }) => {
              console.log('File saved to', filename)
              return res.send(true);
            })
            .catch((err) => {
              console.error(err);
              return res.status(401).json(false);
            });
       }
   });
 });

export default router;
