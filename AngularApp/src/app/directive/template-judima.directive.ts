import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest,Observable } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appTemplate]'
})
export class TemplateDirective {


    @Input() template: any;
    extras: any;
    appExtras:any = {
        selector:"appTemplate",
        name:"template" // the lowercase name of the directive
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


    @HostListener('click') onClick() {
        //how you would get a host listener to run
    }


    ngOnInit() {
        this.extras = this[this.appExtras.name]
        let {onInit} = judimaDirective
        if (this.extras?.confirm === 'true' && this.extras?.type.includes("body")) {

        // optional script loading
        // let loadedScripts:Array<Observable<Event>> = this.ryber.appGetScripts({
        //     scriptStrings:["tsParticles"]
        // })
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

                        let username = Array.from(val.types['username'] || [])
                        let password = Array.from(val.types['password'] || [])
                        let submit   = Array.from(val.types['submit'] || [])


                        // username
                        // .forEach((y:any,j)=>{
                        //     // take some action

                        //     //
                        // })


                        // submit
                        // .forEach((y:any,j)=>{
                        //     // take some action
                        //     val.subscriptions.push(of[])
                        //     //
                        // })
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

