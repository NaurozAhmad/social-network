Tags = new Meteor.Collection('tags');

Tags.allow({
  insert: function (userId, doc) {
    return true;
  }
})