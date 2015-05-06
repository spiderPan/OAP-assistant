(function() {
    jQuery(function($) {
        var thisUrl = document.URL;
        if (thisUrl.indexOf('oap.apprenticelms.ca') < 0) {
            return;
        }

        if (thisUrl.indexOf('quiz/review') >= 0) {
            //Review Page
			SetLocalStorage();
        }

		
		if(thisUrl.indexOf('quiz/attempt') >= 0){
			 //Quiz Page
			CheckReviewInfo();
		}
        
		function SetLocalStorage(){
			var cachedInfo = GetLocalStorage(),
				reviewInfo = GetReviewInfo();
			  
			  
			// for(var i=0; i< reviewInfo.length; i++){
				// for(var j = 0; j<cachedInfo.length; j++){
					// if(reviewInfo[i]==cachedInfo[i]){
					 // continue;
					// }
				// }
				
			// }
			/*TODO: compare the two arrays and delete the duplicated one and set the merged into the localStorage*/	
			$.extend( cachedInfo, reviewInfo );
			localStorage.setItem('OAP-info', JSON.stringify(cachedInfo));			
        }
		
		function CheckReviewInfo(){
			var questionList = $('.deferredfeedback'),
			    cachedInfo = GetLocalStorage();
			
			questionList.each(function(e){
				var _this = $(this),
				questions = _this.find('.qtext p').html().trim(),
				contentWrap = _this.find('.content');	
				
				for(var q in cachedInfo){
					if(questions == q){
						/*TODO: Improve comparison*/
						contentWrap.append('<p class="outcome">DUDE! <strong>'+cachedInfo[q]+'</strong></p>');
						
						//TODO: Highlight the correct result
						
					}
				}
				
						
			});
			
			
		}
		
		function GetReviewInfo(){
			var resultLists = $('.deferredfeedback'),
			reviewInfo = {};
			
			resultLists.each(function(e){
				var _this = $(this),
				questions = _this.find('.qtext p').html().trim(),
				answer = _this.find('.rightanswer').html().trim();				
				reviewInfo[questions] = answer;				
			});
			
			console.log(reviewInfo);
			return reviewInfo;
		}
		
		function GetLocalStorage(){
		  var cachedInfo = localStorage.getItem('OAP-info');
		  
		  if(cachedInfo){
			return JSON.parse(cachedInfo);
		  }else{
			localStorage.setItem('OAP-info',{});
			return {};
		  }
		}
    });
    
    
    
    
})();