import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,judimaDirective } from '../customExports'
import { catchError, delay, first, take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Directive({
    selector: '[appAttribute]'
})
export class AttributeDirective {


    @Input() attribute: any;
    extras: any;
    appExtras:any = {
        selector:"appAttribute",
        name:"attribute" // the lowercase name of the directive
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
            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {zChildren,ryber,renderer2} = this
                    let {co}= this.extras
                    //  work goes here
                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let target = Array.from(val.types['target'] || [])


                        target
                        .forEach((y:any,j)=>{

                            let {attrObject} = zChildren[y].extras.appAttribute.options

                            let updater = ryber[co].metadata.attribute.current
                            .subscribe({
                                next:(result:any)=>{
                                    if(result.symbol === y){
                                        Object.entries(result.attrObject)
                                        .forEach((z:any,k)=>{
                                            renderer2.setAttribute(
                                                zChildren[y].element,
                                                z[0],
                                                z[1]
                                            )
                                            

                                        })
                                    }
                                },
                                error:(err:any)=>{

                                }
                            })
                            val.subscriptions.push(updater)


                            ryber[co].metadata.attribute.current.next({
                                symbol:y,
                                attrObject
                            })

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
            myThis:this
        })

    }

}

