function getCookie(name) {
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.indexOf(name + '=') === 0) {
					return cookie.substring(name.length + 1, cookie.length);
			}
	}
	console.log("Cookie was not found");
	return null;
}
var myCookieValue = getCookie('admin');
// console.log(myCookieValue);

var getAllCookies = function() {
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

var myCookies = getAllCookies()
console.log("This is client side cookie: ")
console.log(myCookies.admin)