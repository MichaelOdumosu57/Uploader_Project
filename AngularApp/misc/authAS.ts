authAS$({
    url:"http://127.0.0.1:10000/devstoreaccount1?comp=list",
    type:"listContainers",
    method:"GET"
})
.subscribe({
    next:(result:any)=>{

        this.http.get(
            "http://127.0.0.1:10000/devstoreaccount1?comp=list",
            {
                headers:result.headers,
                responseType:"text"
            }
        )
        .subscribe({
            next:(result:any)=>{
                let myXml:XMLDocument = parseXml(result)
                let available = Array.from(myXml.querySelector("EnumerationResults > Containers").children)

                // create a new container
                if(available.length === 0){


                    authAS$({
                        url:"http://127.0.0.1:10000/devstoreaccount1/mycontainer?restype=container",
                        type:"createContainer",
                        method:"PUT"
                    })
                    .subscribe({
                        next:(result:any)=>{
                            this.http.put(
                                "http://127.0.0.1:10000/devstoreaccount1/mycontainer?restype=container",
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
                                    console.log(result)
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

                // create a blob(python willl handle new names)
                else{

                    // convert the data url to .png

                    //
                    return
                    // try to upload the file
                    authAS$({
                        url:"http://127.0.0.1:10000/devstoreaccount1/mycontainer",
                        type:"createBlob",
                        method:"PUT",
                        // contentLength:myBlob.size
                        contentLength:2
                    })
                    .pipe(
                        first()
                    )
                    .subscribe({
                        next:(result:any)=>{
                            this.http.put(
                                result.url,
                                // myBlob,
                                "ab",
                                {
                                    headers:result.headers,
                                    responseType:"text"
                                }
                            )
                            .pipe(
                                first()
                            )
                            .subscribe({
                                next:(result:any)=>{
                                    // even if you get a weird error it succeded
                                    let myXml:XMLDocument = parseXml(result)
                                    console.log(myXml)
                                    //
                                },
                                error:(err:any)=>{

                                }
                            })
                        },
                        error:(err:any)=>{

                        }
                    })
                    //
                }
                //
            },
            error:(err:any)=>{
                console.log(err)
            }
        })
    },
    error:(err:any)=>{
        console.log(err)
    }
})
