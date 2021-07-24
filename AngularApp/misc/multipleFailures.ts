                                // try to upload the file
                                let sub2 =  ()=>{
                                    authAS$({
                                        url:"http://127.0.0.1:10000/devstoreaccount1/mycontainer",
                                        type:"createBlob",
                                        method:"PUT",
                                        contentLength:myBlob.size
                                    })
                                    .subscribe({

                                        next:(result:any)=>{
                                            this.http.put(
                                                result.url,
                                                myBlob,
                                                {
                                                    headers:result.headers,
                                                    responseType:"text"
                                                }
                                            )
                                            .pipe(
                                                // retry()

                                            )
                                            .subscribe({
                                                next:(result:any)=>{
                                                    let myXml:XMLDocument = parseXml(result)
                                                    console.log(myXml)
                                                },
                                                error:(err:any)=>{
                                                    sub2()
                                                }
                                            })
                                        },
                                        error:(err:any)=>{

                                        }
                                    })
                                }
                                sub2()
                                //
