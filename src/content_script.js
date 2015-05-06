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
			reviewInfo = [];
			
			resultLists.each(function(e){
				var _this = $(this),
				questions = _this.find('.qtext p').html(),
				answer = _this.find('.rightanswer').html(),
				qaObj = {};
				
				qaObj[questions] = answer;

				reviewInfo.push(qaObj);
				
			});
			
			console.log(reviewInfo);
			return reviewInfo;
		}
    });
    
    function SetLocalStorage(){
      var cachedInfo = GetLocalStorage(),
          reviewInfo = GetReviewInfo();
          
          
     /* for(var i=0; i< reviewInfo.length; i++){
				    if(reviewInfo[i]==qaObj){
				      continue;
				    }
				}*/
				
			/*TODO: compare the two arrays and delete the duplicated one and set the merged into the localStorage*/	
    }
    
    function GetLocalStorage(){
      var cachedInfo = localStorage.getItem('OAP-info');
      
      if(cachedInfo){
        return cachedInfo;
      }else{
        localStorage.setItem('OAP-info',[]);
        return [];
      }
    }
})();