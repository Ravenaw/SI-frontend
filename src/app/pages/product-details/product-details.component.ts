import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from 'src/app/services/product-details.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private param: ActivatedRoute,
    private service: ProductDetailsService
  ) {}
  productId: any;
  productDetails: any;

  ngOnInit(): void {
    this.productId = this.param.snapshot.paramMap.get('id');
    console.log(this.productId, 'productId');
    if (this.productId) {
      this.productDetails = this.service.productDetails.filter((value) => {
        return value.id == this.productId;
      });
      console.log(this.productDetails, 'productDetails');
    }
  }
}
