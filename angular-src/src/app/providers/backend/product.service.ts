import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';

@Injectable({
  providedIn: 'root'
})

export class ProductRestService {

  constructor(private backend: BackEndService) { }

  getProductList(offset = 0, limit = 10) {
    return this.backend.get(`/products?offset=${offset}&limit=${limit}`);
  }

  getProductByID(id: any) {
    return this.backend.get(`/products/${id}`);
  }

  createProduct(data: any) {
    return this.backend.post(`/products`, data);
  }

  updateProduct(id: any, data) {
    return this.backend.put(`/products/${id}`, data);
  }

  deleteProduct(id: any) {
    return this.backend.delete(`/products/${id}`);
  }

}
