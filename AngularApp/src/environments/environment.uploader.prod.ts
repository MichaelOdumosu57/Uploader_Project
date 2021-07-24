

export const environment:any = {
    production: true,
    url: 'Uploader',


    cookie:{
        // permission:"allow",
        // confirm:"false"
    },
    component: {

        form: {
            panelView:-1, //should be a number use a positive number to view it
            lifecycleHooks: false,
            zChildView:-1,
			zChild:[-1],
			topLevelZChild:[-1],
            drag:[-1],
        },
        app: {
            lifecycleHooks:false
        }
    },
    directive:{
        deltaNode:{
            lifecycleHooks:false
        },
        latch:{
            lifecycleHooks:false
        },
		login:{
			lifecycleHooks:false
		}
    },

    testingAcct:{
		confirm:"false", //true for hubspot false for drive
		capybara: { // remove this if not doing unit or e2e tests impt
			main:"true",
			url:"gdp",
		}
    },
    sentry:{
        env:"gdp_development",
        defaultIntegrations:true,
        tracingOrigins:["localhost",/^\//]
    },
	navigation:{
		startURL:"/home",
        type:"full" //[SPA,full],
	},
    sectionDefault:{
        type:"custom" //[stack,custom]
    },
    //

	// dev additions
	backend:{
		url:"https://uploader-app212.herokuapp.com/",
        storageURL:"https://storageacctdemo624.blob.core.windows.net/",
        storageContainerURL:"https://storageacctdemo624.blob.core.windows.net/azure"
	}
	//




};

