

function shortIDGenerater(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
	  result += characters[(Math.floor(Math.random() * characters.length))];
	}
	console.log("Generated ID:", result); // Debugging line
	return result;
  }
  

module.exports = {shortIDGenerater};