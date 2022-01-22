import { Item } from './interfaces/item';

export class ShoppingCart {
  private readonly _items: Item[] = [];

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

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clearCart(): void {
    this._items.length === 0;
  }
}
