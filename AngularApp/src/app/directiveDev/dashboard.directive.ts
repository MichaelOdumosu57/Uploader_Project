import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, expand, first, take,retry } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appDashboard]'
  })
  export class DashboardDirective {


    @Input() dashboard: any;
    extras: any;
    appExtras:any = {
        selector:"appDashboard",
        name:"dashboard" // the lowercase name of the directive
    }
    zChildren: any;
    subscriptions:Array<Subscription> = []
    group:any;
    ref:ChangeDetectorRef

    constructor(
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }




    ngOnInit() {
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {

        // optional script loading
        // let { scripts } = ryber.appCO0.metadata
        // scripts = scripts.filter((x: any, i) => {
        //     return ["ParticlesJS"].includes(x.name)
        // })
        // let loadedScripts = Array.from(
        //     scripts.filter((x: any, i) => {
        //         return x.loaded !== "true"
        //     }),
        //     (x: any, i) => { return fromEvent(x.element, "load") }
        // )
        //

            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {ryber,ref,zChildren,http,extras,renderer2}= this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let main = Array.from(val.types['main'] || [])
                        let expander = Array.from(val.types['expander'] || [])
                        let photoExpander = Array.from(val.types['photoExpander'] || [])
                        let textExpander = Array.from(val.types['textExpander'] || [])
                        let close = Array.from(val.types['close'] || [])



                        main
                        .forEach((y:any,j)=>{

                            let myMain = zChildren[y]

                            // make an XHR for everything in the table
                            if(extras.init !== "true"){
                                let cleanse = Object.entries({
                                    "my_type":"Type",
                                    "my_group":"Group",
                                    "photo":"Photo",
                                    "Total_Amount":"Total",
                                    "my_date":"Date",
                                    "Merchant_Name":"Merchant Name",
                                    "Merchant_Address":"Merchant Address",
                                    "Merchant_Phone":"Merchant Phone",
                                })
                                extras.init = "true"
                                http.post(
                                    env.backend.url,
                                    {
                                        env:"dashboard",
                                        type:"getAll",
                                        user:this.ryber.appCO0.metadata.facebookLogin.loginName,
                                        access_token:this.ryber.appCO0.metadata.facebookLogin.accessToken
                                    },
                                    {
                                        // responseType:"text"
                                    }
                                )
                                .pipe(
                                    first(),
                                    // retry(2),
                                    catchError(ryber.unauthenticated)
                                )
                                .subscribe({
                                    next:(result:any)=>{
                                        // filter the names as appropriate
                                        result
                                        .forEach((z:any,k)=>{
                                            cleanse
                                            .forEach((w:any,h)=>{
                                                z[w[1]] = z[w[0]]
                                                delete z[w[0]]
                                            })

                                        })
                                        //



                                        myMain.extras.options.value.push(...result)
                                        myMain.element.totalRecords = myMain.extras.options.value.length
                                        ref.detectChanges()
                                    },
                                    error:(err:any)=>{
                                    }
                                })
                            }
                            //

                            // attach the expanders needed for image
                            myMain.extras.options.main = y
                            myMain.extras.options.expander = expander
                            myMain.extras.options.photoExpander = photoExpander
                            myMain.extras.options.textExpander = textExpander
                            //
                        })

                        close
                        .forEach((y:any,j)=>{

                            let close = zChildren[y]
                            let clickEvent = fromEvent(close.element,"click")
                            .subscribe({
                                next:(result:any)=>{
                                    [...expander,...photoExpander,...textExpander]
                                    .forEach((z:any,k)=>{
                                        zChildren[z].css.display = "none"
                                    })
                                    ref.detectChanges()
                                },
                                error:(err:any)=>{

                                }
                            })
                            val.subscriptions.push(clickEvent)

                        })
                        subscriptions.push(...val.subscriptions)
                        //



                    })
                    //
                },
                // loadedScripts
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

