
# Separate backend and frontend

Create new angular project in Visual Studio (http, https is not needed)

Now create folders for backand and frontend and move files accordingly.

## Backend

- remove all spa entries from csproj
- remove all spa entries from launchSettings.json

## Frontend

### Proxy

In development, we use 2 web servers: Kestrel for backend, ng serve (webpack) for frontent.
To route the calls to the right server, we need to config a proxy.

We can either use a js or a json.

#### proxy.conf.js

Create proxy.conf.js:

```js
const { env } = require("process");
const target = "http://localhost:5240"; // backend: webapi port
const PROXY_CONFIG = [
  {
    context: ["/weatherforecast"],
    target: target,
    secure: false,
    logLevel: "debug",
  },
];
module.exports = PROXY_CONFIG;
```

Add this to angular.json: projects\architect\serve\configurations\development:

`"proxyConfig": "src/proxy.conf.js"`

Check proxy start log in console:

`[HPM] Proxy created: [ '/weatherforecast' ]  ->  http://localhost:5240`

Check proxy execution log in console:

`[HPM] GET /weatherforecast -> http://localhost:5240`

#### proxy.conf.json - using angular.json
 
from https://angular.io/guide/build#proxying-to-a-backend-server

- remove proxy.conf.js
- add src/proxy.conf.json to config backend URL:

```json
{
  "/weatherforecast": {
    "target": "http://localhost:5240", // backend URL
    "secure": false,
    "logLevel": "debug",
    "ws": true,
    "changeOrigin": true,
    "proxyTimeout": 900000,
    "timeout": 900000
  }
}
```

Add this to angular.json: projects\architect\serve\configurations\development:

`"proxyConfig": "src/proxy.conf.json"`

start app: 

`ng serve`

Check proxy start log in console:

`[HPM] Proxy created: [ '/weatherforecast' ]  ->  http://localhost:5240`

Check proxy execution log in console:

`[HPM] GET /weatherforecast -> http://localhost:5240`

#### proxy.conf.json - using command line arguments
 
from https://angular.io/guide/build#proxying-to-a-backend-server

>I ignored step 3 (adding proxyConfig to angular.json). Instead, I add it to ng serve

- remove proxy.conf.js
- add src/proxy.conf.json to config backend URL:

```json
{
  "/weatherforecast": {
    "target": "http://localhost:5240", // backend URL
    "secure": false,
    "logLevel": "debug",
    "ws": true,
    "changeOrigin": true,
    "proxyTimeout": 900000,
    "timeout": 900000
  }
}
```

start app using argument: 

`ng serve --proxy-config src/proxy.conf.json`

Check proxy start log in console:

`[HPM] Proxy created: [ '/weatherforecast' ]  ->  http://localhost:5240`

Check proxy execution log in console:

`[HPM] GET /weatherforecast -> http://localhost:5240`

