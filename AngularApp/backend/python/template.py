import sys
if sys.platform == "win32":
    sys.path.append(sys.path[0] + "\\site-packages\\windows")
elif sys.platform =="linux":
    sys.path.append(sys.path[0] + "/site-packages/linux")
import json
import os
import uuid
import datetime
import time
import pprint
import asyncio
import json
import datetime
# import pytz
import time
pp = pprint.PrettyPrinter(indent=4, compact=True, width=1)
import random
import lorem
import jwt
import requests
from datetime import datetime,timedelta

import pyodbc
import base64
import hashlib
import hmac

#azure
from azure.core.pipeline.transport import HttpRequest
from azure.storage.blob._shared.authentication import SharedKeyCredentialPolicy
from urllib.parse import urlparse
from urllib import parse

# jawsdb
jaws = {
    "host":os.environ["JAWS_DB_SQL_HOST"],
    "user":os.environ["JAWS_DB_SQL_USER"],
    "pass":os.environ["JAWS_DB_SQL_PASS"],
    "database":os.environ["JAWS_DB_SQL_DATABASE"]
}
import mysql.connector



global nanonets_apikey
nanonets_apikey = os.environ["NANONETS_APIKEY"]
azure_sql_password = os.environ["AZURE_SQL_PASS"]
cleardb_pass = os.environ.get("CLEARDB_PASS")

class myAzureHttpObject():
    def __init__(self,method, url, headers=None, files=None, data=None):
        self.http_request = HttpRequest(method, url, headers, files, data)
        self.url = url

class mySharedKeyCredentialPolicy(SharedKeyCredentialPolicy):


    def _get_canonicalized_resource(self, request):
        uri_path = urlparse(request.url).path
        return '/' + self.account_name + uri_path


