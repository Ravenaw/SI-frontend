import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from 'src/app/services/product-details.service';
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  constructor(
    private param: ActivatedRoute,
    private service: ProductDetailsService,
    private wishlistService: WishlistService
  ) {}
  productId: any;
  productDetails: any;

  ngOnInit(): void {
    console.log(this.param.snapshot.params['id']);
    this.productId = this.param.snapshot.params['id'];
    this.service.getProductDetail(this.productId).subscribe((data) => 
        {
          let parse = JSON.parse(JSON.stringify(data.data));
          this.productDetails = parse.product;
          console.log(this.productDetails);
        });
     
      
    
  }

  addWish() {
    this.wishlistService.addWish(this.productDetails).subscribe((data) => {
      console.log(data);
    });
  }
}
