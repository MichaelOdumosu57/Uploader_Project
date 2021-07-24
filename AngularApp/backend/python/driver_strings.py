# devart driver
driver = "\
    DRIVER=Devart ODBC Driver for SQL Server;\
    Data Source=uploader.database.windows.net;\
    Initial Catalog=yourdatabase;\
    Port=1433;\
    User ID=windmillcode;\
    Password={};\
    Use Http=True;\
    Proxy Host Name={};\
    Proxy Port={};\
    Proxy User Name={};\
    Proxy Password={}".format(
        azure_sql_password,
        proxies.get("host"),
        proxies.get("port"),
        proxies.get("user"),
        proxies.get("pass"),
    )

# mysql 8.0 unicode
driver ="DRIVER={{MySQL ODBC 8.0 Unicode Driver}};\
SERVER=uploader.database.windows.net,1433;\
DATABASE=yourdatabase;\
USER=windmillcode;\
PASSWORD={};\
MULTI_HOST=1;\
OPTION=3".format(azure_sql_password)

# mysql odbc driver 17

driver ="Driver={{ODBC Driver 17 for SQL Server}};\
    Server=uploader.database.windows.net,1433;\
    Database=yourdatabase;\
    Uid=windmillcode;\
    Pwd={};\
    Encrypt=yes;\
    TrustServerCertificate=no;\
    Connection Timeout=30;".format(azure_sql_password)


if(os.environ["QUOTAGUARDSTATIC"]):
    proxies = {
        # "http":  os.environ['QUOTAGUARDSTATIC_URL'],
        # "https": os.environ['QUOTAGUARDSTATIC_URL'],
        "host":  os.environ['QUOTAGUARDSTATIC_HOST'],
        "port":  os.environ['QUOTAGUARDSTATIC_PORT'],
        "user":  os.environ['QUOTAGUARDSTATIC_USER'],
        "pass":  os.environ['QUOTAGUARDSTATIC_PASS'],
        "url":   os.environ["QUOTAGUARDSTATIC_URL"]

    }

if(os.environ["CLEARDB_DATABASE_URL"]):
    cleardb = {
        # "http":  os.environ['QUOTAGUARDSTATIC_URL'],
        # "https": os.environ['QUOTAGUARDSTATIC_URL'],
        # "host":  os.environ['CLEARDB_HOST'],
        # "port":  os.environ['CLEARDB_PORT'],
        # "user":  os.environ['CLEARDB_USER'],
        # "pass":  os.environ['CLEARDB_PASS'],
        # "url":   os.environ["CLEARDB_URL"]

    }

