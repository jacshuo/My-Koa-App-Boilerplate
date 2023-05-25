import app from '@src/app';
import config from '@app/config';

app.listen(config.port, () => {
  console.log(`服务器已启动于端口：${config.port}`);
});
