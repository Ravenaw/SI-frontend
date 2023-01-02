import { Component,ChangeDetectorRef } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductDetailsService } from 'src/app/services/product-details.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(public wishlistService: WishlistService, public productService: ProductDetailsService,private ref: ChangeDetectorRef) {}
  wishlistData: any = [];
  temp: any = [];
  ngOnInit() {
    

    const makeRequest = async () => {
      try {
        let wishList = await lastValueFrom(this.wishlistService.getWishList());
        wishList = wishList.rss.channel.item;
        this.temp = this.temp.concat(wishList);
        
        this.temp.forEach(async (element: any) => {
          let details = await lastValueFrom(this.productService.getProductDetail(element.title._text));
          details = JSON.parse(JSON.stringify(details.data));
          details.product.user = element.description._text;
          this.wishlistData.push(details.product);
          //console.log(element);
        });
        
        this.ref.detectChanges();

      } catch (err) {
        console.log(err);
      }
    }
    makeRequest();
    
  }
}
