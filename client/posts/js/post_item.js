Template.postItem.helpers({
	submittedText: function() {
		return moment(new Date(this.submitted)).fromNow();
	},
	ownPost: function() {
		return this.userId == Meteor.userId();
	}
})