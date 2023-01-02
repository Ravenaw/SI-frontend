import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ProductDetailsService } from 'src/app/services/product-details.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productService: ProductDetailsService, private ref: ChangeDetectorRef, private route: ActivatedRoute) {
    route.queryParams.subscribe(val => {
      this.ngOnInit();
    });
   }
  allProducts: any = [];
  page = 1;
  pageSize = 21;
  lastPage = 0;
  productData: any = [];
  ngOnInit() {
    const makeRequest = async () => {
      try {
        let keyword = this.route.snapshot.queryParamMap.get('keyword');
        if (keyword) {
          let products = await firstValueFrom(this.productService.getProducts(keyword));
          this.allProducts = JSON.parse(JSON.stringify(products.data.findProducts));
        } else {
          let products = await firstValueFrom(this.productService.getProducts());
          this.allProducts = JSON.parse(JSON.stringify(products.data.products));
        }
        this.productData = this.allProducts.slice(0, this.pageSize);
        this.productData.forEach(async (element: any) => {
          let details = await lastValueFrom(this.productService.getProductDetail(element.id));
          details = JSON.parse(JSON.stringify(details.data));
          element.product_images = details.product.product_images;
          //console.log(element);
        });
        this.lastPage = Math.ceil(this.allProducts.length / this.pageSize);
        this.ref.detectChanges();

      } catch (err) {
        console.log(err);
      }
    }
    makeRequest();

  }

  nextPage() {
    if (this.page === this.lastPage) {
      return;
    }
    this.page++;
    this.productData = this.allProducts.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);

    const makeRequest = async () => {
      try {
        this.productData.forEach(async (element: any) => {
          let details = await lastValueFrom(this.productService.getProductDetail(element.id));
          details = JSON.parse(JSON.stringify(details.data));
          element.product_images = details.product.product_images;
          console.log(element);
        });
        this.ref.detectChanges();
      } catch (err) {
        console.log(err);
      }
    }
    makeRequest();
  }

  prevPage() {
    if (this.page === 1) {
      return;
    }
    this.page--;
    this.productData = this.allProducts.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
    const makeRequest = async () => {
      try {
        this.productData.forEach(async (element: any) => {
          let details = await lastValueFrom(this.productService.getProductDetail(element.id));
          details = JSON.parse(JSON.stringify(details.data));
          element.product_images = details.product.product_images;
          console.log(element);
        });
        this.ref.detectChanges();
      } catch (err) {
        console.log(err);
      }
    }
    makeRequest();
  }

}
