Template.regReview.helpers({
   finalPic: function() {
      if(Session.get('croppedPic') !== "none") {
         return Session.get('croppedPic');
      } else {
         return '/images/default-user.png';
      }

   },
   username: function() {
      return Session.get('username');
   },
   userType: function() {
      return Session.get('selType');
   },
   dept: function() {
      return Session.get('dept');
   },
   level: function() {
      return Session.get('level');
   },
   session: function() {
      return Session.get('session');
   },
   semester: function() {
      return Session.get('semester');
   },
   subjects: function() {
      return Session.get('subjects');
   },
   type: function() {
      if(Session.get('selType') === 'student') {
         return true;
      } else {
         return false;
      }
   }
});

Template.regReview.events({
   'click button': function(event, template) {
      event.preventDefault();

      var username = Session.get('username');
      var password = Session.get('password');
      var type = Session.get('selType');
      var dept = Session.get('dept');
      var newUser;
      var newStuff;
      var pic;
      var success;
      var profilePic;
      var picId;

      if(Session.get('croppedPic') !== 'none') {
         pic = $('img').attr('src');
         profilePic = Images.insert(pic);
         picId = profilePic._id;
      } else {
         picId = "";
      }


      if(type === 'student') {
         var level = Session.get('level');
         var session = Session.get('session');
         var semester = Session.get('semester');

         newUser = {
            username: username,
            password: password
         };
         newStuff = {
            username: username,
            type: type,
            dept: dept,
            level: level,
            session: session,
            semester: semester,
            pic: picId
         };
      }
      else {
         var subjects = Session.get('subjects');

         newUser = {
            username: username,
            password: password
         };
         newStuff = {
            username: username,
            type: type,
            dept: dept,
            subjects: subjects,
            pic: picId
         };
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
                  Meteor.loginWithPassword(Session.get('username'), Session.get('password'), function(nope) {
                     if(nope) {
                        throwError(422, "Error while logging in.");
                     }
                  });
                  Router.go('/');
               }
            });
         }
      });

   }
});