class my_ibm_language_client():

    def sql_setup(self):
        cursor = None
        cnxn = None
        try:
            # prod driver
            cnxn = mysql.connector.connect(
                host=jaws["host"],
                user=jaws["user"],
                passwd=jaws["pass"],
                database=jaws["database"]
            )
            print("Connection established")
        except BaseException as err:
            print(err)
            None
        else:
            None

        self.cursor = cnxn.cursor()

        # create a table if not exists
        try:

            self.cursor = self.cursor.execute(
                """CREATE TABLE  Uploader (
                    my_name             varchar(255),
                    my_group            varchar(255),
                    Total_Amount        varchar(255),
                    my_date             varchar(255),
                    -- would be TIMESTAMP but sneaky chars
                    Merchant_Name       varchar(255),
                    Merchant_Address    varchar(255),
                    Merchant_Phone      varchar(255),
                    photo               varchar(255),
                    my_type             varchar(255),

                    -- picture
                    Comments             varchar(8000)
                )
                """
            )
            self.cursor.execute('commit')
            print("table created")

        except BaseException as e:
            print(e)
            None
        # table exists

    def error_handler(self,e,env):
        print("---------------------------")
        print('my custom error at {}\n'.format(env))
        print(e.__class__.__name__)
        print(e)
        print("---------------------------")
        return {
            'status':500,
            'message': 'an error occured check the output from the backend'
        }

    def modify_needed_labels(self,x):
        needed_labels_map={
            "Card_Tender":"Total_Amount"
        }

        if  needed_labels_map.get(x.get("label")):
            x["label"] = needed_labels_map[x["label"]]
        return x

    def __init__(self):
        self.datetime = datetime
        self.timedelta = timedelta
        self.time = time
        self.uuid = uuid
        self.random = random
        self.requests = requests
        self.lorem  = lorem
        self.jwt = jwt
        self.parse= parse

        # azure blob storage
        self.mySharedKeyCredentialPolicy = mySharedKeyCredentialPolicy
        self.myAzureHttpObject = myAzureHttpObject
        self.blob_count = 0
        self.file_size =0
        #

        # azure sql
        self.cursor = None
        #

        # nanonets application
        self.model_id = "abd4aa3d-4218-4820-a0fa-376d296e208d"
        self.nanonets_apikey = nanonets_apikey
        #

        # login from facebook user
        self.facebook_login = {
            "users":{}
        }

        self.auth_enum = {
            "Error":"Log In Again",
            "Authorized":"Authorized",
            "Invalid":"Please try again",
        }
        #

        # init tasks
        self.sql_setup()


    def token_required(self,func):
        print("-------------------")
        print('{}\n'.format('token required'))
        def inner(token,user,my_type="access"):

            print(self)
            pp.pprint(self.facebook_login)
            if not token :
                print('\n{}\n'.format('token missing'))
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            elif not user :
                print('\n{}\n'.format('user missing'))
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            elif not self.facebook_login.get("users").get(user):
                print('\n{}\n'.format('the backend doesnt have an auth object'))
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }


            secret_type = my_type +"_secret"
            target_dict = self.facebook_login.get("users")[user]

            if( target_dict.get("tries") <= 0):
                # expire the refresh key the user should login again
                print("\n{}\n".format("bad access token"))
                target_dict["refresh_secret"] = ""
                print(target_dict)
                #
                return {
                    "status":401,
                    "message":self.auth_enum["Error"]
                }
            try:
                mySecret = target_dict.get(secret_type)
                print("\n{}\n".format(target_dict))
                payload = jwt.decode(token, key=mySecret, algorithms=["HS256"])
                print(payload)
                print("Authorized")
                print("------------------")

            except jwt.InvalidTokenError as e:
                print(e)
                print('Invalid')
                target_dict["tries"] -= 1
                if(target_dict.get("tries")<= 0):
                    # expire the refresh key the user should login again
                    print("\n{}\n".format("bad access token"))
                    target_dict["refresh_secret"] = ""
                    #
                    return {
                        "status":401,
                        "message":self.auth_enum["Error"]
                    }
                return {
                    "status":403,
                    "message":self.auth_enum["Invalid"]
                }
            except BaseException as e:
                return self.error_handler(e,env="token_required")
            return func(token,user,my_type)

        return inner



    def execute(self, data):

        #setup
        jwt = self.jwt
        timedelta = self.timedelta
        datetime = self.datetime
        time = self.time
        uuid = self.uuid
        random = self.random
        lorem = self.lorem
        requests = self.requests
        cursor = self.cursor
        parse = self.parse
        mySharedKeyCredentialPolicy = self.mySharedKeyCredentialPolicy
        myAzureHttpObject = self.myAzureHttpObject


        env = data.get("env")
        username = data.get("user")
        password = data.get("pass")
        result = data.get("result")
        token = data.get("token")
        target = data.get("target")
        type = target = data.get("type")
        access_token = data.get('access_token')
        #
        auth_endpoint = data.get("authEndpoint")
        api_name = data.get("apiName")
        method = data.get("method")
        url = data.get("url")
        contentLength = data.get("contentLength")
        #


        # nanonets app
        model_id = self.model_id
        nanonets_apikey = self.nanonets_apikey
        receiptURL = data.get('receiptURL')
        #


        # facebook login

        #


        if(env == "loginFacebook"):
            print("-------------------")
            print('{}\n'.format('loginFacebook'))
            try:

                username = parse.unquote(username)
                target_dict = self.facebook_login.get("users")[username] = {
                    "login":True,
                    "tries":3,
                    "access_secret":os.urandom(12),
                    "refresh_secret":os.urandom(12),
                    "refresh_expire":False
                }
                access_token= jwt.encode(
                    payload={
                        "expiration":str(datetime.utcnow() + timedelta(minutes=5)),
                    },
                    key=target_dict.get("access_secret"),
                    algorithm="HS256"
                )
                refresh_token= jwt.encode(
                    payload={
                        "expiration":str(datetime.utcnow() + timedelta(minutes=120))
                    },
                    key=target_dict.get("refresh_secret"),
                    algorithm="HS256"
                )
                return {
                    'status':200,
                    'refresh_token':refresh_token,
                    'refresh_user':parse.quote(username),
                    'message':json.dumps(
                        {
                            'message':'allow user to proceed',
                            'token':access_token,
                            'user':username
                        }
                    ),
                }



            except BaseException as e:
                self.error_handler(e,env=env)

        elif(env == "logOutFacebook"):
            print('-------------------')
            print('{}\n'.format('logOutFacebook'))

            try:
                pp.pprint(self.facebook_login)
                self.facebook_login.get("users").pop(username)
                return {
                    'status':200,
                    'message':'OK'
                }

            except BaseException as e:
                self.error_handler(e,env=env)


        elif( env == "refresh_page_Facebook"):

            print("-----------------")
            print('\n{}\n'.format('refresh_page_Facebook'))
            try:
                print('\n{} {}'.format('is refresh user availble',data.get("refresh_user")))
                refresh_user= parse.unquote(data.get("refresh_user"))
                refresh_token= data.get("refresh_token")
                print('{}'.format('yes it is'))

                @self.token_required
                def refresh_page(token,user,my_type):

                    target_dict = self.facebook_login.get("users")[user]
                    target_dict["login"] = True
                    target_dict["tries"] = 3
                    access_token= jwt.encode(
                        payload={
                            "expiration":str(datetime.utcnow() + timedelta(seconds=120)),
                        },
                        key=target_dict.get("access_secret"),
                        algorithm="HS256"
                    )
                    return {
                        'status':200,
                        'message':json.dumps(
                            {
                                'message':'allow user to proceed',
                                'user':parse.quote(user),
                                'token':access_token
                            }
                        ),
                    }
                return refresh_page(refresh_token,refresh_user,"refresh")
            except BaseException as e:
                self.error_handler(e,env=env)

        elif(env == "authConversion"):
            print("--------------------")
            print('\n{}\n'.format('auth conversion'))
            try:
                print(access_token)
                print(username)

                @self.token_required
                def auth_conversion(token,user,my_type):
                    storage_account_name = os.environ["AZURE_STORAGE_ACCT_NAME"]
                    storage_account_key = os.environ["AZURE_STORAGE_ACCT_KEY"]
                    api_version = '2020-08-04'
                    request_time = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')

                    headers = {
                        'verb': method,
                        'Content-Encoding': '',
                        'Content-Language': '',
                        'Content-Length': '',
                        'Content-MD5': '',
                        'Content-Type': '',
                        'Date': '',
                        'If-Modified-Since': '',
                        'If-Match': '',
                        'If-None-Match': '',
                        'If-Unmodified-Since': '',
                        'Range': '',
                        'x-ms-date':request_time,
                        'x-ms-version':api_version
                    }

                    blob_url = url
                    if(type == "createBlob"):

                        print('\n{}\n'.format('create Blob metadata'))
                        blob_url =  "{}/myblob_{}.png".format(url,datetime.now().timestamp())
                        headers['Content-Length'] = str(contentLength)
                        headers['Content-Type'] = 'image/png'
                        # print(headers['Content-Length'])
                        headers['x-ms-blob-type'] = "BlockBlob"
                        headers = {key:val for key,val in headers.items() if not key in ['If-Modified-Since','If-Match','If-None-Match','If-Unmodified-Since']}
                        # self.blob_count +=1
                        headers = {key:val for (key,val) in dict(headers).items() if val != ""}

                    elif(type == "createContainer"):
                        headers['x-ms-blob-public-access'] = "blob"

                    req = myAzureHttpObject(headers['verb'],url=blob_url,headers=headers)

                    mySKCP = mySharedKeyCredentialPolicy(
                        storage_account_name,
                        storage_account_key
                    )
                    # for debugging look at SharedKeyCredentialPolicy
                    mySKCP.on_request(req)
                    #


                    return {
                        'status':200,
                        'message':{
                            'headers':dict(req.http_request.headers),
                            'url':blob_url
                        }
                    }
                return auth_conversion(access_token,username,"access")

            except BaseException as e:
                self.error_handler(e,env=env)


        elif(env =="upload"):
            print("-----------------")
            print('\n{}\n'.format('upload'))
            try:

                @self.token_required
                def upload(token,user,my_type):
                    fields = list(result)
                    modify_fields = {
                        "Group":"my_group",
                        "Date":"my_date",
                        "type":"my_type",
                        "name":"my_name"
                    }
                    fields =  ','.join(['{}'.format(modify_fields.get(x) if modify_fields.get(x)    else x) for x in fields   ])
                    entries = ",".join(["'{}'".format(x)   for x in list(result.values())])
                    query_string = """
                    INSERT INTO Uploader ({})
                    VALUES ({})
                    """.format(fields,entries )
                    cursor.execute(query_string)
                    cursor.execute("commit")
                    return {
                        'status':200,
                        'message':'OK'
                    }
                return upload(access_token,username,"access")
            except BaseException as e:
                self.error_handler(e,env=env)


        elif(env == "dashboard"):
            # this needs to be cached
            print("-----------------")
            print('\n{}\n'.format('dashboard'))
            try:
                @self.token_required
                def dashboard(token,user,my_type):
                    if(type =="getAll"):
                        # you must still protect agaiinst sql injection
                        query_string = "SELECT * FROM Uploader WHERE my_group IS NOT NULL AND my_name = '{}';".format(user)
                        #
                        rows = [
                            { row.cursor_description[ind][0]:x for ind,x in enumerate(list(row))}
                            for row in cursor.execute(query_string).fetchall()
                        ]
                        # print(type(rows))

                        return {
                            'status':200,
                            'message':json.dumps(rows)
                        }

                    return {
                        'status':400,
                        'message':"Invalid property for 'type' check your request body object"
                    }
                return dashboard(access_token,username,"access")

            except BaseException as e:
                 self.error_handler(e,env=env)


        elif(env =="receiptOCR"):
            print("-----------------")
            print('\n{}\n'.format('receiptOCR'))
            try:
                @self.token_required
                def receiptOCR(token,user,type):
                    url =  'https://app.nanonets.com/api/v2/OCR/Model/{}/LabelUrls/'.format(model_id)
                    headers = {
                        'accept': 'application/x-www-form-urlencoded'
                    }

                    data = {
                        "urls":[receiptURL]
                    }
                    response = requests.post(
                        url,
                        headers=headers,
                        auth=requests.auth.HTTPBasicAuth(nanonets_apikey, ''),
                        data=data
                    )
                    message =json.loads(response.text)
                    pp.pprint(message)


                    fields_to_modify = [
                        {
                            "label":x.get("label"),
                            "ocr_text":x.get("ocr_text")
                        } for x in  message.get("result")[0].get("prediction")
                    ]

                    # replace alises with correct name for the app
                    fields_to_modify =[self.modify_needed_labels(x) for x in fields_to_modify   ]
                    #

                    return {
                        "status":200,
                        "message":json.dumps(fields_to_modify)
                    }
                return receiptOCR(access_token,username)


            except BaseException as e:
                self.error_handler(e,env=env)


        return {
            "status" :500,
            "message": "Check the backend env dictionary you did set it so the backend didnt do anything"
        }










