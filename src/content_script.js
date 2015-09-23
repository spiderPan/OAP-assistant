(function () {
    jQuery(function ($) {
        var thisUrl = document.URL;
        if (thisUrl.indexOf('oap.apprenticelms.ca') < 0) {
            return;
        }

        if (thisUrl.indexOf('quiz/review') >= 0) {
            //Review Page
            SetLocalStorage();
        }

        if (thisUrl.indexOf('quiz/attempt') >= 0) {
            //Quiz Page
            CheckReviewInfo();
        }

        function SetLocalStorage() {
            var cachedInfo = GetLocalStorage(),
                reviewInfo = GetReviewInfo();

            if (null === cachedInfo) {
                cachedInfo = {};
            }

            for (var i in cachedInfo) {
                if (reviewInfo.hasOwnProperty(i)) {
                    delete reviewInfo.i;
                }
            }

            /*TODO: compare the two objects and delete the duplicated keys then merged into the localStorage*/
            $.extend(cachedInfo, reviewInfo);
            localStorage.setItem('OAP-info', JSON.stringify(cachedInfo));
        }

        function CheckReviewInfo() {
            var questionList = $('.deferredfeedback'),
                cachedInfo   = GetLocalStorage();

            questionList.each(function (e) {
                var _this       = $(this),
                    questions   = _this.find('.qtext p').html().trim(),
                    answers     = _this.find('.answer .r0, .answer .r1'),
                    contentWrap = _this.find('.content');

                for (var q in cachedInfo) {
                    if (questions == q) {
                        /*TODO: Improve comparison*/
                        contentWrap.append('<p class="outcome">DUDE! <strong>' + cachedInfo[q] + '</strong></p>');
                        var correctAnswer = cachedInfo[q].replace('The correct answer is', '').replace(/'/g, '').replace(':', '').replace('.', '').trim();

                        //TODO: Highlight the correct result
                        answers.each(function (e) {
                            var _that       = $(this),
                                answerLabel = _that.find('label').html().trim();

                            if (answerLabel.indexOf(correctAnswer) > -1) {
                                _that.addClass('correct');
                            }

                        });
                    }
                }

            });

        }

        function GetReviewInfo() {
            var resultLists = $('.deferredfeedback'),
                reviewInfo  = {};

            resultLists.each(function (e) {
                var _this     = $(this),
                    questions = _this.find('.qtext p').html().trim(),
                    answer    = _this.find('.rightanswer').html().trim();
                reviewInfo[questions] = answer;
            });

            console.log(reviewInfo);
            return reviewInfo;
        }

        function GetLocalStorage() {
            var cachedInfo = localStorage.getItem('OAP-info');

            if (cachedInfo) {
                return JSON.parse(cachedInfo);
            } else {
                localStorage.setItem('OAP-info', null);
                return {};
            }
        }
    });

})();
