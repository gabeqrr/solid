import { Discount } from './discount';
import { Item } from './interfaces/item';

export class ShoppingCart {
  private readonly _items: Item[] = [];
  private readonly discount: Discount;

  constructor(private readonly _discount: Discount) {
    this.discount = _discount;
  }

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
