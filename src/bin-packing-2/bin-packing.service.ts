import { Injectable } from '@nestjs/common';
import { Package } from 'src/package';
import { Product } from 'src/product';

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
      let bestFitPackage: Package | null = null;
      let bestFitProducts: Product[] | null = null;
      let minWastedSpace = Number.MAX_VALUE;

      for (const currentPackage of packages) {
        const currentProducts = packageProductMap.get(currentPackage) || [];

        const totalWeight = currentProducts.reduce(
          (acc, p) => acc + p.weight,
          0,
        );
        const totalVolume = currentProducts.reduce(
          (acc, p) => acc + p.width * p.height * p.length,
          0,
        );

        const remainingWeight = currentPackage.maxWeight - totalWeight;
        const remainingVolume =
          currentPackage.width * currentPackage.height * currentPackage.length -
          totalVolume;

        if (
          remainingWeight >= product.weight &&
          currentPackage.width >= product.width &&
          currentPackage.height >= product.height &&
          currentPackage.length >= product.length &&
          remainingVolume - product.width * product.height * product.length <
            minWastedSpace
        ) {
          bestFitPackage = currentPackage;
          bestFitProducts = currentProducts;
          minWastedSpace =
            remainingVolume - product.width * product.height * product.length;
        }
      }

      if (bestFitPackage && bestFitProducts) {
        bestFitProducts.push(product);
        packageProductMap.set(bestFitPackage, bestFitProducts);
      } else {
        // Encontre o pacote com menor espaço desperdiçado e adicione uma nova instância desse pacote ao array de pacotes
        const minWastePackage = packages.reduce((min, pkg) => {
          const pkgWastedSpace =
            pkg.width * pkg.height * pkg.length -
            product.width * product.height * product.length;
          return pkgWastedSpace < minWastedSpace ? pkg : min;
        }, packages[0]);

        const newPackageInstance = new Package(
          minWastePackage.id,
          minWastePackage.maxWeight,
          minWastePackage.width,
          minWastePackage.height,
          minWastePackage.length,
        );
        packages.push(newPackageInstance);

        packageProductMap.set(newPackageInstance, [product]);
      }
    }

    return packageProductMap;
  }
}
