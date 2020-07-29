'use strict';

(function () {

  var ads;

  var getWithinMapArr = window.filters.getWithinMapArr;

  var url = 'https://javascript.pages.academy/keksobooking/data';

  var onError = function (message) {
    var msg = '<div class="customError" style="width:100%; height:100px; background-color:red;position:fixed; top:0;left:0;color:white;z-index:10000; font-size: 26px;display: flex;justify-content: center;align-items:center;font-weight:bold;">' + message + '</div>';
    document.body.insertAdjacentHTML('afterbegin', msg);
    setTimeout(function () {
      document.body.removeChild(document.querySelector('.customError'));
    }, 3000);
  };
  var onSuccess = function (res) {
    ads = res;
    var loyalAds = getWithinMapArr(ads);
    // console.log(loyalAds);
    window.appdata = {
      'ads': loyalAds

    };
  };

  window.load(url, onSuccess, onError);

})();
