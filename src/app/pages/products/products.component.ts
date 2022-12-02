import { Component } from '@angular/core';
import { ProductDetailsService } from 'src/app/services/product-details.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productDetailsService: ProductDetailsService) { }
  productData: any = [];
  ngOnInit() {
    this.productData = this.productDetailsService.getProductDetails();
  }
}
