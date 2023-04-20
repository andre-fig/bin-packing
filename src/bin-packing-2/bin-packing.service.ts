import { Injectable } from '@nestjs/common';
import { Product } from '../product';
import { Package } from '../package';

@Injectable()
export class BinPackingService2 {
  firstFitDecreasing3D(
    products: Product[],
    packages: Package[],
  ): Map<Package, Product[]> {
    const sortedProducts = products.sort(
      (a, b) => b.width * b.height * b.length - a.width * a.height * a.length,
    );
    const packageProductMap = new Map<Package, Product[]>();

    for (const product of sortedProducts) {
      let productPlaced = false;

      // Itera sobre as embalagens existentes tentando alocar o produto
      for (const [
        currentPackage,
        currentProducts,
      ] of packageProductMap.entries()) {
        const totalWeight = currentProducts.reduce(
          (acc, p) => acc + p.weight,
          0,
        );

        if (
          currentPackage.maxWeight >= totalWeight + product.weight &&
          currentPackage.width >= product.width &&
          currentPackage.height >= product.height &&
          currentPackage.length >= product.length
        ) {
          currentProducts.push(product);
          packageProductMap.set(currentPackage, currentProducts);
          productPlaced = true;
          break;
        }
      }

      // Se o produto ainda não foi alocado, cria uma nova embalagem e aloca o produto
      if (!productPlaced) {
        const suitablePackage = packages.find(
          (pkg) =>
            pkg.maxWeight >= product.weight &&
            pkg.width >= product.width &&
            pkg.height >= product.height &&
            pkg.length >= product.length,
        );

        if (suitablePackage) {
          const newPackage = new Package(
            packageProductMap.size + 1,
            suitablePackage.maxWeight,
            suitablePackage.width,
            suitablePackage.height,
            suitablePackage.length,
          );
          packageProductMap.set(newPackage, [product]);
        } else {
          throw new Error(`Não foi possível alocar o produto ${product.id}`);
        }
      }
    }

    return packageProductMap;
  }
}
