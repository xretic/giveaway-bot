import { CronJob } from "cron";
import { Giveaway, IGiveaway } from "../models/Giveaway";
import moment from "moment";
import { client } from "../libs/discord";
import { TextChannel } from "discord.js";
import getMembersInVoice from "../utils/getMembersInVoice";
import embeds from "../data/embeds";

const cron = async (): Promise<void> => {
	Giveaway.find(
		{ end: false },
		async (err: { message: string }, data: IGiveaway[]) => {
			if (err) {
				return console.log(err.message);
			}

			for (const giveaway of data) {
				if (giveaway.end_date < moment().unix()) {
					const mainGuild = client.guilds.cache.get(process.env.GUILD_ID);
					const giveawayChannel = mainGuild.channels.cache.get(
						giveaway.channel_id
					) as TextChannel;

					const giveawayMsg = await giveawayChannel.messages.fetch(giveaway.id);

					if (!giveawayMsg) {
						await Giveaway.findOneAndUpdate({ id: giveaway.id }, { end: true });
						continue;
					}

					const members = giveaway.voice
						? getMembersInVoice(mainGuild, giveaway.members)
						: giveaway.members;

					const winners: string[] = [];

					for (let i = 0; i < giveaway.required_winners; i++) {
						winners.push(members[Math.floor(Math.random() * members.length)]);
					}

					const newGiveaway = await Giveaway.findOneAndUpdate(
						{ id: giveaway.id },
						{ winners: winners, end: true },
						{ new: true }
					);

					await giveawayMsg.edit({
						embeds: [embeds.giveaway(newGiveaway)],
						components: [],
					});
				}
			}
		}
	);
};

export default async (): Promise<void> => {
	new CronJob("0/30 * * * * *", cron, null, true, null, null, true);
};
