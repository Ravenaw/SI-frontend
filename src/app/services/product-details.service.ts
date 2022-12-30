import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  
  constructor(private http: HttpClient,private storageService: StorageService) {}

  productDetails: any;
  
  getProducts(): Observable<any> {
    let authKey = this.storageService.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', authKey);
    headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post
      ("https://system-integration-goat.northeurope.cloudapp.azure.com:8002/graphql", {"query": "query getAllProducts {products {id product_name product_sub_title product_description price main_category sub_category  overall_rating}}" }, { headers: headers });

  }

  getProductDetail(id: number): Observable<any> {
    let authKey = this.storageService.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', authKey);
    headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post
      ("https://system-integration-goat.northeurope.cloudapp.azure.com:8002/graphql",
       {
        "query": "query getProduct($productId: ID!) {product(id: $productId) {id product_name product_description price product_images {product_id image_url alt_text additional_info}}}",
        "variables": {"productId": id} 
      }, { headers: headers });

  }
}
