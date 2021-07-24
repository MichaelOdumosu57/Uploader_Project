import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest,defer,interval } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, repeatWhen, retryWhen, take,map,tap, exhaustMap, exhaust,switchMap, concatMap } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Directive({
    selector: '[appFacebookLogin]'
})
export class FacebookLoginDirective {


    @Input() facebookLogin: any;
    extras: any;
    appExtras:any = {
        selector:"appFacebookLogin",
        name:"facebookLogin" // the lowercase name of the directive
    }
    zChildren: any;
    subscriptions:Array<Subscription> = []
    group:any;
    ref:ChangeDetectorRef

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {
        //how you would get a host listener to run
    }


    ngOnInit() {
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        let {ryber}= this

        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {

        // // optional script loading
        let { scripts } = ryber.appCO0.metadata
        scripts = scripts.filter((x: any, i) => {
            return ["FB.js SDK"].includes(x.name)
        })
        let loadedScripts = Array.from(
            scripts.filter((x: any, i) => {
                return x.loaded !== "true"
            }),
            (x: any, i) => { return fromEvent(x.element, "load") }
        )
        // //

            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {ryber,zChildren,http}= this
                    //  work goes here
                    let  backendLogin = (devObj)=>{

                        let {result2} = devObj
                        return http.post(
                            env.backend.url,
                            JSON.stringify({
                                env:"loginFacebook",
                                user:encodeURI(result2.name)
                            }),
                            {
                                withCredentials:true,
                                headers:{
                                    "Content-Type":"text/plain"
                                }
                            }
                        )
                    }

                    // turn to observable

                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let target = Array.from(val.types['target'] || [])
                        let logOut = Array.from(val.types['logOut'] || [])

                        target
                        .forEach((y:any,j)=>{

                            let myTarget = zChildren[y]
                            // login
                            let clickEvent$ = fromEvent(myTarget.element,"click")
                            .pipe(
                                exhaustMap((ev:any) => {
                                    return from(new Promise(FB.login))
                                    .pipe(
                                        first(), // unsub from inner
                                        concatMap((result)=>{
                                            console.log(result)
                                        return from(new Promise((res,rej)=>{
                                            FB.api('/me',(response)=>{
                                                if(response?.error?.type === "OAuthException" ){
                                                    rej(response)
                                                }
                                                res(response)
                                            })
                                        }))
                                        .pipe(
                                            first(), // unsub from inner
                                            concatMap((result2:any)=>{
                                            return backendLogin({result2})
                                        }))
                                    }))


                                }),
                                catchError((err)=>{
                                    if(err?.message === "FB is not defined"){
                                        // try to login with availble cookies
                                        return http.post(
                                            env.backend.url,
                                            JSON.stringify({
                                                env:"refresh_page_Facebook"
                                            }),
                                            {
                                                withCredentials:true,
                                                headers:{
                                                    "Content-Type":"text/plain"
                                                }
                                            }

                                        )
                                        //
                                    }
                                    else if(err?.statusText === "Unknown Error"){
                                        alert("please check your internet connection")
                                    }
                                    else if(err?.error?.code === 2500){
                                        alert("Please login through the facebook popup")
                                    }
                                    return clickEvent$
                                })
                            )

                            let clickEvent  =clickEvent$
                            .subscribe({
                                next:(result:any)=>{
                                    if(result.message === "allow user to proceed"){

                                        //
                                        ryber.appCO0.metadata.facebookLogin.accessToken = result.token
                                        ryber.appCO0.metadata.facebookLogin.loginName = result.user
                                        ryber.appCurrentNav = "/picture"
                                        //
                                    }
                                },
                                catch:(err)=>{
                                    console.log(err)
                                    if(err.error = "Log In Again"){
                                        alert("please check your internet connection")
                                    }
                                }
                            })
                            //

                            val.subscriptions.push(clickEvent)
                        })


                        logOut
                        .forEach((y:any,j)=>{
                            let logOut = zChildren[y]


                            let clickEvent$ = fromEvent(logOut.element,"click")
                            .pipe(
                                exhaustMap(()=>{
                                    if(logOut.extras.appFacebookLogin.confirm !== "true"){
                                        clickEvent.unsubscribe()
                                        return of([])
                                    }
                                    return http.post(
                                        env.backend.url,
                                        {
                                            env:"logOutFacebook",
                                            user:ryber.appCO0.metadata.facebookLogin.loginName
                                        },
                                        {
                                            responseType:"text"
                                        }
                                    )
                                    .pipe(
                                        exhaustMap(()=>{
                                            return from(new Promise(FB.logout))
                                        })
                                    )
                                })
                            )

                            let clickEvent = clickEvent$
                            .subscribe({
                                next:(result:any)=>{
                                    console.log(result)
                                    // change the path
                                    ryber.appCO0.metadata.navigation.full.navigated = "true"
                                    ryber.appCurrentNav = "/home"
                                    //
                                },
                                error:(err:any)=>{
                                    console.log(err)
                                }
                            })
                            val.subscriptions.push(clickEvent)
                        })


                        subscriptions.push(...val.subscriptions)
                        //

                    })
                    //
                },
                loadedScripts
            })
        }

    }

    ngOnDestroy() {
        let {onDestroy} = judimaDirective
        onDestroy({
            myThis:this
        })

    }

}

