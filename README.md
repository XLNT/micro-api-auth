# 🚸 micro-api-auth

A super simple way of adding api key authorization to your zeit/micro microservice.

```ts
import withApiAuth from '@xlnt/micro-api-auth'

export default withApiAuth()(myMicroFunction)
```

`withApiAuth` also allows for some configuration like

```ts
getValidApiKeys: () => string[]
// pulls from process.env.API_KEYS (json encoded) by default

getApiKey: (req: IncomingMessage) => string
// pulls from req.headers['Authorization'] in the `Bearer :token` format by default
```

that's it.
