Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();



		var post = {
			title: $(e.target).find('[name=title]').val(),
			content: $(e.target).find('[name=content]').val(),
			images: Session.get('imagesURL')
		};

		var data = {
			post: post
		};

		Meteor.call('post', data, function(error, result) {
			if (error) {
				throwError(error.reason);
			}
			else {
				// var fileObj = [];
				// var files = $('.image-upload').get(0).files;
				//
				// for(var i = 0; i < files.length; i++) {
				// 	fileObj.push(Images.insert(files[i]));
				
				// }
				// var filePost = {
				// 	postId: result._id,
				// 	files: fileObj
				// };
				// FilePost.insert(filePost);
				Router.go('postPage', {_id: result._id});
			}
		});
	}
});
