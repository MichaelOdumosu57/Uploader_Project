import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,authAE,base64ToBlob,judimaDirective } from '../customExports'
import { catchError, delay, first, take,retry,tap,timeout } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {photo as fakePhoto} from 'photo'



@Directive({
    selector: '[appPictureUpload]'
})
export class PictureUploadDirective {


    @Input() pictureUpload: any;
    extras: any;
    appExtras:any = {
        selector:"appPictureUpload",
        name:"pictureUpload" // the lowercase name of the directive
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


            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {ryber,ref,zChildren,http,extras,renderer2}= this
                    //  work goes here

                    let streamStarter = (devObj)=>{
                        let {zChildren}  = devObj
                        return (y:any,j)=>{


                            let video = zChildren[y]

                            video.element.srcObject = extras.stream
                            video.element.play()
                        }
                    }

                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let video = Array.from(val.types['video'] || [])
                        let confirm = Array.from(val.types['confirm'] || [])
                        let takePhoto = Array.from(val.types['takePhoto'] || [])
                        let loading = Array.from(val.types['loading'] || [])
                        if(extras.init !== "true" ){
                            extras.init ="true"

                            // get the mediaStream
                            from(navigator.mediaDevices.getUserMedia({ video: {
                                facingMode: { exact: "environment" }
                            }, audio: false }))
                            .pipe(
                                catchError(()=>{

                                    return from(
                                    navigator.mediaDevices.getUserMedia({
                                         video: true, audio: false
                                    })
                                    )
                                })
                            )
                            .subscribe({
                                next:(stream:any)=>{
                                    extras.stream = stream;
                                    video
                                    .forEach(streamStarter({
                                        zChildren
                                    }))
                                },
                                error:(err:any)=>{
                                    console.log("An error occurred: " + err);
                                }
                            })
                            //


                        }

                        takePhoto
                        .map((y:any,j)=>{
                            return [y,video[j],confirm[j]]
                        })
                        .forEach((y:any,j)=>{


                            let takePhoto = zChildren[y[0]]
                            let video = zChildren[y[1]]
                            let confirm  = zChildren[y[2]]
                            let captureEvent = fromEvent(
                                takePhoto.element,
                                "click"
                            )
                            .subscribe({
                                next:(result:any)=>{

                                    // take the photo and load it for for submission target
                                    // converting it from data url to its base binary

                                    let width = video .element.videoWidth
                                    let height = video.element.videoHeight ;
                                    let resultsCanvas = confirm.element.querySelector("canvas")
                                    let dims ={width,height}
                                    ;[video.element,resultsCanvas]
                                    .forEach((z:any,k)=>{

                                        ;["width","height"]
                                        .forEach((w:any,h)=>{

                                            renderer2
                                            .setAttribute(
                                                z,
                                                w,
                                                dims[w]
                                            )
                                        })
                                    })

                                    let context = resultsCanvas.getContext('2d')
                                    context.drawImage(video.element, 0, 0,
                                        resultsCanvas.width,
                                        resultsCanvas.height);
                                    let  photo = (resultsCanvas as HTMLCanvasElement).toDataURL('image/png');
                                    let  myBlob:Blob
                                    myBlob = base64ToBlob(photo,"image/png")
                                    // if(env.production){
                                    //     myBlob = base64ToBlob(photo,"image/png")
                                    // }
                                    // else{
                                    //     photo = fakePhoto[Math.floor(Math.random() * fakePhoto.length)];
                                    //     myBlob = base64ToBlob(photo,"image/png")
                                    // }
                                    takePhoto.extras.appPictureUpload.photo = myBlob
                                    confirm.css.display = "block"

                                    //
                                    // context.clearRect(0, 0, resultsCanvas.width, resultsCanvas.height);
                                    ref.detectChanges()
                                },
                                error:(err:any)=>{

                                }
                            })
                            val.subscriptions.push(captureEvent)



                        })

                        confirm
                        .map((y:any,j)=>{
                            return [y,takePhoto[j],loading[j]]
                        })
                        .forEach((y:any,j)=>{

                            let confirm = zChildren[y[0]]
                            let takePhoto = zChildren[y[1]]
                            let loading = zChildren[y[2]]

                            // disapprove changes
                            confirm.extras.options.back.click = ()=>{
                                confirm.css.display = "none"
                                let resultsCanvas = confirm.element.querySelector("canvas")
                                let context = resultsCanvas.getContext("2d")
                                context.clearRect(0, 0, resultsCanvas.width, resultsCanvas.height);

                                delete takePhoto.extras.appPictureUpload.photo
                            }
                            //

                            // approve changes
                            confirm.extras.options.submit.click = ()=>{
                                confirm.css.display = "none"
                                loading.css.display = "flex"

                                let myPackage :any = {}
                                confirm.extras.options.fields
                                .forEach((z:any,k)=>{
                                    if(z.name === "Group"){
                                        z.value =  ["",undefined].includes(z.value) ? "Defualt" : z.value
                                    }
                                    z.value =  ["",undefined].includes(z.value) ? "": z.value
                                    myPackage[z.name] =z.value
                                })
                                // console.log(myPackage)
                                myPackage.type = "picture"

                                // upload the photo to azure storage
                                    // upload data to database
                                    let sub2 = ()=>{
                                        ryber.authAS$({
                                            url:env.backend.storageContainerURL,
                                            type:"createBlob",
                                            method:"PUT",
                                            contentLength:takePhoto.extras.appPictureUpload.photo.size
                                        })
                                        .pipe(
                                            first(),
                                        )
                                        .subscribe({
                                            next:(result:any)=>{
                                                let url = result.url
                                                // console.log(result)
                                                http.put(
                                                    result.url,
                                                    takePhoto.extras.appPictureUpload.photo,
                                                    {
                                                        headers:result.headers,
                                                        // responseType:"text",
                                                        observe:"response"
                                                    }
                                                )
                                                .pipe(
                                                    first()
                                                )
                                                .subscribe({
                                                    next:(result:any)=>{
                                                        // you get empty response body
                                                            // replace actual photo blob with url
                                                            // upload data to amazon sql database
                                                        myPackage.photo = url
                                                        myPackage.name = ryber.appCO0.metadata.facebookLogin.loginName
                                                        http.post(
                                                            env.backend.url,
                                                            {
                                                                env:"upload",
                                                                result:myPackage,
                                                                access_token:ryber.appCO0.metadata.facebookLogin.accessToken,
                                                                user:ryber.appCO0.metadata.facebookLogin.loginName

                                                            },
                                                            {
                                                                observe:"response",
                                                                responseType:"text"
                                                            }
                                                        )
                                                        .pipe(
                                                            tap(()=>{
                                                                loading.css.display = "none"
                                                                ref.detectChanges()
                                                            })
                                                        )
                                                        .subscribe({
                                                            next:(result:any)=>{
                                                                alert("Information Uploaded Sucessfully")
                                                                console.log(result)
                                                            },
                                                            error:(err:any)=>{
                                                                console.log(err)
                                                            }
                                                        })
                                                        //
                                                        //

                                                    },
                                                    error:(err:any)=>{
                                                        let myXml:XMLDocument = parseXml(err.error)


                                                        if(myXml.querySelector("Code").innerHTML === "AuthorizationFailure"){
                                                            alert("the image failed to upload contact support")
                                                        }


                                                        // the container doesnt exist create and try again
                                                        else if(myXml.querySelector("Code").innerHTML === "ContainerNotFound"){
                                                            ryber.authAS$({
                                                                url:env.backend.storageURL + "mycontainer?restype=container",
                                                                type:"createContainer",
                                                                method:"PUT"
                                                            })
                                                            .pipe(
                                                                first()
                                                            )
                                                            .subscribe({
                                                                next:(result:any)=>{
                                                                    http.put(
                                                                        env.backend.storageURL + "mycontainer?restype=container",
                                                                        "",
                                                                        {
                                                                            params:{

                                                                            },
                                                                            headers:result.headers,
                                                                            responseType:"text"
                                                                        }
                                                                    )
                                                                    .subscribe({
                                                                        next:(result:any)=>{
                                                                            sub2()
                                                                        },
                                                                        error:(err:any)=>{

                                                                        }
                                                                    })
                                                                },
                                                                error:(err:any)=>{

                                                                }
                                                            })
                                                        }

                                                        //
                                                    }
                                                })
                                            },
                                            error:(err:any)=>{

                                            }
                                        })

                                    }
                                    sub2()
                                //

                            }
                            //
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

        // for navigation so  the directive knows to restart the media stream
        try{
            this.extras.init = "false"
        }
        catch(e){}
        //
    }

}

