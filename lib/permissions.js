ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
};
hasChat = function(userId, doc) {
	return doc && doc.receiver === userId;
};
isUser = function(userId) {
	if(userId){
		return true;
	}
};
