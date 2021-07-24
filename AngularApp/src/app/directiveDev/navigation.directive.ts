import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appNavigation]'
})
export class NavigationDirective {


    @Input() navigation: any;
    extras: any;
    appExtras:any = {
        selector:"appNavigation",
        name:"navigation" // the lowercase name of the directive
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
                    let {ryber,zChildren}= this
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let directLink = Array.from(val.types['directLink'] || [])

                        directLink
                        .forEach((y:any,j)=>{

                            let anchorEvent = fromEvent(
                                zChildren[y].element,
                                "click"
                            )
                            .subscribe((result:any)=>{

                                try {
                                    // change the path
                                    ryber.appCO0.metadata.navigation.full.navigated = "true"
                                    ryber.appCurrentNav = "/"+zChildren[y].extras.appNavigation.group
                                    //
                                } catch (error) {

                                }
                            })
                            subscriptions.push(anchorEvent)
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

