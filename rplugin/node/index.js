// plugin let's you register new commands, autocommands, and functions. You pass callbacks that get run when that command/autocmd/function gets run. if you add 'Sync' to the end of theme
// method name, it will run synchronously. Otherwise, the code runs asynchronously by default. So the methods are:
// plugin.command() // define a command
// plugin.commandSync()
// plugin.autocmd() // define an autocmd
// plugin.autocmdSync()
// plugin.function() // define a function
// plugin.functionSync()
//
// nvim is another significant thing for interacting with Neovim. An object named nvim gets passed to your callback functions. You can use its methods to interact with Neovim. The
// methods are generated from the Neovim api. You can see the api in the Neovim c code at: https://github.com/neovim/neovim/tree/master/src/nvim/api
// Also, here is some relevant documentation in the help :h msgpack_rpc
// That provides this command you can run from a terminal to see some output of the API: 
// nvim --api-info | python -c 'import msgpack, sys, yaml; print yaml.dump(msgpack.unpackb(sys.stdin.read()))'
//
// Here are some examples of methods you can call:
//
// nvim.setCurrentLine() // example usage inside node-host README
// nvim.delCurrentLine()
// nvim.getCurrentBuffer() // example usage inside node-host/examples/demo_beautify_css.js/index.js
// nvim.command() // executes a command
var fmt = require('util').format,
	numCalls = 0

// function incrementCalls() {
// 	if ( numCalls == 5 ) {
// 		throw new Error('Too many calls!')
// 	}
// 	numCalls++
// } 

plugin.commandSync('SayHello', {
	range: '',
	nargs: '*'
}, function(nvim, args, range, cb) {
	try {
		// incrementCalls()
		nvim.setCurrentLine('hello', cb)
	} catch(err) {
		cb(err)
	}
})

plugin.commandSync('PrintAPIMethods', {
	range: '',
	nargs: '*'
}, function(nvim, args, range, cb) {
	try {
		nvim.command("echo 'called an API method'", cb)
		var propertyNames= Object.getOwnPropertyNames(nvim)
		nvim.command("echo '" + propertyNames + "'", cb)
	} catch(err) {
		cb(err)
	}
})

plugin.commandSync('DeleteLine', {
	range: '',
	nargs: '*'
}, function(nvim, args, range, cb) {
	try {
		nvim.delCurrentLine(cb)
	} catch(err) {
		cb(err)
	}
})

plugin.commandSync('AltDeleteLine', {
	range: '',
	nargs: '*'
}, function(nvim, args, range, cb) {
	try {
		nvim.command('DeleteLine', cb)
	} catch(err) {
		cb(err)
	}
})

plugin.commandSync('EchoBufferLineCount', {
	range: '',
	nargs: '*'
}, function(nvim, args, range, cb) {
	try {
		var currentBuffer= nvim.getCurrentBuffer(cb)
		var lineCount= nvim.GetBufferLineCount(currentBuffer, cb)
		nvim.command("echo " + lineCount)
	} catch(err) {
		cb(err)
	}
})

// plugin.autocmdSync('BufEnter', {
// 	pattern: '*.js'
// }, function(nvim, cb) {
// 	try {
// 		nvim.setCurrentLine(
// 			'I am a JavaScript file! Stole your line!',
// 			cb
// 		)
// 	} catch (err) {
// 		cb(err)
// 	}
// })

plugin.function('ReplaceLineWithJunk', function( nvim, args ) {
	try {
		nvim.setCurrentLine('kdjfkdjfkdjfkdjkd')
	} catch (err) {}
})
