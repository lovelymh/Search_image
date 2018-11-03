import express from 'express';
import compression from 'compression';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import bodyParser from 'body-parser'; //JSON을 파싱할때 사용하는 미들웨어
import mongoose from 'mongoose'; //mongodb 데이터 모델링 툴. javascript 객체로 사용할 수 있게 해줌
import session from 'express-session'; //express에서 세션을 다룰때 사용되는 미들웨어
import api from './routes';
import path from 'path';

const app = express();
const port = 3000;
const devPort = 3001;

app.use(compression()); //gzip
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json;
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/codelab', { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

//use session
app.use(session({
  secret: 'codelab$112$34', //이 값을 이용하여 세션을 암호화하여 저장
  resave: false, //세션이 변경되지 않어도 언제나 저장할지?
  saveUninitialized: true, //세션이 저장되기전에  uninitialized 상태로 미리 만들어서 저장할지?
}));

app.use('/', express.static(__dirname + './../public'));
app.use('/image', express.static(__dirname + './../src/components'));
app.use('/images', express.static(__dirname + './../images'));

app.use('/api', api);
//라우터에서 throw err가 실행되면 아래 코드가 실행됨
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'))
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.listen(port, () => {
    console.log('Express is listening on port', port);
});
