import {effect, inject, Injectable, signal} from '@angular/core';
import {AuthLocal} from "../localStorage/auth-local";
import {BookResponse} from "../../interfaces/books/bookResponse";
import {cartInterface} from "../../interfaces/cart/cartInterface";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private local = inject(AuthLocal)

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


    add(book: BookResponse) {
        this.cart.update((currentCart) => {
            const index = currentCart.findIndex(itemCart => itemCart.book.id === book.id);

            if (index !==-1) {
                let newCart = [...currentCart];
                newCart[index] = {
                    ...newCart[index],
                    count: newCart[index].count + 1,
                }
                return newCart;
            }

            let newItem = {
                id: book.id,
                book: book,
                count: 1,
                price: book.price,
            }

            return [...currentCart, newItem];
        })
    }




}
