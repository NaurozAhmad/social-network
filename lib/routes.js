Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [Meteor.subscribe('notifications'), Meteor.subscribe('userStuff'), Meteor.subscribe('chatNotification'), Meteor.subscribe('allImages')]; },
	progressSpinner: false
});


PostsListController =  RouteController.extend({
	template: 'postsList',
	increment: 5,
	limit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.limit()};
	},
	subscriptions: function() {
		this.postsSub = Meteor.subscribe('posts', this.findOptions());
		this.imagesSub = Meteor.subscribe('images', this.findOptions());
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	images: function() {
		return Images.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.posts().count() === this.limit();
		var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
		return {
			posts: this.posts(),
			images: this.images(),
			ready: [this.postsSub.ready, this.imagesSub.ready],
			nextPath: hasMore ? nextPath : null
		};
	}
});

//======================================= Questions Routes =========================================

Router.route('/questions/:_id', {
	name: 'theQuestion',
	waitOn: function() {
		return [Meteor.subscribe('questions'), Meteor.subscribe('answers', this.params._id), Meteor.subscribe('votes', this.params._id)];
	},
	data: function() { return Questions.findOne(this.params._id); }
});

Router.route('/newQuestion', {
	name: 'newQuestion',
	waitOn: function() {
		return [Meteor.subscribe('questions'), Meteor.subscribe('tags')];
	}
});

Router.route('/questions', {
	name: 'questions',
	waitOn: function() {
		return Meteor.subscribe('questions');
	}
});

Router.route('/chat/:userId', {
	name: 'chat',
	waitOn: function() {
		return	Meteor.subscribe('chat', Meteor.userId());
	},
	data: function() { return UserStuff.findOne({userId: this.params.userId}); },
	after: function() {
		Session.set('chatter', this.params.userId);
	}
});

Router.route('/chat_menu', {
	name: 'chatMenu'
});

//======================================== Profile Routes ============================================

Router.route('/reg/cropPic', {
	name: 'regPicSet',
	waitOn: function() {
		return Meteor.subscribe('allImages');
	}
});


Router.route('/reg/choosePic', {
	name: 'regPicUpload',
	waitOn: function() {
		return Meteor.subscribe('allImages');
	}
});

Router.route('/reg/review', {
	name:'regReview',
	disableProgress: true,
	waitOn: function() {
		return Meteor.subscribe('allImages');
	}
});

Router.route('/reg/basicInfo', {
	name: 'regBasicInfo',
	waitOn: function() {
		return Meteor.subscribe('userStuff');
	}
});

Router.route('/reg/userType', {
	name: 'regUserType',
	disableProgress: true
});

Router.route('/profile', {
	name: 'profile',
	disableProgress: true
});

//============================================ Posts Routes ===============================================

Router.route('/posts/:_id', {
	name: 'postPage',
	waitOn: function() {
		return [
			Meteor.subscribe('singlePost', this.params._id),
			Meteor.subscribe('comments', this.params._id)
		];
	},
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	waitOn: function() {
		return Meteor.subscribe('singlePost', this.params._id);
	},
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {
	name: 'postSubmit',
	disableProgress: true
});

Router.route('/:postsLimit?', {
	name: 'postsList'
});

var requireLogin = function() {
	if (! Meteor.user()) {
		if(Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		}
		else {
			this.render('accessDenied');
		}
	}
	else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
