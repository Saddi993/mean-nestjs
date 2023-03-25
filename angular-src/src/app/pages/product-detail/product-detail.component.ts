import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRestService } from 'src/app/providers/backend/product.service';
import { head } from 'lodash';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

	productID: string;
	product: any = [];
	constructor(
		private productRestSrv: ProductRestService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.productID = this.route.snapshot.paramMap.get('id');
		this.getProduct();
	}

	getProduct() {
		this.productRestSrv.getProductByID(this.productID).subscribe(d => {
			this.product = head(d.data);
		}, e => {
			console.log(e);
		});
	}
}
