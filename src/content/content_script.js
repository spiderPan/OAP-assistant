(function () {
    document.addEventListener('DOMContentLoaded', function () {
        Firebase.enableLogging(true);
        var thisUrl       = document.URL,
            myFirebaseRef = new Firebase('https://resplendent-heat-2275.firebaseio.com/');

        if (thisUrl.indexOf('oap.apprenticelms.ca') < 0) {
            return;
        }

        if (thisUrl.indexOf('/course/view') >= 0) {
            //Course Landing Page
            var courseID = getURLVars('id');
            //TODO:reading data based on ID
            readFireBase();
        }

        if (thisUrl.indexOf('quiz/review') >= 0) {
            //Review Page
            setLocalStorage();
        }

        if (thisUrl.indexOf('quiz/attempt') >= 0) {
            //Quiz Page
            checkReviewInfo();
            readFireBase();
        }

        function setLocalStorage() {
            var cachedInfo = getLocalStorage();
            var reviewInfo = getReviewInfo();

            if (!cachedInfo) {
                cachedInfo = {};
            }

            for (var key in cachedInfo) {
                if (reviewInfo.hasOwnProperty(key)) {
                    delete reviewInfo[key];
                }
            }

            // Merging cachedInfo and reviewInfo into localStorage
            Object.assign(cachedInfo, reviewInfo);
            localStorage.setItem('OAP-info', JSON.stringify(cachedInfo));
        }

        function checkReviewInfo() {
            var questionList = document.querySelectorAll('.deferredfeedback');
                cachedInfo   = getLocalStorage();

            questionList.each(function (e) {
                var questionText = questionElement.querySelector('.qtext p').textContent.trim();
                var answers = questionElement.querySelectorAll('.answer .r0, .answer .r1');
                var contentWrap = questionElement.querySelector('.content');

                for (var question in cachedInfo) {
                    if (questionText === question) {
                        contentWrap.insertAdjacentHTML('beforeend', '<p class="outcome">DUDE! <strong>' + cachedInfo[question] + '</strong></p>');
                        var correctAnswer = cachedInfo[question]
                            .replace('The correct answer is', '')
                            .replace(/'/g, '')
                            .replace(':', '')
                            .replace('.', '')
                            .trim();

                        // Highlight the correct result
                        answers.forEach(function (answerElement) {
                            var answerLabel = answerElement.querySelector('label').textContent.trim();
                            if (answerLabel.includes(correctAnswer)) {
                                answerElement.classList.add('correct');
                            }
                        });
                    }
                }
            });

        }

        function getReviewInfo() {
            var resultLists = document.querySelectorAll('.deferredfeedback');
            var reviewInfo = {};

            resultLists.forEach(function (resultElement) {
                var questionText = resultElement.querySelector('.qtext p').textContent.trim();
                var answerText = resultElement.querySelector('.rightanswer').textContent.trim();
                reviewInfo[questionText] = answerText;
            });

            console.log(reviewInfo);
            return reviewInfo;
        }

        function getLocalStorage() {
            var cachedInfo = localStorage.getItem('OAP-info');

            if (cachedInfo) {
                return JSON.parse(cachedInfo);
            } else {
                localStorage.setItem('OAP-info', null);
                return {};
            }
        }

        function readFireBase(id) {
            myFirebaseRef.child("location").on("value", function (snapshot) {

            });
        }

        function getURLVars(name) {
            var vars   = [],
                hash,
                hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }

            return name && vars[name] || vars;
        }
    });
})();
