Template.chatNotifications.helpers({
	chatNotifs: function() {
		return ChatNotification.find({receiver: Meteor.userId(), read: false});
	},
	chatCount: function() {
		return ChatNotification.find({receiver: Meteor.userId(), read: false}).count();
	}
});

Template.chatNotif.helpers({
	chatNotifPath: function() {
		return Router.routes.chat.path({userId: this.sender});
	}
})

Template.chatNotif.events({
	'click a': function() {
		ChatNotification.update(this._id, {$set: {read: true}});
	}
})