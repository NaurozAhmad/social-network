Template.regPicUpload.events({
   'change .upload': function() {
      var fileObj;
      var files = $('.upload')[0].files[0];
      fileObj = Images.insert(files);
      Session.set('uploadedImage', fileObj._id);
      Session.set('refresh', 1);
      Router.go('regPicSet');
   },
   'click #skip': function() {
      Session.set('croppedPic', 'none');
      Router.go('regReview');
   }
});
Template.regPicUpload.rendered = function() {
   if(Session.get('dept') === "") {

      Router.go('regUserType');
   }
   if(Session.get('refresh') === 2) {
      Router.go('regPicSet');
   }
};
