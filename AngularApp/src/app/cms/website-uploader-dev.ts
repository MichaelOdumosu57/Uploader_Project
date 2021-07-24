import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, pipe, ReplaySubject } from "rxjs";
import { environment as env } from "../../environments/environment";
import {objectCopy,zProtoComponent,zProtoChildren, zChildren, xContain, xPosition,latchUtilities} from '../customExports'


let website:any = {}

let homeDev = [
    {
        title:"home",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["home"],
                    confirm:"true",
                    type:["body"]
                },

                options:{
                    extras:{
                        appSection:{
                            confirm:"true"
                        },
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appParticlesJS:{
                            confirm:"true",
                            type:["body"]
                        }
                    }

                }
            },
            {
                key:"link a_p_p_Link",
                type:"anchor",
                value:"Login",
                left:1050,
                options:{
                    extras:{
                        appNavigation:{
                            type:["directLink"],
                            group:"login"
                        }
                    }
                }
                // top:250
            },
            {
                key:"title a_p_p_Title",
                type:"title",
                value:"Welcome to the Uploader Site",
                left:150,
                top:250
            },
            {
                key:"subtitle a_p_p_SubTitle",
                type:"sub-heading",
                value:"Upload your documents or proof of work here",
                left:250,
                split:6,
                next:"true",
                options:{
                    extras:{
                        appParticlesJS:{
                            type:["stretchTo"]
                        }
                    }
                }
            }
        ]
    },
    {
        title:"overlay",
        metafields:[
            {
                "key":"body",
                type:"body",
                navigation:{
                    name:["home","login","scan","picture","dashboard"]
                },
                nest:{
                    group:[
                        {
                            name:"overlay",
                            type:"regular"
                        }
                    ]
                },

                options:{
                    css:{
                        height:"0px"
                    },
                    extras:{
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appParticlesJS:{
                            confirm:"true",
                            type:["body"]
                        }
                    }
                }
            },

            {
                key:"main-overlay a_p_p_MainOverlay",
                type:"canvas",

                options:{
                    css:{
                        height:"1000px"
                    },
                    extras:{
                        appAttribute:{
                            type:["target"],
                            options:{
                                attrObject:{
                                    id:"main-overlay"
                                }
                            }
                        },
                        appParticlesJS:{
                            type:["target"],
                            options:{
                                id:"main-overlay",
                                particles: {
                                    lineLinked: {
                                        enable: true,
                                    },
                                    move: {
                                        enable: true,
                                    },
                                },
                            }
                        }
                    },
                    judima:{
                        formatIgnore:"true"
                    }
                }
            }
        ]
    },
]

let loginDev:Array<Partial<zProtoComponent>> = [
    {
        title:"login",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["login"],
                    confirm:"true",
                    type:["body"]
                },
                options:{
                    extras:{
                        appSection:{
                            confirm:"true"
                        },
                        appFacebookLogin:{
                            confirm:"true",
                            type:["body"]
                        },
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        }
                    }

                }
            },
            {
                key:"login-container a_p_p_Glassmorphism a_p_p_LoginContainer",
                type:"div",
                // left:1050,
                top:50,
                height:220,
                split:5,
                left:300,
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"login"
                    },
                    zChildren:[
                        {
                            bool:"h1",
                            val:"title a_p_p_LoginTitle",
                            text:"Login",
                            logic:{
                                desktop:{
                                    width:1,
                                    height:()=>{
                                        return 80
                                    },
                                    top:0,
                                    left:latchUtilities.centerX
                                },
                                mobile:{
                                    width:1,
                                    height:()=>{
                                        return 80
                                    },
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appNavigation:{
                                    type:["directLink"],
                                    group:"home"
                                }
                            },
                            group:["login"]
                        },
                        {
                            bool:"app-components",
                            val:"fb-login a_p_p_FacebookLogin",
                            // text:"Login",
                            logic:{
                                desktop:{
                                    width:1,
                                    height:()=>{
                                        return 30
                                    },
                                    top:100,
                                    left:latchUtilities.centerX
                                },
                                mobile:{
                                    width:1,
                                    height:()=>{
                                        return 30
                                    },
                                    top:100,
                                    left:0
                                }
                            },
                            extras:{
                                appFacebookLogin:{
                                    type:["target"]
                                },
                                options:{
                                    type:"fb-login",
                                    // "class":"a_p_p_FacebookLogin",
                                    component:{
                                        style:{
                                            width:"100%",
                                            height:"100%",
                                            display:"flex",
                                            "flex-direction":"column",
                                            "align-items":"center"
                                        }
                                    }
                                }
                            },
                            group:["login"]
                        },

                    ]
                },
                options:{
                    extras:{
                        appParticlesJS:{
                            type:["stretchTo"]
                        }
                    }
                }
            },
        ]
    },

]

