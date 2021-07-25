import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest,Observable } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take,skip, filter, distinct, distinctUntilChanged, map } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appParticlesJS]'
})
export class ParticlesJSDirective {


    @Input() particlesjs: any;
    extras: any;
    appExtras:any = {
        selector:"appParticlesJS",
        name:"particlesjs" // the lowercase name of the directive
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


    ngOnInit() {
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {


            // optional script loading
            let loadedScripts:Array<Observable<Event>> = this.ryber.appGetScripts({
                scriptStrings:["tsParticles"]
            })
            loadedScripts.push(this.ryber.appCO0.metadata[this.appExtras.name].ngOnDestroy)
            //


            onInit({
                myThis:this,
                loadedScripts,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {zChildren,ryber,ref,appExtras} = this
                    let {co} = this.extras

                    //  work goes here
                Object.entries(group)
                .forEach((x:any,i)=>{
                    let key = x[0]
                    let val = x[1]

                    let target = Array.from(val.types['target'] || [])
                    let stretchTo = Array.from(val.types['stretchTo'] || [])


                    target
                    .forEach((y:any,j)=>{

                        // initalize the canvas with particles
                        tsParticles.load(
                            zChildren[y].extras.appParticlesJS.options.id,
                            zChildren[y].extras.appParticlesJS.options
                        )
                        //



                        let myStretch$ = ryber.appCO0.metadata.particlesjs.current
                        .pipe(

                            filter((z:any,k)=>{

                                // if these are undefined dont snap the observable
                                return z.top && z.height && z.co
                                //
                            }),

                            distinctUntilChanged((prev:any,curr:any)=>{

                                return prev.top + prev.height ===
                                        curr.top + curr.height
                            }),
                        )



                        let myStretch = myStretch$
                        .subscribe({
                            next:(result:any)=>{
                                // console.log(result)
                                if( result.parsed === "false"){
                                    result.top = numberParse(result.top)
                                    result.height = numberParse(result.height)
                                    delete result.parsed
                                }
                                // console.log(myStretch$,myStretch)
                                let myTop = result.top
                                let myHeight = result.height
                                // console.log(myTop + myHeight,result.co)
                                if(myTop + myHeight > 1000 ){
                                    zChildren[y].css.height = (myTop + myHeight + 100).toString() + "px"
                                }
                                else{
                                    zChildren[y].css.height = "1000px"
                                }
                                ref.detectChanges()
                            },
                            error:(err:any)=>{

                            }
                        })
                        val.subscriptions.push(myStretch)
                        //

                    })


                    stretchTo
                    .forEach((y:any,j)=>{

                        let stretchTo = zChildren[y]
                        let myOptions = stretchTo.extras.appParticlesJS.options
                        let {mediaQuery} = ryber.appCO0.metadata.ryber.sectionDefault.app.width
                        ryber.appCO0.metadata.particlesjs.current
                        .next({
                            top:   (myOptions ?.[mediaQuery]?.topValue    ? myOptions ?.[mediaQuery]?.topValue.toString()+"px" : undefined) ||   zChildren[y].css.top   ,
                            height:(myOptions?.[mediaQuery] ?.heightValue ? myOptions?.[mediaQuery] ?.heightValue.toString()+"px" : undefined) || zChildren[y].css.height  ,
                            parsed:"false",
                            co
                        })

                        let resizeEvent = fromEvent(window,"resize")

                        .subscribe({
                            next:(result:any)=>{
                                // console.log(co)
                                let {mediaQuery} = ryber.appCO0.metadata.ryber.sectionDefault.app.width
                                ryber.appCO0.metadata.particlesjs.current
                                .next({
                                    top:   myOptions ?.[mediaQuery]?.topValue ||     numberParse(zChildren[y].css.top   ),
                                    height:myOptions?.[mediaQuery] ?.heightValue || numberParse(zChildren[y].css.height),
                                    co,
                                })
                            },
                            error:(err:any)=>{

                            }
                        })
                        val.subscriptions.push(resizeEvent)
                    })

                    subscriptions.push(...val.subscriptions)


                })
                    //
                }
            })
        }

    }

    ngOnDestroy() {
        let {onDestroy} = judimaDirective
        onDestroy({
            myThis:this,
        })

    }

}


