Template.newQuestion.events({
	'keydown .tagsInput': function(e) {
		if(e.keyCode === 188) {			//188 is the keycode for ,
			console.log("Pressed comma");
	    	var string = $('.tagsInput').val();
	    	var nospace = string.replace(/\s/g, '');
	    	var array = nospace.split(',');
	    	var newTags = [];
	    	$.each(array, function( key, value) {
	    		console.log(value);
	    		if($('input[type=checkbox]').val()) {
	    			$('input[type=checkbox]').each(function() {
			    		if(value == $(this).val()) {
			    			console.log($(this).val());
			    			$(this).prop('checked', true);
			    		}
			    		/*else {
			    			console.log(value);
			    			newTags.push(value);
			    			Session.set('newTags', newTags);
			    		}*/
			    	});
	    		}
	    		/*else {
	    			console.log(value);
	    			newTags.push(value);
	    			Session.set('newTags', newTags);
	    		}*/
	    	})
	    }
	},
	'change input[type=checkbox]': function(e) {
		//console.log('clicked');
		var before = $('.tagsInput').val();
		if(before.trim()) {
			var theArray = before.split(',');
			var toBe = [];
			$('input[type=checkbox]').each(function() {
				if($(this).prop('checked')) {
					var checkedValue = $(this).val();
					if( jQuery.inArray(checkedValue, theArray) == -1 ) {
						toBe.push(checkedValue);
						toBe.toString();
						before = before + ',' + toBe;
						$('.tagsInput').val(before);
					}
					else {
						console.log("Value already exists in textbox.");
					}
				}
				else {
					var uncheckedValue = $(this).val();
					if( $.inArray(uncheckedValue, theArray) !== -1 ) {
						theArray = jQuery.grep(theArray, function(value) {
						  return value != uncheckedValue;
						});
						theArray.toString();
						$('.tagsInput').val(theArray);
					}
				}
			})
		}
		else {
			$('input[type=checkbox]').each(function() {
				if($(this).prop('checked')) {
					$('.tagsInput').val($(this).val());
				}
			})
		}
	},
	'submit form': function(e) {
		e.preventDefault();

		var string = $('.tagsInput').val();
    	var nospace = string.replace(/\s/g, '');
    	var array = nospace.split(',');
    	var newTags = [];
    	var available = [];

    	if($('input[type=checkbox]').val()) {
    		$('input[type=checkbox]').each(function() {
    			available.push($(this).val());
    		});
    		$.each(array,function(key,value) {
    			if( $.inArray(value,available) == -1 ) {
    				newTags.push(value);
    			}
    		})
    	}
    	else {
    		$.each(array,function(key,value) {
    			newTags.push(value);
    		})
    	}

		var question = {
			heading: $(e.target).find('[name=heading]').val(),
			question: $(e.target).find('[name=question]').val(),
			tags: array
		}

		Meteor.call('question', question, function(error, result) {
			if (error) {
				throwError(error.reason);
			}
			else {
				for(var i = 0; i < newTags.length; i++) {
					Tags.insert({'tag': newTags[i]});
				}
				Router.go('questions');
			}
		});
	},
})