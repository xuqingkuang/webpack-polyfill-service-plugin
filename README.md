
# webpack-polyfill-service-plugin

Adds polyfills via [polyfill-service](https://github.com/Financial-Times/polyfill-service) to bundle file.

## Usage:

 - uaString: String, required. The user agent to evaluate for polyfills that should be included conditionally
 - minify: Boolean, optional. Whether to minify the bundle
 - features: Object, optional. An object with the features that are to be considered for polyfill inclusion. If not  supplied, no features will be considered and the output will be blank. To load the default feature set, set features to {default:{}}. Each feature must be an entry in the features object with the key corresponding to the name of the feature and the value an object with the following properties:
  - flags: Array, optional. Array of flags to apply to this feature (see below)
 - unknown: String, optional. What to do when the user agent is not recognised. Set to polyfill to return polyfills  for all qualifying features, ignore to return nothing. Defaults to ignore.
 - Flags that may be applied to polyfills are:

  - gated: Wrap this polyfill in a feature-detect, to avoid overwriting the native implementation
  - always: Include this polyfill regardless of the user-agent

```javascript
var PolyfillsPlugin = require('webpack-polyfill-service-plugin');

module.exports = {

   // ...

	plugins: [
		new PolyfillsPlugin({
			uaString: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
			minify: false,
			features: {
				'Array/prototype/forEach': {},
				'Array/prototype/includes': {},
				'Object/assign': {},
				'Promise': {},
				'String/prototype/includes': {}
			}
		}),
	]
}
```
 -