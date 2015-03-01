Template.questions.helpers({
	questions: function() {
		return Questions.find({},{sort: {submitted: -1}});
	},
	submitted: function() {
		return moment(new Date(this.submitted)).fromNow();
	}
})