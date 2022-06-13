import mongoose from 'mongoose';
import { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_PORT, DB_NAME } from '../config';
const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

mongoose.connect(url).then(() => {
  console.log('连接成功');
}).catch((err) => {
  console.log(err);
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('连接数据库成功');
})
db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('close', function () {
  console.log('数据库断开，重新连接数据库');
  mongoose.connect(url);
});