Questions = new Meteor.Collection('questions');

Meteor.methods({
	question: function(qAttr) {
		var user = Meteor.user();

		if(!user) {
			throw new Meteor.Error(401, "Login first.");
		}

		if(!qAttr.heading) {
			throw new Meteor.Error(422, "Enter a heading for the Question.");
		}
		if(!qAttr.question) {
			throw new Meteor.Error(422, "Ask something.");
		}

		var theQuestion = _.extend(qAttr, {
			askerId: user._id,
			askedBy: user.username,
			submitted: new Date().getTime(),
			answersCount: 0,
			solved: false
		});

		var qId = Questions.insert(theQuestion);

		return {
			_id: qId
		};
	},
	solvedQuestion: function(sAttr) {
		Questions.update({_id: sAttr}, {$set: {solved: true}});
	}
});