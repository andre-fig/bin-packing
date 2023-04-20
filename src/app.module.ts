import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinPackingController } from './bin-packing/bin-packing.controller';
import { BinPackingService } from './bin-packing/bin-packing.service';
import { BinPackingController2 } from './bin-packing-2/bin-packing.controller';
import { BinPackingService2 } from './bin-packing-2/bin-packing.service';

@Module({
  imports: [],
  controllers: [AppController, BinPackingController, BinPackingController2],
  providers: [AppService, BinPackingService, BinPackingService2],
})
export class AppModule {}
