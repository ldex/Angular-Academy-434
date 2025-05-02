import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product.interface';
import { AsyncPipe, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product$: Observable<Product>

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private productService = inject(ProductService)

  deleteProduct(id: number) {
    this
      .productService
      .deleteProduct(id)
      .subscribe(
       {
        next: () => {
          console.log('Product deleted')
          this.productService.resetList()
          this.router.navigateByUrl('/products')
        },
        error: err => {
          console.error('Could not delete product! ' + err.message)
        }
       }
      )
  }

  constructor() {
    let id = this.activatedRoute.snapshot.params.id

    this.product$ = this
                      .productService
                      .getProductById(id)
  }

}
