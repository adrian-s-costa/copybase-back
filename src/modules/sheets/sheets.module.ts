import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SheetsController } from '../sheets/presentation/controllers/sheets.controller';
import * as cors from 'cors';
import { SheetsUseCaseProxyModule } from './usecases-proxy/sheets-usecases-proxy.module';

@Module({
  imports: [
    SheetsUseCaseProxyModule.register(),
  ],
  exports: [SheetsUseCaseProxyModule.register()],
  controllers: [SheetsController],
  providers: [],
})

export class SheetsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}