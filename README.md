# CORS Policy demo

This is a sample application to demonstrate the CORS policy capabilities. It
contains four websites/web services which are the following:

<dl>
  <dt>netbank.test<dt>
  <dd>An imaginary banking SPA where "protected" content can be accessed after login.
The user/password is `admin/admin`.<dd>
  <dt>cdn.netbank.test<dt>
  <dd>Static assets for the _netbank_ site like fonts, images, etc.<dd>
  <dt>api.netbank.test<dt>
  <dd>The backend service for the _netbank_ site.<dd>
  <dt>freeiphone.test<dt>
  <dd>A malicious site that try to steal the sensitive data of the _netbank_
  users.<dd>
</dl>

## Installation and setup

Install [chalet](https://www.npmjs.com/package/chalet) globally. This is a proxy
server that you can create custom domains on your own machine.

```
npm i -g chalet
```

Run `npm ci` in each directory under the packages folder. Or run
`lerna bootstrap` from the root directory if it is installed.

Run `chalet add \"npm run serve\"` in each directory under the packages folder.
This will add chalet configuration for each site.

Set chalet up as a proxy server. The automatic config url is:
http://localhost:2000/proxy.pac If you work in a restricted environment where
modifying the proxy settings is forbidden, use the Firefox since it has its own
proxy settings.

The chalet's admin can be accessible at https://chalet.test.

## Branches

### examples/no-cors

CORS policy is not configured at all. The _netbank_ site is ugly, since the
web fonts cannot be downloaded. Another issue is the visible network error
because the browser rejects all requests to `api.netbank.test` from
`netbank.test`.

### examples/cors-cdn

`cdn.netbank.test` is configured correctly. The <abbr title="Access-Control-Allow-Origin">ACAO</abbr>
header value is `*`. It allows access from everywhere.

### examples/misconfigured-cors

The `*` value is only applicable for requests without credentials. Unfortunatelly
only one origin can be defined in the ACAO header. The (not too smart) solution
is echoing the content of the `origin` header in the ACAO. However, with this,
the malicious `freeiphone.test` site can access the protected content[^1].

[^1]: You have to disable blocking of the third-party cookies in Firefox. [Screenshot](ff.png)
