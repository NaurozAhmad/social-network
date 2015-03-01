Template.chat.helpers({
	chatPM: function() {
		var receiver = Session.get('chatter');
		var dataArray = [];
		dataArray.push(Meteor.userId());
		dataArray.push(receiver);
		var data = Chat.find({sender: {$in: dataArray}, receiver: {$in: dataArray}});
		/*if(data['sender'] === receiver) {
			Session.set('me', 'yes');
		}
		else {
			Session.set('me', 'no');
		}*/

		return data;
	},
	who: function() {
		Session.get('theId');
	},
	time: function() {
		return moment(new Date(this.time)).fromNow();
	}
});

Template.chat.events({
	'click .btn': function(event, template) {
		event.preventDefault();

		var pm = {
			message: $('.message').val(),
			receiver: Session.get('chatter')
		};

		Meteor.call('sendPM', pm, function(error, result) {
			if(error) {
				throwError(error.reason);
			}
			else {
				$('.message').val('');
			}
		})
	},
	'keydown .message': function(event, template) {

		if(event.keyCode === 13) {
			event.preventDefault();
			var pm = {
				message: $('.message').val(),
				receiver: Session.get('chatter')
			};

			Meteor.call('sendPM', pm, function(error, result) {
				if(error) {
					throwError(error.reason);
				}
				else {
					$('.message').val('');
				}
			})
		}
	}
})