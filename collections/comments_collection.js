Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttr) {
		var user = Meteor.user();
		var post = Posts.findOne(commentAttr.postId);

		if (!user) {
			throw new Meteor.Error(401, "You have to login to leave a comment.");
		}
		if (!commentAttr.body) {
			throw new Meteor.Error(422, "Write something in the body.");
		}
		if (!post) {
			throw new Meteor.Error(422, "You must comment on a post.");
		}

		comment = _.extend(commentAttr, {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		Posts.update(comment.postId, {$inc: {commentsCount: 1}});
		comment._id = Comments.insert(comment);

		createCommentNotification(comment);

		return comment._id;
	}
});