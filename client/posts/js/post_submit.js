Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			title: $(e.target).find('[name=title]').val(),
			content: $(e.target).find('[name=content]').val()
		}

		Meteor.call('post', post, function(error, result) {
			if (error) {
				throwError(error.reason);
			}
			else {
				Router.go('postPage', {_id: result._id});
			}
		});
	},
	'change .image-upload': function(e, template) {
		var files = event.target.files;
		for(var i = 0, length = files.length; i < length; i++) {
			Images.insert(files[i], function (err, fileObj) {
				if (err) {
					alert(err);
				}
			});
		}
	}
});