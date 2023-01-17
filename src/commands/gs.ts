import {
	ApplicationCommandOptionType,
	ButtonInteraction,
	CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import actionRows from "../data/actionRows";
import embeds from "../data/embeds";
import { interactionButtonsCollector } from "../collectors/interactionButtonsCollector";
import confirm from "../buttons/confirm";
import cancel from "../buttons/cancel";
import getDateFromString from "../utils/getDateFromString";

@Discord()
class Giveaway {
	@Slash({ name: "gs", description: "Начать розыгрыш" })
	async execute(
		@SlashOption({
			name: "приз",
			description: "Приз",
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		prize: string,

		@SlashOption({
			name: "длительность",
			description: "1W | 1D | 1H | 1M",
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		duration: string,

		@SlashOption({
			name: "победители",
			description: "Кол-во победителей",
			type: ApplicationCommandOptionType.Number,
			minValue: 1,
			maxValue: 10,
			required: true,
		})
		winnersCount: number,

		@SlashChoice("С войсом", "Без войса")
		@SlashOption({
			name: "условие",
			description: "Условие",
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		condition: string,

		interaction: CommandInteraction<"cached">
	) {
		if (!interaction.member.permissions.has("Administrator")) {
			return await interaction.reply({
				ephemeral: true,
				embeds: [
					embeds.notification(
						"Недостаточно прав",
						"Вы не в праве использовать эту команду!"
					),
				],
			});
		}

		await interaction.reply({
			ephemeral: true,
			embeds: [
				embeds.notification(
					"Запуск розыгрыша",
					`${process.env.DOT_EMOJI} Приз: **${prize}**` +
						`\n${process.env.DOT_EMOJI} Длительность: **${duration}**` +
						`\n${process.env.DOT_EMOJI} Кол-во победителей: **${winnersCount}**` +
						`\n${process.env.DOT_EMOJI} Условие: **${condition}**`,
					"https://cdn-icons-png.flaticon.com/128/5726/5726470.png"
				),
			],
			components: [actionRows.confirmation()],
		});

		await interactionButtonsCollector(
			interaction.user,
			interaction,
			["confirm", "cancel"],
			async (i: ButtonInteraction<"cached">): Promise<void> => {
				switch (i.customId) {
					case "confirm":
						await confirm(interaction, {
							prize: prize,
							duration: duration,
							winnersCount: winnersCount,
							condition: condition,
						});
						break;

					case "cancel":
						await cancel(interaction);
						break;
				}
			}
		);
	}
}
