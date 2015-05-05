(function() {
    jQuery(function($) {
        var thisUrl = document.URL;
        if (thisUrl.indexOf('oap.apprenticelms.ca') < 0) {
            return;
        }

        if (thisUrl.indexOf('quiz/review') >= 0) {
            //Review Page
			GetReviewInfo();
        }
        console.log('gogogo OAP');
        
		function GetReviewInfo(){
			var resultLists = $('.deferredfeedback'),
			resultsArray = [];
			
			resultLists.each(function(e){
				var _this = $(this),
				questions = _this.find('.qtext p').html(),
				answer = _this.find('.rightanswer').html(),
				qaObj = {};
				
				qaObj[questions] = answer;
				
				resultsArray.push(qaObj);
				
			});
			
			console.log(resultsArray);
			
		}
    });
})();