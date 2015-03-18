Images = new FS.Collection('images', {
   stores: [new FS.Store.FileSystem('images', {path: "./media/images/"})]
});

Images.allow({
   download: function() {
      return true;
   },
   insert: function() {
      return true;
   },
   update: function() {
      return true;
   },
   remove: function() {
      return true;
   }
});
