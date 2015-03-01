throwError = function(message) {
	Errors.insert({message: message, seen: false})
};