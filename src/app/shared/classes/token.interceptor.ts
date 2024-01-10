import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth: AuthService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.auth.isAuthenticated()) {
      const token = this.auth.getToken();
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: token
          }
        });
      }
    }
    return next.handle(req);
  }
}
