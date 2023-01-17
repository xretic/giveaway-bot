import moment from "moment";

export default (timeString: string): number | null => {
	const multipliers = new Map([
		["m", 60],
		["h", 60 * 60],
		["d", 60 * 60 * 24],
		["w", 60 * 60 * 24 * 7],
		["M", 60],
		["H", 60 * 60],
		["D", 60 * 60 * 24],
		["W", 60 * 60 * 24 * 7],
	]);

	const tempTime = Number(timeString.replace(new RegExp(/[smhdсмчд]/), ""));
	const multiplier = timeString.replace(new RegExp(/\d*/), "");
	return multipliers.get(multiplier) * tempTime + moment().unix();
};
