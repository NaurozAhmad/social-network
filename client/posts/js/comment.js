Template.comment.helpers({
	submittedText: function() {
		return moment(new Date(this.submitted)).fromNow();
	}
})