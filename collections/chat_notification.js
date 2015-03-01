ChatNotification = new Meteor.Collection('chatNotification');

ChatNotification.allow({
	update: hasChat
});

createChatNotification = function(pm) {
	var thePM = Chat.findOne(pm._id);

	ChatNotification.insert({
		sender: thePM.sender,
		senderName: thePM.sendername,
		receiver: thePM.receiver,
		time: thePM.time,
		read: false
	});
	
};