let scanDev:Array<Partial<zProtoComponent>> = [
    {
        title:"scan",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["scan"],
                    confirm:"true",
                    type:["body"]
                },
                nest:{
                    group:[
                        {
                            name:"menu",
                            type:"regular"
                        },
                        {
                            name:"confirm",
                            type:"regular"
                        }
                    ]
                },
                delta:{
                    group:[
                        {
                            name:"profileMenuOption",
                            type:"repeat",
                            by:3
                        },
                    ]
                },

                options:{
                    extras:{
                        appSection:{
                            confirm:"true"
                        },
                        appFacebookLogin:{
                            confirm:"true",
                            type:["body"]
                        },
                        appNanonets:{
                            confirm:"true",
                            type:["body"]
                        },
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appParticlesJS:{
                            confirm:"true",
                            type:["body"]
                        },
                        section:{
                            // left:-25,
                            width:1225
                        }
                    }

                }
            },
            {
                key:"scTtile a_p_p_ScanTitle",
                type:"title",
                value:"Scan A Receipt",
                left:500,
            },
            {
                key:"menu-container a_p_p_Glassmorphism a_p_p_ScanContainer",
                type:"div",
                next:"true",
                nest:{
                    group:"menu",
                    name:"A1"
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"scanResults"
                    },
                    zChildren:[
                        {
                            bool:"app-components",
                            val:"result a_p_p_ScanResultsContainer",
                            css:{
                                display:"none"
                            },
                            logic:{
                                desktop:{
                                    width:1.7,
                                    height:1.8,
                                    top:-30,
                                    left:0
                                },
                                mobile:{
                                    width:1,
                                    height:1.15,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appNanonets:{
                                    type:["confirm"]
                                },
                                appParticlesJS:{
                                    type:["stretchTo"]
                                },
                                options:{
                                    type:"scanConfirm",
                                    fields:Array(7).fill(null)
                                    .map((x:any,i)=>{
                                        let name = ["Group","Total_Amount","Date","Merchant_Name","Merchant_Address","Merchant_Phone","Comments"]
                                        return {
                                            name:name[i],
                                            inputType:i === 6 ? "textarea":"none"
                                        }
                                    }),
                                    component:{
                                        style:{
                                            width:"100%",
                                            height:"100%"
                                        },
                                    }
                                },
                            },
                            group:["scanResults"]
                        },
                        {
                            bool:"app-components",
                            val:"result a_p_p_ScanResultsLoading",
                            css:{
                                display:"none"
                            },
                            logic:{
                                desktop:{
                                    width:1.7,
                                    height:1.8,
                                    top:-30,
                                    left:0
                                },
                                mobile:{
                                    width:1,
                                    height:1.15,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{

                                options:{
                                    type:"primeng-progressSpinner",
                                    style:{
                                        width:"100%",
                                        height:"100%"
                                    },
                                    strokeWidth:5,
                                    fill:"white",
                                    component:{
                                        style:{
                                            width:"50%",
                                            height:"50%"
                                        },
                                    }
                                },
                                appNanonets:{
                                    type:["loading"]
                                }
                            },
                            group:["scanResults"]
                        },
                    ]
                },
                height:500,
                split:2.5,
                top:100
            },
            {
                key:"menu-container  a_p_p_ScanOptionContainer",
                type:"components",
                next:"true",
                nest:{
                    group:"menu",
                    name:"B1",
                    under:"A1"
                },
                delta:{
                    group:"profileMenuOption",
                    options:{
                        modify:(devObj)=>{
                            let {zChild,x,index,hook,co} = devObj

                            if(hook === 'deltaNodeBootstrap'){
                                let items = ['Picture Upload',"Dashboard","Logout"]
                                let icons = ["pi-cloud-upload","pi-money-bill","pi-sign-out"]
                                let url = ["picture","dashboard","home"]
                                zChild[x].extras.options.name.text = items[index]
                                zChild[x].extras.options.pic.class = "pi " +icons[index] + " a_p_p_ScanOptionIcon"
                                zChild[x].extras.appNavigation.group = url[index]

                                if(index === 2){
                                    zChild[x].extras.options.class  = "a_p_p_ScanOptionLogOut"
                                    zChild[x].extras.options.logOut = "true"
                                    zChild[x].extras.appFacebookLogin.confirm = "true"
                                    delete zChild[x].extras.appNavigation
                                }

                            }
                        }
                    }
                },
                options:{
                    extras:{
                        options:{
                            type:"profileCard",
                            style:{
                            },
                            pic:{
                                type:"icon",
                                class:"pi pi-sort-amount-up-alt a_p_p_ScanOptionIcon"
                            },
                            name:{
                                text:"Scan",
                                class:"a_p_p_ScanOptionName",
                            },
                            addButton:{
                                hide:"true"
                            },
                            removeButton:{
                                hide:"true"
                            }
                        },
                        appNavigation:{
                            type:["directLink"],
                            group:"scan"
                        },
                        appFacebookLogin:{
                            type:["logOut"],
                        }

                    }
                }
            },
            {
                key:"scan-container a_p_p_ScanViewport",
                type:"video",
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"scanResultsCanvas"
                    },
                    zChildren:[
                        {
                            bool:"c",
                            val:"canvas a_p_p_ScanResultsCanvas",
                            css:{
                                "z-index":3,
                            },
                            logic:{
                                desktop:{
                                    width:1,
                                    height:1,
                                    top:0,
                                    left:0
                                },
                                mobile:{
                                    width:1,
                                    height:1,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appNanonets:{
                                    type:["canvas"]
                                }
                            },
                            group:["scanResultsCanvas"]
                        },
                    ]
                },
                options:{
                    extras:{
                        appNanonets:{
                            type:["video"]
                        },
                        appAttributes:{
                            type:["target"],
                            options:{
                                controls:false
                            }
                        }
                    },
                },
                top:100,
                height:550,
                split:5.5
            },
            {
                key:"scan-button a_p_p_ScanButton",
                type:"button",
                split:3,
                left:-50,
                height:100,
                value:"Take Photo",
                latch:{
                    type:"display",
                    display:{
                        type:"part",
                        name:"scanResults"
                    },
                },
                options:{
                    extras:{
                        appNanonets:{
                            type:["takePhoto"]
                        }
                    }
                }
            },
            {
                key:"scan-button a_p_p_ScanButtonSubmit",
                type:"button",
                split:3,
                height:100,
                value:"Submit",
                latch:{
                    type:"display",
                    display:{
                        type:"part",
                        name:"scanResults"
                    },
                },
                options:{
                    extras:{
                        appNanonets:{
                            type:["submit"]
                        }
                    }
                }
            },
            {
                key:"scan-button a_p_p_ScanButtonCamera",
                type:"button",
                split:3,
                height:100,
                value:"Camera",

                options:{
                    extras:{
                        appNanonets:{
                            type:["showCamera"]
                        },
                    }
                }
            },

        ]
    },

]

