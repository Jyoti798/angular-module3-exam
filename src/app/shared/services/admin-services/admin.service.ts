import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ManageService } from 'src/app/auth/services/manage.service';
import { INVENTORY_URL } from '../../contants/firebaseEnv';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private userId: string | undefined;
  constructor(private http: HttpClient, private manageService: ManageService) {
    this.userId = this.manageService.getUserId();
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${INVENTORY_URL}.json`, product);
  }
  updateProduct(id: string, product: any) {
    return this.http.put(`${INVENTORY_URL}/${id}.json`, product);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${INVENTORY_URL}/${id}.json`);
  }
  ///fetch all the inventory
  fetchInventory(): Observable<any[]> {
    return this.http.get(`${INVENTORY_URL}.json`).pipe(
      map((response: any) => {
        if (!response) return [];
        return Object.keys(response).map((key) => ({
          id: key,
          ...response[key],
        }));
      })
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${INVENTORY_URL}/${id}.json`);
  }
  
}
