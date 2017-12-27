import { io } from '../global'
import { class_EventEmitter } from 'atma-utils';
import { Loader } from './Loader';
import { res_flattern, res_find } from '../utils/res';
import { path_getFile } from '../utils/path';

export const Watcher = {
	watch(resource, solution) {
		return new WatcherFactory(resource, solution);
	}
};

class WatcherFactory extends class_EventEmitter {
	watchers: any = {}
	changeId = 0
	rootResource: any
	solution: any
	constructor(resource, solution) {
		super();
		this.solution = solution;
		this.rootResource = resource;
		this.bind(resource);
	}

	bind(resource) {
		var toWatch = res_flattern(resource)
			.map(x => x.filename)
			.filter(filename => (filename in this.watchers) === false);


		toWatch.forEach(filename => this.watchers[filename] = new FileWatcher(filename, this));
		this.solution.reporter.info(`Watching bold<cyan<${toWatch.length}>> files`.color);
	}

	changed(filename) {
		var changeId = ++this.changeId;
		var reporter = this.solution.reporter;

		reporter.info(`File changed bold<cyan<${path_getFile(filename)}>>`.color);


		Loader.removeCached(filename);

		io.File.clearCache(filename);

		var resource = res_find(this.rootResource, (res) => res.filename === filename);
		if (resource == null)
			throw Error('Resource not found ' + filename);

		Loader
			.loadResource(resource)
			.then(
			(resource) => {
				this.bind(resource);

				if (this.changeId === changeId) {
					this.emit('changed');
				}
			},
			(error) => {
				if (this.changeId !== changeId) {
					return;
				}
				reporter.error(`Resource errored ${filename}`);
				reporter.error(error);
				reporter.log('yellow<Watcher resumed...>'.color);
			});
	}
};


class FileWatcher {
	constructor(public filename, public factory) {

		new io.File(filename).watch(() => this.factory.changed(filename));
	}
};