let pictureDev:Array<Partial<zProtoComponent>> = [
    {
        title:"picture",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["picture"],
                    confirm:"true",
                    type:["body"]
                },
                nest:{
                    group:[
                        {
                            name:"menu",
                            type:"regular"
                        },
                        {
                            name:"confirm",
                            type:"regular"
                        }
                    ]
                },
                delta:{
                    group:[
                        {
                            name:"profileMenuOption",
                            type:"repeat",
                            by:3
                        },
                    ]
                },

                options:{
                    extras:{
                        appSection:{
                            confirm:"true"
                        },
                        appFacebookLogin:{
                            confirm:"true",
                            type:["body"]
                        },
                        appPictureUpload:{
                            confirm:"true",
                            type:["body"]
                        },
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appParticlesJS:{
                            confirm:"true",
                            type:["body"]
                        },
                        section:{
                            // left:-25,
                            width:1225
                        }
                    }

                }
            },
            {
                key:"scTtile a_p_p_ScanTitle",
                type:"title",
                value:"Picture Upload",
                left:500,
            },
            {
                key:"menu-container a_p_p_Glassmorphism a_p_p_ScanContainer",
                type:"div",
                next:"true",
                nest:{
                    group:"menu",
                    name:"A1"
                },
                latch:{
                    type:"display",
                    display:{
                        type:"target",
                        name:"scanResults"
                    },
                    zChildren:[
                        {
                            bool:"app-components",
                            val:"result a_p_p_ScanResultsContainer",
                            css:{
                                display:"none"
                            },
                            logic:{
                                desktop:{
                                    width:1.7,
                                    height:1.8,
                                    top:-30,
                                    left:0
                                },
                                mobile:{
                                    width:1,
                                    height:1.05,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{
                                appPictureUpload:{
                                    type:["confirm"]
                                },
                                appParticlesJS:{
                                    type:["stretchTo"]
                                },
                                options:{
                                    type:"scanConfirm",
                                    fields:Array(2).fill(null)
                                    .map((x:any,i)=>{
                                        let name = ["Group","Comments"]
                                        let inputType = ["","textarea"]
                                        return {
                                            name:name[i],
                                            inputType:inputType[i],
                                        }
                                    }),
                                    canvas:{

                                    },
                                    component:{
                                        style:{
                                            width:"100%",
                                            height:"100%"
                                        },
                                    }
                                },
                            },
                            group:["scanResults"]
                        },
                        {
                            bool:"app-components",
                            val:"result a_p_p_ScanResultsLoading",
                            css:{
                                display:"none"
                            },
                            logic:{
                                desktop:{
                                    width:1.7,
                                    height:1.8,
                                    top:-30,
                                    left:0
                                },
                                mobile:{
                                    width:1,
                                    height:1.15,
                                    top:0,
                                    left:0
                                }
                            },
                            extras:{

                                options:{
                                    type:"primeng-progressSpinner",
                                    style:{
                                        width:"100%",
                                        height:"100%"
                                    },
                                    strokeWidth:5,
                                    fill:"white",
                                    component:{
                                        style:{
                                            width:"50%",
                                            height:"50%"
                                        },
                                    }
                                },
                                appPictureUpload:{
                                    type:["loading"]
                                }
                            },
                            group:["scanResults"]
                        },
                    ]
                },
                height:500,
                split:2.5,
                top:100
            },
            {
                key:"menu-container  a_p_p_ScanOptionContainer",
                type:"components",
                next:"true",
                nest:{
                    group:"menu",
                    name:"B1",
                    under:"A1"
                },
                delta:{
                    group:"profileMenuOption",
                    options:{
                        modify:(devObj)=>{
                            let {zChild,x,index,hook,co} = devObj
                            if(hook === 'deltaNodeBootstrap'){
                                let items = ['Picture Upload',"Dashboard","Logout"]
                                let icons = ["pi-cloud-upload","pi-money-bill","pi-sign-out"]
                                let url = ["picture","dashboard","home"]
                                zChild[x].extras.options.name.text = items[index]
                                zChild[x].extras.options.pic.class = "pi " +icons[index] + " a_p_p_ScanOptionIcon"
                                zChild[x].extras.appNavigation.group = url[index]

                                if(index === 2){
                                    zChild[x].extras.options.class  = "a_p_p_ScanOptionLogOut"
                                    zChild[x].extras.options.logOut = "true"
                                    zChild[x].extras.appFacebookLogin.confirm = "true"
                                    delete zChild[x].extras.appNavigation
                                }

                            }
                        }
                    }
                },
                options:{
                    extras:{
                        options:{
                            type:"profileCard",
                            pic:{
                                type:"icon",
                                class:"pi pi-sort-amount-up-alt a_p_p_ScanOptionIcon"
                            },
                            name:{
                                text:"Scan",
                                class:"a_p_p_ScanOptionName",
                            },
                            addButton:{
                                hide:"true"
                            },
                            removeButton:{
                                hide:"true"
                            }
                        },
                        appNavigation:{
                            type:["directLink"],
                            group:"scan"
                        },
                        appFacebookLogin:{
                            type:["logOut"],
                        }


                    }
                }
            },
            {
                key:"scan-container a_p_p_ScanViewport",
                type:"video",
                options:{
                    extras:{
                        appPictureUpload:{
                            type:["video"]
                        },
                        appAttributes:{
                            type:["target"],
                            options:{
                                controls:false
                            }
                        }
                    },
                },
                top:100,
                height:550,
                split:5.5
            },
            {
                key:"scan-button a_p_p_PictureButtonTakePhoto",
                type:"button",
                split:3,
                left:400,
                height:100,
                value:"Take Photo",
                latch:{
                    type:"display",
                    display:{
                        type:"part",
                        name:"scanResults"
                    },
                },
                options:{
                    extras:{
                        appPictureUpload:{
                            type:["takePhoto"]
                        }
                    }
                }
            },


        ]
    },

]

