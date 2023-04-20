import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinPackingController } from './bin-packing/bin-packing.controller';
import { BinPackingService } from './bin-packing/bin-packing.service';

@Module({
  imports: [],
  controllers: [AppController, BinPackingController],
  providers: [AppService, BinPackingService],
})
export class AppModule {}
