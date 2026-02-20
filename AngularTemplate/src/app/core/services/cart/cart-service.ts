import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {AuthLocal} from "../localStorage/auth-local";
import {BookResponse} from "../../interfaces/books/bookResponse";
import {cartInterface} from "../../interfaces/cart/cartInterface";
import {MessageService} from "../messages/message-service";
import {CuponResponse} from "../../interfaces/books/cuponResponse";
import {SessionStorageService} from "../sessionStorage/session-storage.service";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private local = inject(AuthLocal)
    private sessionStorage = inject(SessionStorageService)
    private messageService = inject(MessageService);

    public cart = signal<cartInterface[]>(this.loadCart())
    public delivery = signal<number>(this.loadDelivery())
    public method = signal<string>('debit-card')
    public cupon = signal<CuponResponse>(this.loadCupon())


    private storageEffect = effect(() => {
        this.local.set('cart', JSON.stringify(this.cart()));
    })

    private sessionEffect = effect(() => {
        this.sessionStorage.set('cupon', JSON.stringify(this.cupon()));
        this.sessionStorage.set('delivery', JSON.stringify(this.delivery()));
    })

    private loadCart(){
        if (this.local.get('cart')) {
            return JSON.parse(this.local.get('cart'));
        }
        return []
    }

    private loadDelivery(){
        if (this.sessionStorage.get('delivery')) {
            return JSON.parse(this.sessionStorage.get('delivery'));
        }
        return 5
    }

    private loadCupon(){
        if (this.sessionStorage.get('cupon')){
            return JSON.parse(this.sessionStorage.get('cupon'));
        }
        return null
    }

    public clearCart(){
        this.cart.set([])
        this.clearCupon()
        this.delivery.set(this.loadDelivery())
    }

    public clearCupon(){
        this.cupon.set(this.loadCupon())
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

    public countItems = computed(() =>
        this.cart().reduce((ac, item) => ac + item.count,0)
    )

    public subtotal= computed(() =>
        this.cart().reduce((ac, item) => ac + item.count*item.price, 0)
    )

    public iva = computed(() =>
        this.subtotal() * 0.04
    )

    public discount = computed(() =>
        this.subtotal() * this.cupon()?.discount/100
    );

    public total = computed(() =>
        this.cupon() ? this.subtotal() + this.delivery() + this.iva() - this.discount() : this.subtotal() + this.delivery() + this.iva()
    )
}
