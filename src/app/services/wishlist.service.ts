import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 
   'Access-Control-Allow-Origin': '*',
   'Ocp-Apim-Subscription-Key': 'e64edeb333d44d75a71c4a269d757e13'}),
  //withCredentials: true
};

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  
  Link = "https://rss-function-system-integration.azurewebsites.net/api/rss-server-azure-trigger";
  constructor(private http: HttpClient,private storageService: StorageService) { }
 
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

  getWishList():Observable<any> {
    return this.http.get(this.Link, httpOptions);
  }

  addWish(product: any) {
    let wish= {
      item:{
      title: product.id,
      description: this.storageService.getUser().user.email
      }
    }
    return this.http.post(this.Link, wish, httpOptions);
  }
}
