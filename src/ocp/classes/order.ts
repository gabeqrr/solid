import { OrderStatus } from './interfaces/orderStatus';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open'; //
  private readonly cart: ShoppingCart;
  private readonly messaging: Messaging;
  private readonly persistency: Persistency;

  constructor(
    private readonly _cart: ShoppingCart,
    private readonly _messaging: Messaging,
    private readonly _persistency: Persistency,
  ) {
    this.cart = _cart;
    this.messaging = _messaging;
    this.persistency = _persistency;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Carrinho vazio!!!');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de R$${this.cart.totalWithDiscount()} foi recebido!`,
    );
    this.persistency.saveOrder();
    this.cart.clearCart();
  }
}
