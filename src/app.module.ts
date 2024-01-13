import { Module } from '@nestjs/common';
import { SheetsModule } from './modules/sheets/sheets.module';

@Module({
  imports: [SheetsModule],
})

export class AppModule {}
