Template.profile.helpers({
	userType: function() {
		return Session.get('selected');
	}
});

Template.profile.events({
	'change .selType': function() {
		var selectedOption = $('.selType').val();

		if(selectedOption === 'student') {
			Session.set('selected', true);

		}
		else {
			Session.set('selected', false);
		}
	}
});
