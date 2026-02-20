import {Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth/auth-guard";
import {checkoutGuard} from "./core/guards/checkout/checkout-guard";

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./features/auth/login/login').then((c) => c.Login)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () => import('./layouts/main-layouts/main-layouts').then((c) => c.MainLayouts),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.Dashboard),

            },
            {
                path: 'categories',
                loadComponent: () => import('./features/categories/categories').then((c) => c.Categories),

            },
            {
                path: 'categories/:category',
                loadComponent: () => import('./features/categories/category/category').then((c) => c.Category),
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./features/wishlist/wishlist').then((c) => c.Wishlist),
                canActivate: [authGuard],
            },
            {
                path: 'library',
                loadComponent: () => import('./features/library/library').then((c) => c.Library),
                canActivate: [authGuard],
            },
            {
                path: 'cart',
                loadComponent: () => import('./layouts/cart-layout/cart-layout').then((c) => c.CartLayout),
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./features/cart/cart').then((c) => c.Cart),
                        data: {url: 'cart'},
                        canActivate: [checkoutGuard],

                    },
                    {
                        path: 'shipping',
                        loadComponent: () => import('./features/shipping/shipping').then((c) => c.Shipping),
                        data: {url: 'shipping'},
                        canActivate: [checkoutGuard],
                    },
                    {
                        path: 'payment',
                        loadComponent: () => import('./features/payment/payment').then((c) => c.Payment),
                        data: {url: 'payment'},
                        canActivate: [checkoutGuard],
                    },
                    {
                        path: 'message-payment',
                        loadComponent: () => import('./features/message-payment/message-payment').then((c) => c.MessagePayment),


                    }
                ]
            }

        ],

    }


];