let dashboardDev:Array<Partial<zProtoComponent>> = [
    {
        title:"dashboard",
        metafields:[
            {
                key:"body",
                type:"body",
                navigation:{
                    name:["dashboard"],
                    confirm:"true",
                    type:["body"]
                },
                nest:{
                    group:[
                        {
                            name:"menu",
                            type:"regular"
                        },
                        {
                            name:"confirm",
                            type:"regular"
                        }
                    ]
                },
                delta:{
                    group:[
                        {
                            name:"profileMenuOption",
                            type:"repeat",
                            by:3
                        },
                    ]
                },

                options:{
                    extras:{
                        appSection:{
                            confirm:"true",

                        },
                        appFacebookLogin:{
                            confirm:"true",
                            type:["body"]
                        },
                        appDashboard:{
                            confirm:"true",
                            type:["body"],
                        },
                        appAttribute:{
                            confirm:"true",
                            type:["body"]
                        },
                        appParticlesJS:{
                            confirm:"true",
                            type:["body"]
                        },
                        section:{
                            // left:-25,
                            width:1325
                        }
                    }

                }
            },
            {
                key:"scTtile a_p_p_ScanTitle",
                type:"title",
                value:"Dashboard",
                left:500,
            },
            {
                key:"menu-container a_p_p_Glassmorphism a_p_p_ScanContainer",
                type:"div",
                next:"true",
                nest:{
                    group:"menu",
                    name:"A1"
                },
                left:-100,
                height:500,
                split:2.5,
                top:100
            },
            {
                key:"menu-container  a_p_p_ScanOptionContainer",
                type:"components",
                next:"true",
                nest:{
                    group:"menu",
                    name:"B1",
                    under:"A1"
                },
                delta:{
                    group:"profileMenuOption",
                    options:{
                        modify:(devObj)=>{
                            let {zChild,x,index,hook,co} = devObj
                            if(hook === 'deltaNodeBootstrap'){
                                let items = ['Picture Upload',"Dashboard","Logout"]
                                let icons = ["pi-cloud-upload","pi-money-bill","pi-sign-out"]
                                let url = ["picture","dashboard","home"]
                                zChild[x].extras.options.name.text = items[index]
                                zChild[x].extras.options.pic.class = "pi " +icons[index] + " a_p_p_ScanOptionIcon"
                                zChild[x].extras.appNavigation.group = url[index]

                                if(index === 2){
                                    zChild[x].extras.options.class  = "a_p_p_ScanOptionLogOut"
                                    zChild[x].extras.options.logOut = "true"
                                    zChild[x].extras.appFacebookLogin.confirm = "true"
                                    delete zChild[x].extras.appNavigation
                                }

                            }
                        }
                    }
                },
                options:{
                    extras:{
                        options:{
                            type:"profileCard",
                            pic:{
                                type:"icon",
                                class:"pi pi-sort-amount-up-alt a_p_p_ScanOptionIcon"
                            },
                            name:{
                                text:"Scan",
                                class:"a_p_p_ScanOptionName",
                            },
                            addButton:{
                                hide:"true"
                            },
                            removeButton:{
                                hide:"true"
                            }
                        },
                        appNavigation:{
                            type:["directLink"],
                            group:"scan"
                        },
                        appFacebookLogin:{
                            type:["logOut"],
                        }

                    }
                }
            },
            {
                key:"table a_p_p_DashboardTable",
                type:"components",
                height:847,
                width:1000,
                top:100,
                latch:{
                    type:'display',
                    display:{
                        type:'target',
                        name:'itemExpander'
                    },
                    zChildren:[
                        {
                            bool:'div',
                            val:'over a_p_p_DashboardExpanderOverlay',
                            logic:{
                                desktop:{
                                    width:(devObj)=>{
                                        let {zChildren} = devObj
                                        return numberParse(getComputedStyle(zChildren["&#8353"].element).width)
                                    },
                                    height:1.2,
                                    top:()=>{
                                        return 0
                                    },
                                    left:()=>{
                                        return 0
                                    }
                                },
                                mobile:{
                                    width:(devObj)=>{
                                        let {zChildren} = devObj
                                        return numberParse(getComputedStyle(zChildren["&#8353"].element).width)
                                    },
                                    height:1.7,
                                    top:()=>{
                                        return 120
                                    },
                                    left:()=>{
                                        return 0
                                    }
                                }
                            },
                            extras:{
                                appDashboard:{
                                    type:["expander"]
                                }
                            },
                            group:['itemExpander']
                        },
                        {
                            bool:'div',
                            val:'over a_p_p_DashboardExpanderContainer',
                            logic:{
                                desktop:{
                                    width:.8,
                                    height:.8,
                                    top:-30,
                                    left:latchUtilities.centerX,

                                },
                                mobile:{
                                    width:.8,
                                    height:.8,
                                    top:()=>{
                                        return 170
                                    },
                                    left:latchUtilities.centerX,
                                }
                            },
                            extras:{
                                appDashboard:{
                                    type:["expander"]
                                }
                            },
                            group:['itemExpander']
                        },
                        {
                            bool:'img',
                            val:'over a_p_p_DashboardExpanderImage',
                            logic:{
                                desktop:{
                                    width:.7,
                                    height:.7,
                                    top:-10,
                                    left:latchUtilities.centerX,

                                },
                                mobile:{
                                    width:.7,
                                    height:.7,
                                    top:()=>{
                                        return 220
                                    },
                                    left:latchUtilities.centerX,
                                }
                            },
                            extras:{
                                appDashboard:{
                                    type:["photoExpander"]
                                },
                                appAttribute:{
                                    type:["target"],
                                    options:{
                                        attrObject:{}
                                    }
                                }
                            },
                            group:['itemExpander']
                        },
                        {
                            bool:'p',
                            val:'over a_p_p_DashboardExpanderText',
                            logic:{
                                desktop:{
                                    width:.6,
                                    height:.7,
                                    top:10,
                                    left:latchUtilities.centerX,
                                },
                                mobile:{
                                    width:.6,
                                    height:.7,
                                    top:()=>{
                                        return 270
                                    },
                                    left:latchUtilities.centerX,
                                }
                            },
                            extras:{
                                appDashboard:{
                                    type:["textExpander"]
                                }
                            },
                            group:['itemExpander']
                        },
                        {
                            bool:'icon',
                            val:'icon a_p_p_DashboardExpanderIcon pi pi-times',
                            logic:{
                                desktop:{
                                    width:.1,
                                    height:.1,
                                    top:-20,
                                    left:680,
                                },
                                mobile:{
                                    width:()=>{
                                        return 200
                                    },
                                    height:()=>{
                                        return 200
                                    },
                                    top:20,
                                    left:latchUtilities.centerX,
                                }
                            },
                            extras:{
                                appDashboard:{
                                    type:["close","expander"]
                                }
                            },
                            group:['itemExpander']
                        }
                    ]
                },
                options:{
                    extras:{
                        appParticlesJS:{
                            type:["stretchTo"],
                            options:{
                                mobile:{
                                    heightValue:3070
                                }
                            }
                        },
                        appDashboard:{
                            type:['main']
                        },
                        options:{
                            // value:Array(9).fill(null)
                            // .map((x:any,i)=>{
                            //     return {
                            //         Group:"Group "+i,
                            //         Type:["Scan","Picture"][Math.floor(Math.random()*2)],
                            //         Total:Math.floor(Math.random()*120),
                            //         Date:new Date().toDateString()
                            //     }
                            // }),
                            type:"primeng-table",
                            class:"a_p_p_DashboardTable",
                            value:[], //needs to always be there
                            cols:Array(9).fill(null)
                            .map((x:any,i)=>{
                                let name = ["Type","Group","Photo","Comments","Total","Date","Merchant Name","Merchant Address","Merchant Phone"]
                                return {
                                    header:name[i],
                                }
                            }),

                            search:{
                                buttons:Array(2).fill(null)
                                .map((x:any,i)=>{
                                    let name = ["Type","Group"]
                                    return {
                                        name:name[i],
                                        class:i === 1 ? "a_p_p_DashboardSelectSearchButton" :
                                        "a_p_p_DashboardSearchButton"
                                    }
                                }),
                                icon:{
                                    class:"a_p_p_DashboardSearchIcon"
                                }
                            },
                            component:{
                                style:{
                                    position:"absolute"
                                }
                            }
                        }
                    }
                }
            }



        ]
    },

]



let _Dev:Array<zProtoComponent> =[
    ...homeDev,
    ...loginDev,
    ...scanDev,
    ...pictureDev,
    ...dashboardDev
]
.map((x:any,i)=>{
	x.type_slug = "forms"
	return x
})

website.convertCMS = _Dev
export default website
