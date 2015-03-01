Template.theQuestion.helpers({
	submitted: function() {
		Session.set('askerId', this.askerId);
		Session.set('askedQuestion', this._id);
		return moment(new Date(this.submitted)).fromNow();
	},
	answerCount: function() {
		if(Answers.find().count() > 0) {
			return true;
		}
	},
	answers: function() {
		return Answers.find({}, {sort: {votes: -1, submitted: -1}});
	}
})