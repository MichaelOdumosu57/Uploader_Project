# Summary
* the application uses ML and modern web components to organize your daily data as far as it comes to receipts. Upload receipts to our Nanonets ML backend which will parse the receipt for useful data. Take a picture and write comments and leave as a remeninder for your self. You can look at all your data in the dashboard

## Features include 


Only members of the project can read the README.md from the ignore folder
# Stack 

## Frontend
* TsParticles v1.26.3
* Angular  v11.2.13
* angularx-qrcode v11.0.0
* ngrok : v4.0.1
* primeng: v11.4.2

## Backend
* Tornado v6.1
* Nanonets
* azure-storage-blob v12.8.1
* watchdog v2.1.2
* pyodbc v4.0.30 ( for azure sql)
* jawsdb mysql (heroku addon)

## Testing
* Docker, (tes in docker containers from linux VM) v20.10.7

### Unit
* rspec    v3.10.0
* capybara v3.35.3

### Integration
* rspec    v3.10.0
* capybara v3.35.3


## Hosting
* codesandbox , frontend v.2.2.3
* heroku, backend v7.56.0




# Structure

## Linting Rules
* for each commit, we append "WORKING COMMIT" so we know the commit is free of bugs
* ruby indentation 2 lines
* ts indentation 4 lines


## Project Directory Mapping

### Frotend
#### Configurations
* we use __JudimaApp/src/envrionments__ - for dev and prod frontend configurations we includes configuations for features in the app


### Backend
*  __JudimaApp/backend/python/template.py__ is mainly a class for a route for the tornado server 
*  __JudimaApp/backend/python/tornad_server.py__ - dev backend server
* __JudimaApp/backend/python/tornado_heroku_server.py__ - prod backendserver
#### Configurations
* refer to README.md in ignore

### Login
nected to the User attributes of account metadata, 

### Testing 
* in __JudimaApp/testing/TESTS.md__ we have  where we write pseudo code for our unit,e2e and integration tests later
* __JudimaApp/testing/e2e/social-e2e-circleci.rb__ - is where all of our e2e tests live, we test on docker in a ubuntu 20.04 to closely represent the circleCI env and write the code 
* in the local testing env we use a gui browser, to oberserve to  make sure the tests work properly, however in circleci we have the browsers run in headless mode. 

### CI/CD
* IN .circle is our config.yml, we make use of the company's Docker image as well as the circleci browser-build tools orb, as a general practice we packages our dependencies into the orb so we dont have to increased build times


### Issues

### Future Plans
refer to README.md in ignore


## Site Navigation

* to navigate through the website, end user clicks on the login , then login with facebook , and interacts with the app via dropdown navigation

# Issues 
[difficult connecting when azureite is in VM](https://docs.microsoft.com/en-us/answers/questions/437449/diffculty-connectiong-to-storage-emulator-via-rest.html)

[Cant connect to some ports on vm](https://www.virtualbox.org/ticket/20419#comment:4)

* Try to find a solution for a sql backend

* decides to work when it wants to throughing the script in assets as a solution
```ts
    {
        src:"https://cdnjs.cloudflare.com/ajax/libs/tsparticles/1.26.3/tsparticles.min.js",
        name:"tsParticles",
        integrity:"sha512-f5U3LCj0YmFWHJ+I5vljqpT2RIGQic48+79y0V/fiJ60KX/s/xiZWQ/Zw8elJHpEdTPFa/5rtVil337IJwg4EA==",
        crossorigin:"anonymous",
        // defer:"true",
        placement:{
            appendChild:document.body
        }
    },
```
# TODO
* support for a firebase build option


# Resources

[mysql connection docs](https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursordict.html)

[facebook app client](https://developers.facebook.com/apps/749733915701523/settings/basic/)

[azure portal](https://portal.azure.com/#@shieldmousetower734outlook.onmicrosoft.com/resource/subscriptions/40e192c2-7e6e-4492-942e-9da21ef0fb36/resourcegroups/resourceGroup1/providers/Microsoft.Storage/storageAccounts/storageacctdemo624/containersList)

[download ODBC driver SQL](https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?redirectedfrom=MSDN&view=sql-server-ver15)

[Azure SQL database engine errors](https://docs.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-events-and-errors?view=sql-server-ver15&viewFallbackFrom=sql-server-2017%3FWT.mc_id%3Dpid%3A13491%3Asid%3A32630429%2F)

[Troubleshooting connectivity issues with azure sql](https://docs.microsoft.com/en-us/azure/azure-sql/database/troubleshoot-common-errors-issues?WT.mc_id=Portal-Microsoft_Azure_Support)

[Create Blob Container](https://docs.microsoft.com/en-us/rest/api/storageservices/create-container)


[Nanonets Keys](https://app.nanonets.com/#/keys)

[Nanonets Python Docs](https://app.nanonets.com/documentation#operation/OCRModelLabelUrlsByModelIdPost)

[Ngrok](https://dashboard.ngrok.com/get-started/setup)

[PyODBC row docs](https://github.com/mkleehammer/pyodbc/wiki/Row)

[Heroku app backend](https://dashboard.heroku.com/apps/uploader-app212)

[Python ODBC buildpack](https://github.com/matt-bertoncello/python-pyodbc-buildpack)

[Heroku buildpacks](https://devcenter.heroku.com/articles/buildpacks)

[building heroku docker images](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#run-defining-the-processes-to-run)

[clear db heroku addon](https://devcenter.heroku.com/articles/cleardb#using-cleardb-with-python-django)4

[install myodbc installer for odbc drivers](https://dev.mysql.com/doc/connector-odbc/en/connector-odbc-installation-binary-unix-tarball.html)

[quotaguard issues](https://support.quotaguard.com/support/solutions/articles/12000077818-error-app-vendor-nss-wrapper-libnss-wrapper-so-from-ld-preload-cannot-be-preloaded)
    * check your gitignore to see if its removing the vendor folder




