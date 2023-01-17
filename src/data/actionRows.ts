import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle } from "discord.js";

export default {
	confirmation(): ActionRowBuilder<ButtonBuilder> {
		return new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("confirm")
				.setLabel("Подтвердить")
				.setStyle(ButtonStyle.Success),

			new ButtonBuilder()
				.setCustomId("cancel")
				.setLabel("Отмена")
				.setStyle(ButtonStyle.Secondary)
		);
	},

	giveaway(): ActionRowBuilder<ButtonBuilder> {
		return new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("participate")
				.setLabel("Участвовать")
				.setStyle(ButtonStyle.Success),

			new ButtonBuilder()
				.setCustomId("members")
				.setLabel(`Участники`)
				.setStyle(ButtonStyle.Primary)
		);
	},

	backwardOrForward(
		pagination: number,
		allMembers: string[]
	): ActionRowBuilder<ButtonBuilder> {
		return new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("backward")
				.setEmoji({ name: "⬅️" })
				.setDisabled(pagination === 0)
				.setStyle(ButtonStyle.Secondary),

			new ButtonBuilder()
				.setCustomId("delete")
				.setLabel("Удалить")
				.setStyle(ButtonStyle.Danger),

			new ButtonBuilder()
				.setCustomId("forward")
				.setEmoji({ name: "➡️" })
				.setDisabled((pagination + 1) * 10 >= allMembers.length)
				.setStyle(ButtonStyle.Secondary)
		);
	},
};
