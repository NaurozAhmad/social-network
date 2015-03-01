Answers = new Meteor.Collection('answers');

Answers.allow({
	update: function() {
		if(Meteor.user()) {
			return true;
		}
	}
});

Meteor.methods({
	answer: function(ansAttr) {
		var user = Meteor.user();

		if(!ansAttr.answer) {
			throw new Meteor.Error(422, "Say Something");
		}

		ans = _.extend(ansAttr, {
			author: user._id,
			authName: user.username,
			submitted: new Date().getTime(),
			votes: 0,
			right: false
		});

		ans._id = Answers.insert(ans);
		Questions.update({_id: ansAttr.ansFor}, {$inc: {answersCount: 1}})
		return ans._id;
	}
})