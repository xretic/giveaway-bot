import { ButtonInteraction, CommandInteraction } from "discord.js";

export default async (
	commandInteraction: CommandInteraction<"cached">
): Promise<any> => {
	await commandInteraction.deleteReply();
};
