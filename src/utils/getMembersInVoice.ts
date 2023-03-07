import { Guild } from "discord.js";

export default (guild: Guild, members: string[]): string[] => {
	const membersInVoice: string[] = [];

	for (const id of members) {
		const member = guild.members.cache.get(id);

		if (member?.voice.channel) {
			membersInVoice.push(id);
		}
	}

	return membersInVoice;
};
