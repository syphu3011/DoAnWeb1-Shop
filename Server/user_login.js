// Get the value of a cookie by name
function getCookie(name) {
	// Split the cookies into an array of key-value pairs
	var cookies = document.cookie.split(';');

	// Loop through the cookies to find the one we want
	for (var i = 0; i < cookies.length; i++) {
			// Trim whitespace from the cookie
			var cookie = cookies[i].trim();

			// If this is the cookie we're looking for, return its value
			if (cookie.indexOf(name + '=') === 0) {
					return cookie.substring(name.length + 1, cookie.length);
			}
	}

	// Cookie not found
	return null;
}

// Example usage
var myCookieValue = getCookie('admin');
console.log(myCookieValue);
