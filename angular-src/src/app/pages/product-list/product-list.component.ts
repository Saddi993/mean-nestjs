import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductRestService } from 'src/app/providers/backend/product.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

	offset: number = 0;
	limit: number = 12;
	productListTable: Object[] = [];
	dataSource = new MatTableDataSource(this.productListTable);
	displayedColumns: string[] = ['name', 'price', 'image'];

	constructor(private productRestSrv: ProductRestService, private router: Router) { }

	ngOnInit() {
		this.getAllProducts();
	}

	getAllProducts() {
		this.productRestSrv.getProductList(this.offset, this.limit).subscribe(d => {
			this.productListTable = d.data;
			this.dataSource.data = this.productListTable;
		}, e => {
			console.log(e);
		});
	}

	open(id: any) {
		console.log(id);

		this.router.navigate([`/product-detail/${id}`]);
	}

}
