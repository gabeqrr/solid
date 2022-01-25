export abstract class Discount {
  protected discount = 0;

  // calculate(price: number): unknown {
  // se uma subclasse herda de discount, ela não deve retornar algo
  // diferente de number
  calculate(price: number): number {
    // QUEBRANDO O LSP
    // throw new Error('Not implemented error');
    return price - price * (this.discount / 100);
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount = 50;
}

export class TenPercentDiscount extends Discount {
  protected readonly discount = 10;
}

export class NoDiscount extends Discount {}

// LSP: O comportamento dos subtipos de discount deve ser o mesmo de discount
// Se um animal é um mamífero e não mama, ele não deveria ser um mamífero
