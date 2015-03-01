Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument,
});

Posts.deny({
	update: function(userId, post, fieldNames) {
		return (_.without(fieldNames, 'title', 'content').length > 0);
	}
});

Meteor.methods({
	post: function(postAttr) {
		var user = Meteor.user();

		if(!user) {
			throw new Meteor.Error(401, "Login first.");
		}

		if(!postAttr.title) {
			throw new Meteor.Error(422, "Enter a title for the post.");
		}
		if(!postAttr.content) {
			throw new Meteor.Error(422, "Say something.");
		}

		var post = _.extend(postAttr, {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			commentsCount: 0
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});
