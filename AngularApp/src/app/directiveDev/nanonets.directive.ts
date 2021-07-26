import { Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy, navigationType,authAE,base64ToBlob,judimaDirective } from '../customExports'
import { catchError, delay, first, take,map, retryWhen,retry, mergeMap, tap } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {photo as fakePhoto} from 'photo'


@Directive({
    selector: '[appNanonets]'
})
export class NanonetsDirective {


    @Input() nanonets: any;
    extras: any;
    appExtras:any = {
        selector:"appNanonets",
        name:"nanonets" // the lowercase name of the directive
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

            //
            onInit({
                myThis:this,
                featureFn:(devObj)=>{
                    let {group,subscriptions} = devObj
                    let {ryber,ref,zChildren,http,extras,renderer2}= this
                    //  work goes here

                    let streamStarter = (devObj)=>{
                        let {zChildren}  = devObj
                        return (y:any,j)=>{


                            let video = zChildren[y[0]]

                            video.element.srcObject = extras.stream
                            video.element.play()
                        }
                    }


                    Object.entries(group)
                    .forEach((x:any,i)=>{
                        let key = x[0]
                        let val = x[1]

                        let submit  = Array.from(val.types['submit'] || [])
                        let confirm = Array.from(val.types['confirm'] || [])
                        let video = Array.from(val.types['video'] || [])
                        let takePhoto = Array.from(val.types['takePhoto'] || [])
                        let canvas = Array.from(val.types['canvas'] || [])
                        let showCamera = Array.from(val.types['showCamera'] || [])
                        let loading = Array.from(val.types['loading'] || [])



                        if(extras.init !== "true" && canvas.length !== 0){
                            extras.init ="true"

                            let a :MediaStreamConstraints
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
                                    .map((y:any,j)=>{
                                        return [y,canvas[j]]
                                    })
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

                        showCamera
                        .map((y:any,j)=>{
                            return [y,video[j],takePhoto[j]]
                        })
                        .forEach((y:any,j)=>{
                            let showCamera = zChildren[y[0]]
                            let video = zChildren[y[1]]
                            let takePhoto = zChildren[y[2]]


                            let showCameraSub = fromEvent(
                                showCamera.element,
                                "click"
                            )
                            .subscribe({
                                next:(result:any)=>{
                                    video.css.display = "block"
                                    delete takePhoto.extras.appNanonets.photo
                                    takePhoto.innerText.item = "Take Photo"
                                    ref.detectChanges()
                                },
                                error:(err:any)=>{

                                }
                            })
                            val.subscriptions.push(showCameraSub)
                        })


                        takePhoto
                        .map((y:any,j)=>{
                            return [y,canvas[j],video[j]]
                        })
                        .forEach((y:any,j)=>{

                            if(canvas.length !== 0){

                                let takePhoto = zChildren[y[0]]
                                let canvas = zChildren[y[1]]
                                let video = zChildren[y[2]]
                                let captureEvent = fromEvent(
                                    takePhoto.element,
                                    "click"
                                )

                                .subscribe({
                                    next:(result:any)=>{

                                        // take the photo and load it for for submission target
                                        // converting it from data url to its base binary
                                        takePhoto.innerText.item = "Taking photo ..."
                                        let width = video .element.videoWidth
                                        let height = video.element.videoHeight ;
                                        let dims ={width,height}
                                        ;[video,canvas]
                                        .forEach((z:any,k)=>{

                                            ;["width","height"]
                                            .forEach((w:any,h)=>{

                                                renderer2
                                                .setAttribute(
                                                    z.element,
                                                    w,
                                                    dims[w]
                                                )
                                            })
                                        })
                                        let context = canvas.element.getContext('2d')
                                        context.drawImage(video.element, 0, 0,
                                            canvas.element.width,
                                            canvas.element.height);
                                        let  photo = (canvas.element as HTMLCanvasElement).toDataURL('image/png');
                                        let  myBlob = base64ToBlob(photo,"image/png")
                                        takePhoto.extras.appNanonets.photo = myBlob
                                        // hold on to binary
                                        let base64Binary = photo.split("data:image/png;base64,")[1]
                                        takePhoto.extras.appNanonets.photoBinary = atob(base64Binary)
                                        //

                                        let takeAgainSub = of([])
                                        .pipe(delay(1000),first())
                                        .subscribe({
                                            next:(result:any)=>{
                                                takePhoto.innerText.item = "Take Again?"
                                                ref.detectChanges()
                                            },
                                        })
                                        val.subscriptions.push(takeAgainSub)

                                        // context.clearRect(0, 0, canvas.element.width, canvas.element.height);
                                        video.css.display = "none"
                                        ref.detectChanges()
                                    },
                                    error:(err:any)=>{

                                    }
                                })
                                val.subscriptions.push(captureEvent)
                            }

                        })

                        confirm
                        .map((y:any,j)=>{
                            return [y,submit[j],takePhoto[j],loading[j]]
                        })
                        .forEach((y:any,j)=>{

                            let confirm = zChildren[y[0]]
                            let submit = zChildren[y[1]]
                            let takePhoto = zChildren[y[2]]
                            let loading = zChildren[y[3]]
                            // disapprove changes
                            confirm.extras.options.back.click = ()=>{
                                confirm.css.display = "none"
                                delete takePhoto.extras.appNanonets.photo
                            }
                            //

                            // approve changes
                            confirm.extras.options.submit.click = ()=>{
                                confirm.css.display = "none"
                                loading.css.display = "flex"

                                let myPackage :any= {}

                                // package changes
                                confirm.extras.options.fields
                                .forEach((z:any,k)=>{
                                    if(z.name === "Group"){
                                        z.value = z.value === "" ? "Defualt" : z.value
                                    }
                                    z.value =  z.value === "" ? "": z.value
                                    myPackage[z.name] =z.value
                                })
                                myPackage.photo = takePhoto.extras.appNanonets.photo
                                delete takePhoto.extras.appNanonets.photo
                                myPackage.type = "scan"
                                myPackage.name = ryber.appCO0.metadata.facebookLogin.loginName
                                //

                                // upload data to amazon sql database
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
                                    retry(2),
                                    catchError(ryber.unauthenticated),
                                    tap(()=>{
                                        loading.css.display = "none"
                                        ref.detectChanges()
                                    })
                                )
                                .subscribe({
                                    next:(result:any)=>{
                                        alert("Information Sucessfully Uploaded")
                                        console.log(result)
                                    },

                                })
                                //
                            }
                            //
                        })

                        submit
                        .map((y:any,j)=>{
                            return [y,confirm[j],takePhoto[j],loading[j]]
                        })
                        .forEach((y:any,j)=>{

                            let submit = zChildren[y[0]]
                            let confirm = zChildren[y[1]]
                            let takePhoto = zChildren[y[2]]
                            let loading = zChildren[y[3]]

                            let clickEvent = fromEvent(
                                submit.element,
                                "click"
                            )

                            .subscribe({
                                next:(result:any)=>{


                                    loading.css.display = "flex"
                                    ref.detectChanges()
                                    // check if there is a taken photo
                                    // let photo = fakePhoto[Math.floor(Math.random() * fakePhoto.length)];
                                    if(!takePhoto.extras.appNanonets.photo){

                                        // dev
                                        // takePhoto.extras.appNanonets.photo = base64ToBlob(photo,"image/png")

                                        // prod
                                        alert('Please place a receipt in the webcam to take a photo')
                                        loading.css.display = "none"
                                        ref.detectChanges()
                                        return
                                    }
                                    //

                                    // upload the photo to azure SQL storage
                                    let sub2 = ()=>{

                                        // dev
                                        // takePhoto.extras.appNanonets.photo = base64ToBlob(photo,"image/png")
                                        let createBlobHeaderSub = ryber.authAS$({
                                            url:env.backend.storageContainerURL,
                                            type:"createBlob",
                                            method:"PUT",
                                            contentLength:takePhoto.extras.appNanonets.photo.size
                                        })
                                        .pipe(
                                            first()
                                        )
                                        .subscribe({
                                            next:(result:any)=>{
                                                let url = result.url
                                                // console.log(result)
                                                let createBlobHeader =http.put(
                                                    result.url,
                                                    takePhoto.extras.appNanonets.photoBinary,
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
                                                        // console.log(url)
                                                        takePhoto.extras.appNanonets.photo  = url
                                                        //

                                                        // grab the uploaded photo and send to the OCR api
                                                        let receiptOCRSub = http.post(
                                                            env.backend.url,
                                                            {
                                                                env:"receiptOCR",
                                                                receiptURL:url,
                                                                access_token:ryber.appCO0.metadata.facebookLogin.accessToken,
                                                                user:ryber.appCO0.metadata.facebookLogin.loginName

                                                            }
                                                        )
                                                        .pipe(
                                                            first(),
                                                            retry(2),
                                                            catchError(ryber.unauthenticated),
                                                            tap(()=>{
                                                                loading.css.display = "none"
                                                                ref.detectChanges()
                                                            })
                                                        )
                                                        .subscribe({
                                                            next:(result:any)=>{



                                                                // show the confirmation dialog
                                                                confirm.css.display = "block"
                                                                confirm.extras.options.fields
                                                                .forEach((z:any,k)=>{
                                                                    let myValue = result
                                                                    .filter((w:any,h)=>{
                                                                        return w.label === z.name
                                                                    })[0]
                                                                    z.value = myValue?.ocr_text || ""

                                                                })
                                                                //

                                                                ref.detectChanges()
                                                            },
                                                            error:(err:any)=>{

                                                            }
                                                        })
                                                        val.subscriptions.push(receiptOCRSub)
                                                        //
                                                    },
                                                    error:(err:any)=>{
                                                        let myXml:XMLDocument = parseXml(err.error)

                                                        // the container doesnt exist create and try again
                                                        if(
                                                            myXml.querySelector("Code")?.innerHTML === "ContainerNotFound" ||
                                                            err?.error?.message === "Issue" ||
                                                            err?.name === "TimeoutError"
                                                        ){
                                                            let createContainerHeaderSub =ryber.authAS$({
                                                                url:env.backend.storageContainerURL + "?restype=container",
                                                                type:"createContainer",
                                                                method:"PUT"
                                                            })
                                                            .pipe(
                                                                first()
                                                            )
                                                            .subscribe({
                                                                next:(result:any)=>{
                                                                    let createContainerSub =http.put(
                                                                        env.backend.storageContainerURL + "?restype=container",
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
                                                                            // sub2()
                                                                        },
                                                                        error:(err:any)=>{

                                                                        }
                                                                    })
                                                                    val.subscriptions.push(createContainerSub)
                                                                },
                                                                error:(err:any)=>{

                                                                }
                                                            })
                                                            val.subscriptions.push(createContainerHeaderSub)
                                                        }

                                                        if(myXml.querySelector("Code")?.innerHTML === "AuthorizationFailure" || true){
                                                            alert("the image failed to upload contact support")
                                                            loading.css.display = "none"
                                                            ref.detectChanges()
                                                        }


                                                        //
                                                    }
                                                })
                                                val.subscriptions.push(createBlobHeader)
                                            },
                                            error:(err:any)=>{

                                            }
                                        })
                                        val.subscriptions.push(createBlobHeaderSub)

                                    }
                                    sub2()
                                    //




                                },
                                error:(err:any)=>{
                                    alert('Please place a receipt in the webcam to take a photo')
                                },
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
        // for navigation so  the directive knows to restart the media stream
        try{
            this.extras.init = "false"
        }
        catch(e){}
        //

    }

}

