import { Component } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(public wishlistService: WishlistService) {}
  wishlistData: any = [];
  ngOnInit() {
    this.wishlistService.getWishList().subscribe((data) => {
      this.wishlistData = data.rss.channel.item;
      console.log(this.wishlistData);
    });
    
  }
}
