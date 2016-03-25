var ConcatSource = require("webpack-core/lib/ConcatSource");
var PolyfillService = require('polyfill-service');
var fs = require("fs");

function PolyfillsPlugin(options) {
	this.options = options || {};
	this.options = {
		uaString: options.uaString || '',
		minify: options.minify || false,
		features: options.features || {},
		unknown: options.unknown || 'polyfill'
	};
}

PolyfillsPlugin.prototype.apply = function(compiler) {
	var self = this;
	compiler.plugin("compilation", function(compilation) {
		compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
			chunks.forEach(function(chunk) {
				if (!chunk.initial) return;
				PolyfillService.getPolyfillString(self.options).then(function(bundleString) {
					chunk.files.forEach(function(file, i) {
						compilation.assets[file] = new ConcatSource("/* Polyfills */\n", bundleString, compilation.assets[file]);
						callback();
					});
				});
			});
		});
	});
};

module.exports = PolyfillsPlugin;
