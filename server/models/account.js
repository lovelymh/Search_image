import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
  userid: String,
  name: String,
  password: String,
  created: { type: Date, default: Date.now}
});

//genertate hash
//모델의 메소드
//arrow 함수를 사용하면 this 바인딩 문제로 사용하면 안된다
//화살표 함수를 사용하면 this가 전역객체를 가리키게됨
Account.methods.genertateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

//compares the password
Account.methods.validateHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//account라는 스키마를 만들고 model로 만들어서 export 한다
//Schema는 데이터의 틀일뿐이며(테이블의 정의와 유사),
//Model은 실제 db에 접근할 수 있게 해주는 클래스이다
//첫번째인자는 collection명이며 복수형으로 설정된다
export default mongoose.model('account', Account);
