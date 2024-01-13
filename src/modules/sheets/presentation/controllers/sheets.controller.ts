import { Controller, Get, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SheetsUseCaseProxyModule } from '../../usecases-proxy/sheets-usecases-proxy.module';
import UseCaseProxy from 'src/common/usecases-proxy';
import { ChurnRateUsecases } from '../../usecases/churn-rate.usecases';
import { MrrUsecases } from '../../usecases/mrr.usecases';

@Controller()
export class SheetsController {
  constructor(
    @Inject(SheetsUseCaseProxyModule.CHURN_RATE_USECASES_PROXY)
    private readonly churnRateUsecasesProxy: UseCaseProxy<ChurnRateUsecases>,
    @Inject(SheetsUseCaseProxyModule.MRR_USECASES_PROXY)
    private readonly mrrUsecasesProxy: UseCaseProxy<MrrUsecases>,
  ) {}

  @Post('/upload/churn-rate')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Buffer) {
    const churnRateData = await this.churnRateUsecasesProxy.getInstance().execute(file);
    return churnRateData;
  }

  @Post('/upload/mrr')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMrrFile(@UploadedFile() file: Buffer) {
    const mrrData = await this.mrrUsecasesProxy.getInstance().execute(file);
    return mrrData;
  }
}
