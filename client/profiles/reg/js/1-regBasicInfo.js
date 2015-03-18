// Template.regBasicInfo.helpers({
// 	userType: function() {
// 		return Session.get('selected');
// 	}
// });
//
// Template.regBasicInfo.events({
// 	'change .selType': function() {
// 		var selectedOption = $('.selType').val();
//
// 		if(selectedOption === 'student') {
// 			Session.set('selected', true);
//
// 		}
// 		else {
// 			Session.set('selected', false);
// 		}
// 	},
// 	'submit form': function(event, template) {
// 		event.preventDefault();
//
// 		var username = template.find('[name=username]').value;
// 		var password = template.find('[name=password]').value;
// 		var confirm = template.find('[name=confirm]').value;
// 		var type = template.find('[name=stdType]').value;
// 		var dept = template.find('[name=department]').value;
// 		var newUser;
// 		var newStuff;
//
//
// 		if(password === confirm) {
// 			if(type === 'student') {
// 				var level = template.find('[name=level]').value;
// 				var session = template.find('[name=session]').value;
// 				var semester = template.find('[name=semester]').value;
//
// 				newUser = {
// 					username: username,
// 					password: password
// 				};
// 				newStuff = {
// 					username: username,
// 					type: type,
// 					dept: dept,
// 					level: level,
// 					session: session,
// 					semester: semester
// 				};
// 			}
// 			else {
// 				var subjects = [];
// 				$('#subjects :checked').each(function() {
// 					subjects.push($(this).val());
// 				});
// 				newUser = {
// 					username: username,
// 					password: password
// 				};
// 				newStuff = {
// 					username: username,
// 					type: type,
// 					dept: dept,
// 					subjects: subjects
// 				};
// 			}
//
// 			Meteor.call('createNewUser', newUser, function(error, result) {
// 				if (error) {
// 					throwError(error.reason);
// 				}
// 				else {
// 					stuff = _.extend(newStuff, {
// 						userId: result
// 					});
// 					Meteor.call('addUserStuff', stuff, function(error, result) {
// 						if(error) {
// 							throwError(error.reason);
// 						}
// 						else {
// 							Router.go('/');
// 						}
// 					});
// 				}
// 			});
// 		}
// 	},
// 	'change .upload': function() {
// 		var fileObj = [];
// 		var files = $('.upload')[0].files[0];
// 		fileObj.push(Images.insert(files));
// 		$('#cropModal').modal('show');
// 		$('.crop-image > img').cropper({
// 			aspectRatio: 16 / 9,
// 			autoCropArea: 0.5,
// 			guides: false,
// 			highlight: false,
// 			dragCrop: false,
// 			movable: false,
// 			resizable: false
// 		});
// 		// for(var i = 0; i < files.length; i++) {
// 		// 	fileObj.push(Images.insert(files[i]));
// 		// }
// 	}
// });
Template.regBasicInfo.helpers({
	length: function() {
		var length = Session.get('passwordLength');
		if (length < 8) {
			return "Allowed 8 characters minimum.";
		} else {
			return "";
		}
	},
	usernameMsg: function() {
		return Session.get('usernameMsg');
	}
});

Template.regBasicInfo.events({
	'focusout #username': function() {
		if($('#username').val() === "") {
			$('#username').css('border-color', '#E96686');
		} else {
			var username = $('#username').val();
			if(UserStuff.find({username:username}).count() > 0) {
				Session.set('usernameMsg', 'Username already exists.');
				$('#username').css('border-color', '#ccc');
			} else {
				Session.set("username", username);
				Session.set('usernameMsg', '');
			}
		}
	},
	'focusout #confirm': function() {
		if($('#confirm').val() === "") {
			$('#confirm').css('border-color', '#E96686');
		} else {
			Session.set("confirm", $('#confirm').val());
			$('#confirm').css('border-color', '#ccc');
		}
	},
	'focusout #password': function() {
		if($('#password').val() === "") {
			$('#password').css('border-color', '#E96686');
		} else {
			Session.set("password", $('#password').val());
			$('#password').css('border-color', '#ccc');
		}
	},
	'keyup #password': function() {
		var length = $("#password").val().replace(/ /g,'').length;
		Session.set('passwordLength', length);
	},
	'focusout .selType': function() {
		if($('.selType').val() === "") {
			$('.selType').css('border-color', '#E96686');
		} else {
			Session.set("selType", $('.selType').val());
			$('.selType').css('border-color', '#ccc');
		}
	},
	'click #next': function(event, template) {
		event.preventDefault();
		var username = $('[name=username]').val();
		var password = $('[name=password]').val();
		var confirm = $('[name=confirm]').val();
		var selType = $('[name=stdType]').val();
		if(password === "" || confirm === "" || username === "" || selType === "") {
			throwError("Please fill all fields.");
		} else {
			if(Session.get('passwordLength') < 8) {
				throwError("Password is too short.");
			} else {
				if(password === confirm) {
					Router.go('regUserType');
				} else {
					throwError("Passwords don't match.");
				}
			}
		}
	}
});
