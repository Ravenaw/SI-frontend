import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor() { }

  getProductDetails() {
    return [
      {
        id: 1,
        name: 'Laptop',
        price: 1000,
        description: 'Laptop description'
      },
      {
        id: 2,
        name: 'Mobile',
        price: 100,
        description: 'Mobile description'
      },
      {
        id: 3,
        name: 'TV',
        price: 10000,
        description: 'TV description'
      }
    ];
  }
}
