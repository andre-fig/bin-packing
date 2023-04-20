import { Injectable } from '@nestjs/common';
import { Product } from '../product';
import { Package } from '../package';

@Injectable()
export class BinPackingService {
  firstFitDecreasing3D(
    products: Product[],
    packages: Package[],
  ): Map<Package, Product[]> {
    // Ordena os produtos em ordem decrescente de volume (width * height * length)
    const sortedProducts = products.sort(
      (a, b) => b.width * b.height * b.length - a.width * a.height * a.length,
    );

    // Cria um mapa para armazenar a relação entre pacotes e produtos alocados
    const packageProductMap = new Map<Package, Product[]>();

    // Itera sobre os produtos ordenados
    for (const product of sortedProducts) {
      let packageIndex = 0;
      let productPlaced = false;

      // Enquanto o produto não for alocado e houver pacotes disponíveis
      while (!productPlaced && packageIndex < packages.length) {
        const currentPackage = packages[packageIndex];

        // Obtém os produtos já alocados neste pacote ou cria um array vazio
        const currentProducts = packageProductMap.get(currentPackage) || [];

        // Calcula o peso total dos produtos no pacote atual
        const totalWeight = currentProducts.reduce(
          (acc, p) => acc + p.weight,
          0,
        );

        // Verifica se o pacote atual pode acomodar o produto
        if (
          currentPackage.maxWeight >= totalWeight + product.weight &&
          currentPackage.width >= product.width &&
          currentPackage.height >= product.height &&
          currentPackage.length >= product.length
        ) {
          // Aloca o produto no pacote atual
          currentProducts.push(product);
          packageProductMap.set(currentPackage, currentProducts);
          productPlaced = true;
        } else {
          // Passa para o próximo pacote
          packageIndex++;
        }
      }

      // Caso o produto não possa ser alocado em nenhum pacote, lança um erro
      if (!productPlaced) {
        throw new Error(`Não foi possível alocar o produto ${product.id}`);
      }
    }

    // Retorna o mapa de alocação de produtos em pacotes
    return packageProductMap;
  }
}
