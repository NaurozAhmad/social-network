Votes = new Meteor.Collection('votes');

Meteor.methods({
	voted: function(voteAttr) {
		var user = Meteor.user();

		voted = _.extend(voteAttr, {
			votedBy: user._id
		});

		voted._id = Votes.insert(voted);

		return voted._id;
	},
	removeUpvote: function(removeId) {
		Votes.remove({_id: removeId});
		return true;
	}
})