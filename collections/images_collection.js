var Images = new FS.Collection('images', {
   stores: [new FS.Store.FileSystem('images', {path: "~/client/media/images"})]
});

Images.allow({
   download: isUser
});
