import { Component, OnInit, OnDestroy, ViewChildren, Inject, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2, QueryList } from '@angular/core';
import { RyberService } from './ryber.service';
import { fromEvent, Subject, Observable, of, Subscription, interval, ReplaySubject, BehaviorSubject, combineLatest, merge, from } from 'rxjs';
import { eventDispatcher, esInit, coInit } from './customExports'
import { catchError, take, timeout, debounceTime, tap, first,delay,concatMap, exhaustMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import website from './website';



declare global {
    interface Window { Modernizr: any;createMap:any }
    // globals add your own in dev additions
    // not let or else local to this file
    var gapi: any
    var google:any
    var Modernizr: any
    var SignaturePad: any
    var Pikaday: any
    var  VanillaTilt:any
    var gsap:any
    //

    // dev addtitions
    var tsParticles
    var FB
    var AzureStorage
    var parseXml
    var myPhoto
    //

}

@Component({
    selector: 'app-root',
    templateUrl:    './app.component.html',
    // styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        public ryber: RyberService,
        private ref: ChangeDetectorRef,
    ) { }

    title = 'Judima';
    CO$: Subscription
    subscriptions:Array<Subscription> = []
    @ViewChildren('myTemp', {read:ElementRef}) templateMyComponents: QueryList<ElementRef>;


    ngOnInit() {
        if (env.component.app.lifecycleHooks) {console.log('app ngOnInit fires on mount ')}
        let {ryber,subscriptions,ref} = this
		ryber.ref = (()=>{
			return ref
		})()

        // adding scripts
        ryber.appCO0.metadata.scripts.push(
            ...ryber.appAddScripts({
                scripts:[
					{
						src:"https://cdnjs.cloudflare.com/ajax/libs/tsparticles/1.26.3/tsparticles.min.js",
						name:"tsParticles",
						integrity:"sha512-f5U3LCj0YmFWHJ+I5vljqpT2RIGQic48+79y0V/fiJ60KX/s/xiZWQ/Zw8elJHpEdTPFa/5rtVil337IJwg4EA==",
                        crossorigin:"anonymous",
						defer:"true",
                        placement:{
                            appendChild:document.body
                        }
					},
					{
						src:"https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0&appId=749733915701523&autoLogAppEvents=1",
						name:"FB.js SDK",
                        intregity:"sha256-1x/wlpsdafW6TS+0WPyfZbFQ3r2/sklAEyCAmaHJ7pw=",
                        crossorigin:"anonymous",
						defer:"false",
                        async:"false",
                        nonce:"LZH6OkJE",
                        placement:{
                            appendChild:document.body
                        }
					},
                ].filter((x:any,i)=>{
                    return x !== null
                })
            })
        )
        //


        /* App Setup*/
        esInit(ryber, ryber.appCO0.metadata.ES)


        this.CO$ = merge(
            ...ryber.appCO0.metadata.CO.map((x, i) => {
                return this.ryber[x.valueOf()]
            })
        )
        .subscribe((coArray: any) => {
            coInit(
                ryber,
                coArray,
                ((devObj) => {
                    let { co } = devObj

                    // dev additions
                    if(["overlay"].includes(co.quantity[1][1].signature)){
                        co.quantity[0][0].ngCss[0][0]["z-index"] = 0
                    }
                    //
                    co.metadata.judima = {
                        desktop:{
                            stack:{
                                keep:null
                            },
                            xContain:{
                                align:null
                            }
                        },
                        init:"false"
                    }
					co.metadata.board = {}
                    co.metadata.formData = {}
                    co.metadata.refresh = {}
                    co.metadata.latch = {
                        updateZChild : new ReplaySubject<any>(),
                        zChild:{},
                        falseDestroy:[],
                        display:{
                            suffix:"display_",
                            deltaNode:{}
                        }
					}
                    co.metadata.deltaNode = {
						updateZChild : new Subject<any>(),
						groups:{},
						current:null,
						component:{
							confirm:"false"
						},
                        falseDestroy:[]

                    }
                    co.metadata.section = {
                        mediaQuery:null
                    }
                    co.metadata.navigation ={
                        groups:{},

                        // zChild specifc
                        group:{},
                        suffix:"_nav_"
                        //
                    }
					co.metadata.nest= {
						groups:{}
					}

                    // I rather use group than groups the extra s can be misleading
                    // add your own in dev addtions
                    co.metadata.templateDirective = {
                        group:{},
                        suffix:"_tD_"
                    }
                    co.metadata.visible = {
                        group:{},
                        suffix:"_vI_"
                    }
                    co.metadata.vanillaTilt = {
                        group:{},
                        suffix:"_vT_"
                    }
                    co.metadata.components = {
                        group:{},
                        suffix:"_vT_"
                    }
                    co.metadata.attribute = {
                        group:{},
                        suffix:"_attr_",
                        current:new Subject<any>()
                    }
                    //


                    // dev additions
                    co.metadata.nanonets = {
                        group:{},
                        suffix:"_nn_"
                    }
                    co.metadata.particlesjs = {
                        group:{},
                        suffix:"_li_"
                    }
                    co.metadata.facebookLogin = {
                        group:{},
                        suffix:"_fb_"
                    }
                    co.metadata.pictureUpload = {
                        group:{},
                        suffix:"_pu_"
                    }
                    co.metadata.dashboard = {
                        group:{},
                        suffix:"_db_"
                    }
                    //


                    co.metadata.zChildrenSubject = new Subject<any>()
                    .pipe(
                        tap((val) => {
							co.metadata.zChildren = val.directivesZChild
							co.metadata.templateMyElements = val.templateMyElements
							co.metadata.ref = val.ref
                            co.metadata.zChildren$ = of(val.directivesZChild)
                        }),
                    )
                    co.metadata.ngAfterViewInitFinished = new Subject<any>()
                })
            )
        })
        subscriptions.push(this.CO$)

        if (ryber.appReloaded === 'true') {


            ryber.appCurrentNav = ryber.appCO0.metadata.navigation.full.startURL


        }

        subscriptions.push(
            // we can say concatMap to add more logic before we decide on navigation
            ryber.appViewComplete
            // .pipe(
            //     concatMap(()=>{
            //         return of([])
            //     })
            // )
            .subscribe(() => {


            if (window.name === '') {


                window.name = '/'


            }


            if (this.ryber.appReloaded !== 'true') {


                window.name = this.ryber.appCurrentNav


            }


            // async the navigation
            if(ryber.appCO0.metadata.navigation.type === "full"){



                if (
                    ryber.appViewNavigation.routes[ryber.appCurrentNav].size ===ryber.appViewNavigation.routeLengths[ryber.appCurrentNav]
                ) {


                    // check the components on the DOM, only fires when components are mounted
                        // srry to use the DOM here but we have to check since we tried listening to no avail
                    Array.from(ryber.appViewNavigation.routes[ryber.appCurrentNav])
                    .forEach((x:any,i)=>{
                        if(document.querySelector("."+x)){
                            ryber.appViewCompleteArray.push(x)
                        }
                    })
                    //



                    this.routeDispatch({
                        arr: Array.from(ryber.appViewNavigation.routes[ryber.appCurrentNav]).sort(),
                    })


                    // console.log(ryber.appViewNavigation.routes)
                }
            }

            else if(ryber.appCO0.metadata.navigation.type === "SPA"){
                this.routeDispatch({
                    arr: [...ryber["formCO"]].sort(),
                })
            }
            //




            })
        )

	}

    routeDispatch(
        devObj: {
            arr: Array<any>
        }
    ) {
        let { arr } = devObj
        arr = arr.sort()
        this.ryber.appViewCompleteArray = this.ryber.appViewCompleteArray.sort()

        if (
            arr
            .filter((x, i) => {
                return this.ryber.appViewCompleteArray[i] !== x
            }).length === 0 &&
            arr.length === this.ryber.appViewCompleteArray.length
        ) {


            // window.onload  sometimes the elements dont resize prorply, dispatch when the window is fully loaded
            // might need a delay
            // it needs to fire twice for some reason
            eventDispatcher({
                element: window,
                event: 'resize'
            })
            // eventDispatcher({
            //     element: window,
            //     event: 'resize'
            // })


            this.ryber.appViewCompleteArray = []
            // not perfect find a better way to wait for the route to initalize before modifying this value

            //


            if (this.ryber.appReloaded === 'true') {


                this.ryber.appReloaded = 'false'


            }


        }

	}

	ngAfterViewInit(){
        if (env.component.app.lifecycleHooks) {console.log('app ngAfterViewInit fires on mount ')}
		let {templateMyComponents,ryber,subscriptions} = this
        let {http} = ryber

        // listen for route changes
        subscriptions.push(
            templateMyComponents.changes
            .subscribe((result:any)=>{
                ryber.appCO0.metadata.navigation.full.navigated = "false"
            })
        )
        //

        // dev additions

        // fetch
            // we also need to grab the access token from Facebook to log out properly
        let loadedScripts:Array<Observable<Event>> = ryber.appGetScripts({
            scriptStrings:["FB.js SDK"]
        })

        combineLatest(loadedScripts)
        .pipe(
            concatMap(()=>{
                // need this because you need the FB auth token
                return from(new Promise(FB.login))

                .pipe(
                    concatMap((result)=>{
                        console.log(result)
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
                    })
                )
            })
        )

        .subscribe({
            next:(result:any)=>{
                ryber.appCO0.metadata.facebookLogin.loginName = decodeURI(result.user)
                ryber.appCO0.metadata.facebookLogin.accessToken = result.token
                ryber.appCurrentNav = "/picture"
            },
            error:(err:any)=>{

            }
        })
        //
	}

    ngOnDestroy() {
        if (env.component.app.lifecycleHooks){ console.log('app ngOnDestroy fires on dismount')}
        this.subscriptions
        .forEach((x: any, i) => {
            try{
                x.unsubscribe()
            }
            catch(e){}

        })
        delete this.subscriptions
    }


}




