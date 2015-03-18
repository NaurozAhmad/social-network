UserStuff = new Meteor.Collection('userStuff');

UserStuff.allow({
	update: ownsDocument
});

Meteor.methods({
	createNewUser: function(userAttr) {
		if(!userAttr.username) {
			throw new Meteor.Error(422, "Enter Username.");
		}
		if(!userAttr.password) {
			throw new Meteor.Error(422, "Enter Password.");
		}

		var userId = Accounts.createUser(userAttr);

		return userId;
	},
	addUserStuff: function(stuffAttr) {
		if(stuffAttr.type === "student") {
			if(!stuffAttr.dept) {
				throw new Meteor.Error(422, "Choose a department.");
			}
			if(!stuffAttr.level) {
				throw new Meteor.Error(422, "Choose a level.");
			}
			if(!stuffAttr.session) {
				throw new Meteor.Error(422, "Enter session.");
			}
			if (!stuffAttr.semester) {
				throw new Meteor.Error(422, "Choose a semester.");
			}
		}
		else {
			if(!stuffAttr.dept) {
				throw new Meteor.Error(422, "Choose a department.");
			}
			if(!stuffAttr.subjects) {
				throw new Meteor.Error(422, "Choose at least one subject.");
			}
		}

		var newStuff = _.extend(stuffAttr, {
			created: new Date().getTime()
		});

		var newId = UserStuff.insert(newStuff);

		return newId;
	}
});
