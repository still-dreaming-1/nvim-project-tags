var fmt = require('util').format,
	numCalls = 0

function incrementCalls() {
	if ( numCalls == 5 ) {
		throw new Error('Too many calls!')
	}
	numCalls++
} 

plugin.commandSync('SayHello', {
	range: '',
	nargs: '*'
}, function(nvim, args, range, cb) {
	try {
		incrementCalls()
		nvim.setCurrentLine('hello', cb)
		// nvim.setCurrentLine(
		// 	fmt('Command: Called', numCalls, 'times, args:', args, 'range:', range),
		// 	cb )
	} catch(err) {
		cb(err)
	}
})

plugin.autocmdSync('BufEnter', {
	pattern: '*.js'
}, function(nvim, cb) {
	try {
		incrementCalls()
		nvim.setCurrentLine(
			'I am a JavaScript file! Stole your line!',
			cb
		)
	} catch (err) {
		cb(err)
	}
})

plugin.function('ReplaceLineWithJunk', function( nvim, args ) {
	try {
		nvim.setCurrentLine('kdjfkdjfkdjfkdjkd')
	} catch (err) {}
})
