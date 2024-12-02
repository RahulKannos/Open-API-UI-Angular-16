import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private toast: ToastrService) {}
  hostAPIUrl = 'http://localhost:5044/api/';
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add common headers, like Authorization
    debugger;
    const updatedUrl = `${this.hostAPIUrl}${req.url}`;
    const token = localStorage.getItem('token');
    const clonedRequest = req.clone({
      url: updatedUrl,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle the request
    return next.handle(clonedRequest).pipe(
      // Log response data and handle success case
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Optionally, you can log the response body as well
          const response = event.body;
          if (response.status) {
            this.toast.success(response.message, 'Success');
          } else {
            this.toast.error(response.message, 'Error');
          }
        }
      }),
      catchError((error) => {
        console.error('Request error:', error);
        throw error;
      })
    );
  }
}
