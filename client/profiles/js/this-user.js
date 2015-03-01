Template.thisUser.events({
	'click .logout': function(event) {
		event.preventDefault();
		Meteor.logout();
		Session.set('loginMessage', '');
	}
})