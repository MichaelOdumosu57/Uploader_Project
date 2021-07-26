import { tap,catchError } from 'rxjs/operators';
import {environment as env} from '../environments/environment';
import { Injectable } from '@angular/core';
import {RyberService} from './ryber.service';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { from, Observable } from 'rxjs';

let toBinString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '');


@Injectable()
export class MyInterceptor implements HttpInterceptor {

    constructor(
        private ryber:RyberService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let {ryber} = this
        // intercept and transform storage requests
        if(request.url.includes(env.backend.storageURL)){
            // console.log(request)

            // extract the headers for the actual request to the backend
            let myHeaders: HttpHeaders =request.headers;
            let myBodyHeaders:any =  ["verb","content-length","content-type","x-ms-date","x-ms-version","x-ms-blob-type","authorization"]
            .map((x:any,i)=>{
                let valx = request.headers.getAll(x).reduce((acc,x,i)=>{return acc + " " + x})
                myHeaders= myHeaders.delete(x)
                return [x,valx]
            })
            myBodyHeaders = Object.fromEntries(myBodyHeaders)
            console.log(myBodyHeaders)
            //

            // set the content tpye for the proxy
            myHeaders = myHeaders.set("content-type", "application/json")
            //


            request = request.clone({
                body:{
                    env:"proxy",
                    proxy_url:request.urlWithParams,
                    proxy_headers:myBodyHeaders,
                    proxy_payload:request.body,
                    user:ryber.appCO0.metadata.facebookLogin.loginName,
                    access_token:ryber.appCO0.metadata.facebookLogin.accessToken
                },
                url:env.backend.url,
                method:"POST",
                headers:myHeaders
            });


        }

        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
            })
        )

    }
}
