import { Injectable } from '@angular/core';
import { BackEndService } from './backend.service';

@Injectable({
  providedIn: 'root'
})

export class UserRestService {

  constructor(private backend: BackEndService) { }

  login(user: any) {
    return this.backend.post(`/users/login`, user);
  }

  register(user: any) {
    return this.backend.post(`/users`, user);
  }
}
