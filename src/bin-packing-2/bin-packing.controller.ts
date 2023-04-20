import { Controller, Get } from '@nestjs/common';
import { Product } from '../product';
import { Package } from '../package';
import { BinPackingService2 } from './bin-packing.service';

@Controller('bin-packing-2')
export class BinPackingController2 {
  constructor(private readonly binPackingService: BinPackingService2) {}

  @Get()
  solve(): string {
    const products: Product[] = [
      new Product(1, 5, 10, 5, 15),
      new Product(2, 7, 20, 10, 10),
      new Product(3, 3, 15, 5, 10),
      new Product(4, 5, 10, 5, 15),
      new Product(5, 7, 20, 10, 10),
      new Product(6, 3, 15, 5, 10),
    ];

    const packages: Package[] = [
      new Package(1, 20, 25, 15, 30),
      new Package(2, 15, 25, 10, 25),
    ];

    const packageProductMap = this.binPackingService.firstFitDecreasing3D(
      products,
      packages,
    );

    let result = 'Alocação de produtos em embalagens:\n';
    let volumeIndex = 1;
    packageProductMap.forEach((allocatedProducts, currentPackage) => {
      result += `Volume ${volumeIndex}: Pacote tipo ${
        currentPackage.id
      }: [${allocatedProducts
        .map((product) => `Produto ${product.id}`)
        .join(', ')}]\n`;
      volumeIndex++;
    });

    return result;
  }
}
