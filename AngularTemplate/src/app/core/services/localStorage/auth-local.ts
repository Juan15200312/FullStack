import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthLocal {

  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }

  check(key: string) {
    return !!localStorage.getItem(key);

  }

  remove(key: string) {
    if (this.check(key)) {
      localStorage.removeItem(key);
    }
  }

  removeAll() {
    localStorage.clear();
  }
}
