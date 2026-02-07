import { Routes } from '@angular/router';
import {authGuard} from "./core/guards/auth/auth-guard";

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./features/auth/login/login').then((c) => c.Login)
    },
    {
        path: 'inicio',
        loadComponent: () => import('./layouts/main-layouts/main-layouts').then((c) => c.MainLayouts),
        canActivate: [authGuard],
    }


];
