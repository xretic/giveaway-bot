import { Discord, On, ArgsOf } from "discordx";
import members from "../buttons/members";
import participate from "../buttons/participate";
import { client } from "../libs/discord";

@Discord()
class InteractionCreate {
	@On({ event: "interactionCreate" })
	async interactionCreate([interaction]: ArgsOf<"interactionCreate">) {
		client.executeInteraction(interaction);
	}

	@On({ event: "interactionCreate" })
	async giveaway([interaction]: ArgsOf<"interactionCreate">) {
		if (!interaction.isButton()) return;

		switch (interaction.customId) {
			case "participate":
				await participate(interaction);
				break;

			case "members":
				await members(interaction);
				break;
		}
	}
}
