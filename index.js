#!/usr/bin/env node

var args = resolveNativeNodeArgumentsIfAny();
if (args) {
	runNewNode(args);
} else {
	let run = require('./lib/cli');
    run();
}



function runNewNode (args) {

	var spawn = require('child_process').spawn;
	var path = require('path');
	var proc = spawn(process.execPath, args, { stdio: 'inherit' });

	proc.on('exit', function (code, signal) {
	  process.on('exit', function () {
	    if (signal) {
	      process.kill(process.pid, signal);
	    } else {
	      process.exit(code);
	    }
	  });
	});
	// terminate children.
	process.on('SIGINT', function () {
	  proc.kill('SIGINT'); // calls runner.abort()
	  proc.kill('SIGTERM'); // if that didn't work, we're probably in an infinite loop, so make it die.
	});
}

function resolveNativeNodeArgumentsIfAny () {
	var path = require('path');
	var args = [path.join(__dirname, 'index.js')];
	var isDebug = false;
	var count = 0;

	process.argv.slice(2).forEach(function (arg) {
		var flag = arg.split('=')[0];
		switch (flag) {
		case '-d':
			args.unshift('--debug');
			break;
		case 'debug':
			args.unshift('--inspect');
			isDebug = true;
			break;
		case '--debug':
		case '--debug-brk':
		case '--inspect':
		case '--inspect-brk':
			args.unshift(arg);	  
			break;
		case '-gc':
		case '--expose-gc':
			args.unshift('--expose-gc');
			break;
		case '--gc-global':
		case '--es_staging':
		case '--no-deprecation':
		case '--no-warnings':
		case '--prof':
		case '--log-timer-events':
		case '--throw-deprecation':
		case '--trace-deprecation':
		case '--trace-warnings':
		case '--use_strict':
		case '--allow-natives-syntax':
		case '--perf-basic-prof':
		case '--napi-modules':
			args.unshift(arg);
			break;
		default:
			if (arg.indexOf('--harmony') === 0) {
				args.unshift(arg);
			} else if (arg.indexOf('--trace') === 0) {
				args.unshift(arg);
			} else if (arg.indexOf('--icu-data-dir') === 0) {
				args.unshift(arg);
			} else if (arg.indexOf('--max-old-space-size') === 0) {
				args.unshift(arg);
			} else if (arg.indexOf('--preserve-symlinks') === 0) {
				args.unshift(arg);
			} else {
				count++;
				args.push(arg);
			}
			break;
	  }
	});
	if (args.length === count + 1) {
		return null;
	}
	if (isDebug) {
		args.push('--debugger');
	}
	return args;
}

