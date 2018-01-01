const parseDuration = require("parse-duration");

// Parses durations
module.exports = async string => {
	let time, event;
	const args = string.split("|").trimAll();
	if (args.length === 2) {
		// Easy peasy lemon sqeezy
		event = args[0];
		time = args[1];
	} else {
		// Parse with assumption to "command to ... in ..."
		time = string.substring(string.toLowerCase().lastIndexOf(" in ") + 4);
		event = string.indexOf("to ") === 0 ? string.substring(3, string.toLowerCase.lastIndexOf(" in ")) : string.substring(0, string.toLowerCase().lastIndexOf(" in "));
	}
	const actualTime = parseDuration(time);
	if (time > 0 && event) {
		return {
			time: actualTime,
			event,
		};
	} else {
		return {
			time: null,
			event: null,
			error: "ERR",
		};
	}
};
