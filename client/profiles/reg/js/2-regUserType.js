Template.regUserType.helpers({
   userType: function() {
      var type = Session.get('selType');
      if(type === "student") {
         return true;
      } else if(type === "teacher"){
         return false;
      } else {
         Router.go('regBasicInfo');
      }
   }
});
Template.regUserType.events({
   'click #next': function(event, template) {
      event.preventDefault();
      var type = Session.get('selType');
      if(type === "student") {
         var dept = $('[name=department]').val();
         var level = $('[name=level]').val();
         var session = $('[name=session]').val();
         var semester = $('[name=semester]').val();

         if(dept === "" || level === "" || session === "" || semester === "") {
            throwError("Please fill everything.");
         } else {
            Session.set('dept', dept);
            Session.set('level', level);
            Session.set('session', session);
            Session.set('semester', semester);
            Router.go('regPicUpload');
         }
      } else {
         var tDept = $('[name=department]').val();
         var subjects = [];
         $('#subjects :checked').each(function() {
            subjects.push($(this).val());
         });
         if(tDept === "" || subjects.length === 0) {
            throwError("Please fill everything.");
         } else {
            Session.set('dept',tDept);
            Session.set('subjects', subjects);
            Router.go('regPicUpload');
         }
      }
   }
});
