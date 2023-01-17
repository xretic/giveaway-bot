import {
	ButtonInteraction,
	User,
	CommandInteraction,
	Message,
} from "discord.js";

export const interactionButtonsCollector = async (
	author: User,
	interaction: CommandInteraction | ButtonInteraction,
	filters: string[],
	collect: (interaction: ButtonInteraction) => Promise<void>
) => {
	const filter = (i: ButtonInteraction) => {
		return filters.some((x) => x === i.customId && i.user.id === author.id);
	};

	const message = (await interaction.fetchReply()) as Message;

	const collector = message.createMessageComponentCollector({
		filter,
		time: 60 * 1000,
	});

	collector.on("collect", async (i: ButtonInteraction) => {
		try {
			collector.resetTimer();
			await collect(i);
			if (!i.replied && !i.deferred) await i.deferUpdate();
		} catch (err) {
			console.log(
				`Произошла ошибка при обработке коллектора: interactionButtonsCollector`,
				err
			);
		}
	});
};
