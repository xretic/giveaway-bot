import { ButtonInteraction } from "discord.js";
import actionRows from "../data/actionRows";
import embeds from "../data/embeds";
import { Giveaway } from "../models/Giveaway";
import { interactionButtonsCollector } from "../collectors/interactionButtonsCollector";

export default async (buttonInteraction: ButtonInteraction): Promise<any> => {
	const giveaway = await Giveaway.findOne({ id: buttonInteraction.message.id });

	if (!giveaway) return;

	let pagination = 0;

	await buttonInteraction.reply({
		ephemeral: true,
		embeds: [
			embeds.notification(
				"Участники розыгрыша",
				`${
					giveaway.members.length < 1
						? "Пусто"
						: giveaway.members.map((x) => `<@${x}>`)
				}`
			),
		],
		components: [actionRows.backwardOrForward(pagination, giveaway.members)],
	});

	await interactionButtonsCollector(
		buttonInteraction.user,
		buttonInteraction,
		["backward", "forward", "delete"],
		async (i: ButtonInteraction): Promise<any> => {
			if (i.customId === "backward") pagination--;
			if (i.customId === "forward") pagination++;

			switch (i.customId) {
				case "delete":
					await buttonInteraction.deleteReply();
					break;

				case "backward":
				case "forward":
					await buttonInteraction.editReply({
						embeds: [
							embeds.notification(
								"Участники розыгрыша",
								`${
									giveaway.members.length < 1
										? "```Пусто```"
										: giveaway.members.map((x) => `<@${x}>`)
								}`
							),
						],
						components: [
							actionRows.backwardOrForward(pagination, giveaway.members),
						],
					});
					break;
			}
		}
	);
};
