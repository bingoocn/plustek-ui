import {Injectable} from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http/http.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router, 
        public toastController: ToastController,
        public mineHttp: HttpService 
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        // 连接正式环境时放开，请求时携带token
        // if (token) {
        //     request = request.clone({
        //         setHeaders: {
        //             'Authorization': 'Basic dWk6dWk=' + token
        //         }
        //     });
        // }
        
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
        
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
        
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (error.error.success === false) {
                        this.mineHttp.presentToast('登录失败');
                    } else {
                        this.router.navigate(['login']);
                    }
                }
                return throwError(error);
            })
        );
    }
}