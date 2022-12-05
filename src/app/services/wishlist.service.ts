import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  wishList: any = [
    {
      id: 1,
      product_name: 'Product 1',
      price: 100,
      image_url: 'https://picsum.photos/3840/2160?random=1',
    },
    {
      id: 2,
      product_name: 'Product 2',
      price: 200,
      image_url: 'https://picsum.photos/3840/2160?random=2',
    },
  ];
}
