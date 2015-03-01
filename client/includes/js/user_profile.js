Template.acProfile.helpers({
	userType: function() {
		return Session.get('selected');
	}
});

Template.acProfile.events({
	'change .selType': function() {
		var selectedOption = $('.selType').val();
		
		if(selectedOption === 'student') {
			console.log("True");
			Session.set('selected', true);
			
		}
		else {
			console.log("False");
			Session.set('selected', false);
		}
	}
});