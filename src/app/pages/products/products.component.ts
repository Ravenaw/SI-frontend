import { Component,ChangeDetectorRef } from '@angular/core';
import { ProductDetailsService } from 'src/app/services/product-details.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productService: ProductDetailsService,private ref: ChangeDetectorRef) { }
  productData: any = [];
  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      let parse = JSON.parse(JSON.stringify(data.data));
      this.productData = parse.products;
      this.productData.forEach((element: any) => {
        this.productService.getProductDetail(element.id).subscribe((data) => 
        {
          let parse = JSON.parse(JSON.stringify(data.data));
          element.product_images = parse.product.product_images;
          console.log(element);
        });
      });

      });
      this.ref.detectChanges();
  }
}
