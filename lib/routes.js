Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return [Meteor.subscribe('notifications'), Meteor.subscribe('userStuff'), Meteor.subscribe('chatNotification')]; },
	progressSpinner: false
});

PostsListController =  RouteController.extend({
	template: 'postsList',
	increment: 3,
	limit: function() {	
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.limit()};
	},
	subscriptions: function() {
		this.postsSub = Meteor.subscribe('posts', this.findOptions());
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.posts().count() === this.limit();
		var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
		return { 
			posts: this.posts(),
			ready: this.postsSub.ready,
			nextPath: hasMore ? nextPath : null
		};
	}
});

Router.route('/questions/:_id', {
	name: 'theQuestion',
	waitOn: function() {
		return [Meteor.subscribe('questions'), Meteor.subscribe('answers', this.params._id), Meteor.subscribe('votes', this.params._id)];
	},
	data: function() { return Questions.findOne(this.params._id) }
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

Router.route('/register', {
	name: 'register',
	disableProgress: true
});

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

Router.route('/acProfile', {
	name: 'acProfile',
	disableProgress: true
});

Router.route('/studentProfile', {
	name: 'studentProfile',
	disableProgress: true
});

Router.route('/teacherProfile', {
	name: 'teacherProfile',
	disableProgress: true
});

Router.route('/:postsLimit?', {
	name: 'postsList'
});


/*Router.map(function() {
	this.route('postsList', {
		path: '/:postsLimit?',
		controller: PostsListController
	});
});*/

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
}

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});