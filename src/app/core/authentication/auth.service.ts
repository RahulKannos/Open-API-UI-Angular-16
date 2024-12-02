import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiURL } from 'src/app/shared/common/api-url';
import { LoginModel, LoginResponse } from 'src/app/shared/models/auth.model';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpService: HttpService) {}

  login(model: LoginModel): Observable<LoginResponse> {
    return this._httpService.post<LoginResponse>(ApiURL.login, model);
  }
}
