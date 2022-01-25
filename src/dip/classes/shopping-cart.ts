// DIP: módulos de alto nível não devem depender de módulos de baixo nível.
// Ambos devem depender de abstrações, não de implementações.
// Abstrações não devem depender de detalhes. Detalhes devem depender
// de abstrações

// Classes de baixo nível são as que executam tarefas (os detalhes)
// Classes de alto nível são as que gerenciam as de baixo nível

import { Discount } from './discount'; // abstrata, tambem é um protocol pois nao pode ser instanciada
import { Item } from './interfaces/item';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _items: Item[] = [];

  constructor(private readonly discount: Discount) {}

  addItem(item: Item): void {
    this._items.push(item);
  }

  remItem(index: number): void {
    this._items.splice(index, 1);
  }

  searchItem(nome: string): Item | undefined {
    const searchedItem = this._items.find((item) => item.name === nome);
    if (searchedItem === undefined) return;

    return searchedItem;
  }

  get items(): Readonly<Item>[] {
    return this._items;
  }

  total(): number {
    // 0 + 19.9 + 29.9 + 189.9
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  totalWithDiscount(): number {
    // QUEBRANDO O LSP
    // const result = this.discount.calculate(this.total());

    // if (typeof result === 'number') return result;
    // return this.total();

    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clearCart(): void {
    this._items.length === 0;
  }
}
