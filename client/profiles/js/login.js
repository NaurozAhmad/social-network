Template.login.helpers({
	loginMessage: function() {
		return Session.get('loginMessage');
	}
})
Template.login.events({
	'submit form': function(event, template) {
		event.preventDefault();

		var userName = template.find('#login-user').value;
		var userPass = template.find('#login-pass').value;
		console.log("Logged In");
		if(Meteor.loginWithPassword(userName, userPass)) {
			Session.setDefault('loginMessage', '');
		}
		else {
			Session.set('loginMessage', 'Wrong ID or Password.');
		}

	}
})
