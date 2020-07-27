'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;
  var LIMIT = 5;

  var getPinParams = function () {
    var template = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    var pin = template.cloneNode(true);
    var container = document.createElement('div');
    container.style.opacity = 0;
    container.style.left = 0;
    container.style.top = 0;
    container.appendChild(pin);
    document.body.appendChild(container);

    var size = {};
    size.width = container.querySelector('.map__pin').clientWidth;
    size.height = container.querySelector('.map__pin').clientHeight;
    document.body.removeChild(container);

    return size;
  };

  var params = getPinParams();
  var pinWidth = params.width;
  var pinHeight = params.height;


  var getLimitedArr = function (ads) {
    var adsCopy = ads.slice();
    if (ads.length > LIMIT) {
      var _ads = adsCopy.slice(0, LIMIT);
      adsCopy = _ads;
    }
    return adsCopy;
  };

  var createMapPin = function (obj, template) {

    var elem = template.cloneNode(true);
    elem.style.left = obj.location.x - pinWidth / 2 + 'px';
    elem.style.top = obj.location.y - pinHeight + 'px';

    var elemImg = elem.querySelector('img');
    elemImg.src = obj.author.avatar;
    elemImg.alt = obj.offer.title;

    return elem;

  };

  var createMapPins = function () {

    var ads = getLimitedArr(window.appdata.ads);
    // console.log('from pin -> createMapPins', ads);
    var template = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var elem = createMapPin(ads[i], template);
      fragment.appendChild(elem);
    }

    var mapPinsContainer = document.querySelector('.map__pins');
    mapPinsContainer.appendChild(fragment);

    var pins = [].slice.call(mapPinsContainer.querySelectorAll('.map__pin'));

    return pins.filter(function (pin) {
      return !pin.classList.contains('map__pin--main');
    });

  };

  // Вызов метода создания меток

  window.pin = {
    'max_y': MAX_Y,
    'min_y': MIN_Y,
    'pinWidth': pinWidth,
    'pinHeight': pinHeight,
    'createMapPins': createMapPins,
    'getLimitedArr': getLimitedArr
  };


})();
