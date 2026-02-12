import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authSendInterceptor} from "./core/interceptors/auth/auth-send-interceptor";
import {authResponseInterceptor} from "./core/interceptors/auth/auth-response-interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideHttpClient(
            withFetch(),
            withInterceptors([authSendInterceptor, authResponseInterceptor])
        ),
        provideAnimations()
    ]
};
