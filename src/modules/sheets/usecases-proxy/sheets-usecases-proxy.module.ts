import { type DynamicModule, Module } from '@nestjs/common'
import UseCaseProxy from 'src/common/usecases-proxy'
import { ChurnRateUsecases } from '../usecases/churn-rate.usecases'
import { SheetsModule } from '../sheets.module';
import { MrrUsecases } from '../usecases/mrr.usecases';

@Module({
  imports: [SheetsUseCaseProxyModule]
})
export class SheetsUseCaseProxyModule {
  static CHURN_RATE_USECASES_PROXY = 'ChurnRateUsecasesProxy';
  static MRR_USECASES_PROXY = 'MrrUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: SheetsModule,
      providers: [
        {
          provide: SheetsUseCaseProxyModule.CHURN_RATE_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new ChurnRateUsecases())
        },
        {
          provide: SheetsUseCaseProxyModule.MRR_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new MrrUsecases())
        }
      ],
      exports: [
        SheetsUseCaseProxyModule.CHURN_RATE_USECASES_PROXY,
        SheetsUseCaseProxyModule.MRR_USECASES_PROXY
      ]
    }
  }
}