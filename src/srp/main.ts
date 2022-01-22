import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';

const shoppingCart = new ShoppingCart();
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem(new Product('Caneca', 19.9));
shoppingCart.addItem(new Product('Camiseta', 45.9));
shoppingCart.addItem(new Product('Tênis', 189.9));

console.log('Item pesquisado:', shoppingCart.searchItem('Tênis'));
console.log('');
console.log('Carrinho:', shoppingCart.items);
console.log('');
console.log('Total:', shoppingCart.total());
console.log('');

order.checkout();
console.log('Status do pedido:', order.orderStatus);
