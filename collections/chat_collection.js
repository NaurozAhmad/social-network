Chat = new Meteor.Collection('chat');

Meteor.methods({
	sendPM: function(pmAttr) {
		var user = Meteor.user();

		if(!pmAttr.message) {
			throw new Meteor.Error(422, "Say Something");
		}

		var array = [];
		array.push(user._id);
		array.push(pmAttr.receiver);

		pm = _.extend(pmAttr, {
			sender: user._id,
			sendername: user.username,
			people: array,
			time: new Date().getTime()
		});

		pm._id = Chat.insert(pm);

		createChatNotification(pm);

		return pm._id;
	}
})