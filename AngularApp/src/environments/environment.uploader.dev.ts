

export const environment:any = {
    production: false,
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
			zChild:[0,3],
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
		},

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
		url:"http://localhost:3005",
        storageURL:"https://uploader-azurite-212.herokuapp.com/devstoreaccount1",
        storageContainerURL:"https://uploader-azurite-212.herokuapp.com/devstoreaccount1/azure"

	}
	//




};

