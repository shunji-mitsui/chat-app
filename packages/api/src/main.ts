import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // 特定のオリジンを許可
    // origin: 'http://localhost:5173', // 特定のオリジンを許可
    methods: '*', // 許可するHTTPメソッド
    allowedHeaders: '*', // すべてのヘッダーを許可
  });
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
