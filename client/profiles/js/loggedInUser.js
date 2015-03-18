Template.loggedInUser.events({
	'click .logout': function(event) {
		event.preventDefault();
		Meteor.logout();
		Session.set('loginMessage', '');
	}
});

Template.loggedInUser.helpers({
	images: function() {
		var stuff = UserStuff.findOne({userId: Meteor.userId()});
		if(Images.find({_id: stuff.pic}) !== "") {
			return Images.find({_id: stuff.pic});
		} else {

		}

	},
	isProfilePic: function() {
		var stuff = UserStuff.findOne({userId: Meteor.userId()});
		if(stuff.pic !== "") {
			return true;
		} else {
			return false;
		}
	}
});
Template.loggedInUser.rendered = function() {

};
