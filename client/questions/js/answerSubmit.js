Template.answerSubmit.events({
	'submit form': function(event) {
		event.preventDefault();

		var ans = {
			answer: $('.answer').val(),
			submitted: new Date(),
			ansFor: this._id
		};

		Meteor.call('answer', ans, function(error, result) {
			if(error) {
				throwError(error.reason);
			}
			else {
				$('.answer').val('');
			}
		})
	}
});

Template.answer.helpers({
	submitted: function() {
		return moment(new Date(this.submitted)).fromNow();
	},
	voted: function() {
		if(Votes.find({votedBy: Meteor.userId(), aId: this._id}).count() > 0) {
			return true;
		}
		else {
			return false;
		}
	},
	theVotes: function() {
		return Votes.find({votedBy: Meteor.userId(), aId: this._id});
	},
	ownQuestion: function() {
		var askerId = Session.get('askerId');
		if(askerId == Meteor.userId()) {
			return true;
		}
		else {
			return false;
		}
	}
});

Template.answer.events({
	'click #upvote': function(e) {
		e.preventDefault();
		Answers.update({_id: this._id}, {$inc: {votes: 1}});

		var voter = {
			vote: 'upvoted',
			qId: this.ansFor,
			aId: this._id
		};
		Meteor.call('voted', voter, function(error, result) {
			if(error) {
				throwError(error.reason);
			}
		});
	},
	'click #downvote': function(e) {
		e.preventDefault();
		Answers.update({_id: this._id}, {$inc: {votes: -1}});

		var voter = {
			vote: 'downvoted',
			qId: this.ansFor,
			aId: this._id
		};
		Meteor.call('voted', voter, function(error, result) {
			if(error) {
				throwError(error.reason);
			}
		});
	},
	'click .removeUpvote': function(e) {
		e.preventDefault();
		if(this.vote === "upvoted") {
			Answers.update({_id: this.aId}, {$inc: {votes: -1}});
		}
		else {
			Answers.update({_id: this.aId}, {$inc: {votes: 1}});
		}
		Meteor.call('removeUpvote', this._id, function(error, result) {
			if(error) {
				throwError(error.reason);
			}
		});
	},
	'click .rightAnswer': function() {
		var sId = Session.get('askedQuestion');
		Meteor.call('solvedQuestion', sId, function(error, result) {
			if(error) {
				throwError(error.reason);
			}
			else {
				Router.go('questions');
			}
		});
	}
});
