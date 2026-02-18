import {effect, inject, Injectable, signal} from '@angular/core';
import {AuthLocal} from "../localStorage/auth-local";
import {BookResponse} from "../../interfaces/books/bookResponse";
import {cartInterface} from "../../interfaces/cart/cartInterface";
import {MessageService} from "../messages/message-service";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private local = inject(AuthLocal)
    private messageService = inject(MessageService);

    public cart = signal<cartInterface[]>(this.loadCart())

    private storageEffect = effect(() => {
        this.local.set('cart', JSON.stringify(this.cart()));
    })

    private loadCart(){
        if (this.local.get('cart')) {
            return JSON.parse(this.local.get('cart'));
        }
        return []
    }


    add(book: BookResponse, view:boolean) {
        this.cart.update((currentCart) => {
            const index = currentCart.findIndex(itemCart => itemCart.book.id === book.id);

            if (index !==-1) {
                let newCart = [...currentCart];
                if (newCart[index].count >= newCart[index].book.stock) {
                    this.messageService.notify({
                        icon: 'fa-solid fa-face-dizzy',
                        message: '¡Ya tienes demasiados en el carrito!',
                        color: 'warning',
                        view: view,
                    })
                    return newCart;
                }

                newCart[index] = {
                    ...newCart[index],
                    count: newCart[index].count + 1,
                }
                this.messageService.notify({
                    icon: 'fa-solid fa-face-grin-wink',
                    message: 'Libro agregado al carrito',
                    color: 'success',
                    view: view,
                })
                return newCart;
            }

            let newItem = {
                id: book.id,
                book: book,
                count: 1,
                price: book.price,
            }
            this.messageService.notify({
                icon: 'fa-solid fa-face-grin-wink',
                message: 'Libro agregado al carrito',
                color: 'success',
                view: view,
            })
            return [...currentCart, newItem];
        })
    }

    remove(book: BookResponse) {
        this.cart.update((currentCart) => {
            const index = currentCart.findIndex(itemCart => itemCart.book.id === book.id)

            if (index !==-1){
                let newCart = [...currentCart]
                if (newCart[index].count>1){
                    newCart[index].count = newCart[index].count - 1
                    return newCart;
                }

            }
            return currentCart;
        })
    }

    delete(book: BookResponse) {
        this.cart.update((currentCart) => {
            this.messageService.notify({
                icon: 'fa-solid fa-face-sad-cry',
                message: 'Libro eliminado del carrito',
                color: 'danger',
                view: true,
            })
            return currentCart.filter(itemCart => itemCart.id !== book.id)
        })
    }

    countItems() {
        return this.cart().reduce((ac, item) => ac + item.count, 0);
    }

    subtotal() {
        return this.cart().reduce((ac, item) => ac + item.count*item.price, 0);
    }

    envio(){
        return 5;
    }

    iva(){
        return this.subtotal()*0.04
    }

    total(){
        return this.subtotal() + this.envio() + this.iva()
    }
}
