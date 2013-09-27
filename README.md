# Sash

An Open Badges display prototype.

## Quick Start

``` bash
  npm install
  bower install
  PORT=3000 make run
```

Now navigate to http://localhost:3000 in a web browser.

## Configuration

Sash can be configured with the following environment variables:

* **PORT**: This specifies the port number for the Sash back-end to run on. Also,
if `ORIGIN` is left unspecified, the built `bundle.js` will point to `http://localhost:PORT`
as a convenience for development. The app should be built and run with the same PORT value.
* **ORIGIN**: This *optional* parameter lets you specify the protocol, host name, and 
port where your instance is going to live, e.g. `http://sash.org:8000`. This will be 
injected into the built `bundle.js` as the basis for the `/unbake` endpoint defined 
in `app.js`.

