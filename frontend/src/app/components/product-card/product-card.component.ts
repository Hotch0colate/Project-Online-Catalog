import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() item: Product | null = null;

  constructor(private apiService: ApiService) {}
  // @Input() item ;
  ngOnInit(): void {}
  addCart() {
    this.apiService.addCart({
      id: this.item?.id!,
      product_name: this.item?.product_name!,
      product_price: this.item?.product_price!,
      total_product: 1,
    });
  }
}
