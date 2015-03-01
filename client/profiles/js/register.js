Template.register.helpers({
	userType: function() {
		return Session.get('selected');
	}
});

Template.register.events({
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
	},
	'submit form': function(event, template) {
		event.preventDefault();

		var username = template.find('[name=username]').value;
		var password = template.find('[name=password]').value;
		var confirm = template.find('[name=confirm]').value;
		var type = template.find('[name=stdType]').value;
		var dept = template.find('[name=department]').value;
		
		

		if(password === confirm) {
			if(type === 'student') {
				var level = template.find('[name=level]').value;
				var session = template.find('[name=session]').value;
				var semester = template.find('[name=semester]').value;
				
				var newUser = {
					username: username,
					password: password
				};
				var newStuff = {
					username: username,
					type: type,
					dept: dept,
					level: level,
					session: session,
					semester: semester
				}
			}
			else {
				var subjects = [];
				$('#subjects :checked').each(function() {
					subjects.push($(this).val());
				});
				var newUser = {
					username: username,
					password: password
				}
				var newStuff = {
					username: username,
					type: type,
					dept: dept,
					subjects: subjects
				}
			}
			
			Meteor.call('createNewUser', newUser, function(error, result) {
				if (error) {
					throwError(error.reason);
				}
				else {
					stuff = _.extend(newStuff, {
						userId: result
					});
					Meteor.call('addUserStuff', stuff, function(error, result) {
						if(error) {
							throwError(error.reason);
						}
						else {
							Router.go('/');
						}
					});
				}
			})
		}
	}
});