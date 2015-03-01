Meteor.publish('posts', function(options) {
	return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
	return Posts.find(id)
});

Meteor.publish('comments', function(postId) {
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});

Meteor.publish('userStuff', function() {
	return UserStuff.find();
});

Meteor.publish('chat', function(userId) {
	return Chat.find({$or: [{sender: userId}, {receiver: userId}] });
});

Meteor.publish('oneUserStuff', function(userId) {
	return UserStuff.find({userId: userId});
});

Meteor.publish('chatNotification', function() {
	return ChatNotification.find({receiver: this.userId});
});

Meteor.publish('questions', function() {
	return Questions.find();
});

Meteor.publish('answers', function(qId) {
	return Answers.find({ansFor: qId});
});

Meteor.publish('tags', function() {
	return Tags.find();
});

Meteor.publish('votes', function(questId) {
	return Votes.find({qId: questId})
})