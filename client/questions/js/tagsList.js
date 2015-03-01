Template.tagsList.helpers({
	tags: function() {
		return Tags.find();
	},
	tagsCount: function() {
		if(Tags.find().count() > 0) {
			return true;
		}
	}
});
