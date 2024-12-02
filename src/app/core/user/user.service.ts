import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiURL } from 'src/app/shared/common/api-url';
import { User, UserListResponse } from 'src/app/shared/models/user.model';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpService: HttpService) {}

  getUserList(): Observable<UserListResponse> {
    return this._httpService.get<UserListResponse>(ApiURL.userList);
  }

  addEditUser(payload: User): Observable<any> {
    return this._httpService.post(ApiURL.addEditUser, payload);
  }
  deleteUser(id: string): Observable<any> {
    return this._httpService.delete(`${ApiURL.deleteUser}${id}`);
  }
  getUserById(id: string): Observable<any> {
    return this._httpService.get(`${ApiURL.getUserById}${id}`);
  }
}
