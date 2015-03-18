Template.regPicSet.helpers({
   regPicURL: function() {

      var pic = Session.get('uploadedImage');
      return Images.find({_id: pic});
   }
});
Template.regPicSet.rendered = function() {
   var pic = Session.get('uploadedImage');
   $('.crop-image > img').cropper({
      aspectRatio: 15/15,
      autoCropArea: 1,
      guides: false,
      highlight: false,
      dragCrop: false,
      movable: false,
      resizable: false
   });
   if(Session.get('refresh') === 1) {
      setTimeout(function() {
         Session.set('refresh', 2);
         Router.go('regPicUpload');
      }, 500);
   }

   if(Session.get('refresh') === 0) {
      Router.go('regPicUpload');
   }
   if(Session.get('refresh') === 2) {
      Session.set('refresh', 0);
   }
};
Template.regPicSet.events({
   'click #getData': function() {
      var croppedData = $('.crop-image > img').cropper('getDataURL');
      Session.set('croppedPic', croppedData);
      Router.go('regReview');
   },
   'click #back': function(e, template) {
      e.preventDefault();
      // Session.set('refresh', 0);
      Router.go('regPicUpload');
   }
});
