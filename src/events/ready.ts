import { ActivityType } from "discord.js";
import { Discord, On, ArgsOf } from "discordx";
import { client } from "../libs/discord";
import { Giveaway } from "../models/Giveaway";

@Discord()
class Ready {
	@On({ event: "ready" })
	async ready([readyClient]: ArgsOf<"ready">) {
		await client.guilds.fetch();

		await client.initApplicationCommands();

		client.user.setActivity({
			name: "за розыгрышами",
			type: ActivityType.Watching,
		});

		console.log("Discord bot is ready!");
	}
}
