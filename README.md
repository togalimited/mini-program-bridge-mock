# Yippi Mini Program Bridge Mock
This library design to help Yippi Mini Program developer develop their mini program using Yippi Bridge by mocking function that has same I/O as Yippi's bridge.

### Installation
Install from the command line:  
`npm install @togalimited/yippi-mp-bridge-mock`  
Install via package.json:  
`"@togalimited/yippi-mp-bridge-mock": "^1.0"`  


### How to use?
```
import mock from "@togalimited/yippi-mp-bridge-mock";

// in this example, we use an environment variable (IS_YIPPI_MOCK) to include mock env or not here.
if (process.env.IS_YIPPI_MOCK == "true") { 
  const token = process.env.MOCK_TOKEN; // we use a token to get real data
  mock.execute(token); // token is optional, empty token will return fake data only.
}
```


## Maintainer
Publish from command line:
change value inside ~/.npmrc to: 
```
//registry.npmjs.org/:_authToken=<replace-with-your-npmjs-token>
registry=https://registry.npmjs.org
```

run:
`npm login`
then login using npm username and password

to publish, run:
`npm publish --access public`