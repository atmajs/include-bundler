import { BasePathResolver } from '../../base/BasePathResolver';
import { path_combine } from '../../../utils/path';
import { io } from '../../../global'

export class CommonJsPathResolver extends BasePathResolver {

	accepts (includeData) {
		if (includeData.type !== 'js' || includeData.module !== 'commonjs') {
			return false;
		}
		if (!/^[\w\-/]+$/.test(includeData.url)) {
			return false;
		}
		if (nodeCoreModules.indexOf(includeData.url) !== -1) {
			return false;
		}

		return true;
	}

	resolve (includeData, parentResource) {		
		var filename = nodeModuleResolve(includeData.url, parentResource.directory);
		if (filename) {
			var url = this.solution.opts.toAppUrl(filename);
			this.solution.opts.mappings[includeData.url] = url;
		}
		return filename;
	}
};


var nodeCoreModules = ['assert', 'buffer', 'child_process', 'cluster', 'console', 'constants', 
    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'module', 'net', 'os', 'path', 
    'process', 'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys', 'timers', 
    'tls', 'tty', 'url', 'util', 'vm', 'zlib'];

function nodeModuleResolve(path, location_){
	var location = location_.replace(/[\\\/]+$/, '');
	var name = /^([\w\-]+)/.exec(path)[0];
	var resource = path.substring(name.length + 1);
	if (resource && hasExt(resource) === false) {
		resource += '.js';
	}
	var current = location;
	var root_ = current + '/node_modules/' + name + '/';
	while (true)  {
		var nodeModules = current + '/node_modules/' + name + '/';
		var pckg = nodeModules + 'package.json';
		if (io.File.exists(pckg) === false) {
			var next = current.replace(/[^\/\\]+$/, '');
			if (next === current) {
				return root_ + 'package.json';
			}
			current = next;
			continue;
		}

		var json = io.File.read(pckg);
		if (typeof json === 'string') {
			json = JSON.parse(json);
		}
		if (resource) {
			return nodeModules + resource;
		}
		console.log(json.main, '>', path_combine(nodeModules, json.main))
		if (json.main) {
			return path_combine(nodeModules, json.main)
		}		
		return nodeModules + 'index.js';
	}
}
function hasExt(path) {
	return /\.[\w]{1,8}($|\?)/.test(path);
}