import { EmbedBuilder } from "@discordjs/builders";
import { IGiveaway } from "../models/Giveaway";

export default {
	giveaway(
		props:
			| {
					prize: string;
					conductive: string;
					end_date: number;
					end: boolean;
					members: string[];
					winners: string[];
					required_winners: number;
					voice: boolean;
			  }
			| IGiveaway
	): EmbedBuilder {
		const embed = new EmbedBuilder()
			.setTitle(props.end ? "Розыгрыш закончен" : "Розыгрыш")
			.setURL("https://www.random.org/")
			.setThumbnail("https://cdn-icons-png.flaticon.com/128/5162/5162286.png")
			.setColor(0x2f3136);

		if (props.end) {
			embed.setDescription(
				`Организатор: <@${props.conductive}>` +
					`\nПриз: **${props.prize}**` +
					`\n${props.required_winners > 1 ? "Победителей:" : "Победитель:"} ${
						props.winners.length < 1
							? "`Отсутствует`"
							: props.winners.map((x) => `<@${x}>`)
					}`
			);
		} else {
			embed.setDescription(
				`> Для участия нужно нажать на кнопку **"Участвовать"**${
					props.voice ? "\n> и просоединиться к любому голосовому каналу" : ""
				}`
			);
		}

		if (!props.end) {
			embed.setFields([
				{
					name: `${process.env.DOT_EMOJI} Приз`,
					value: `\`\`\`${props.prize}\`\`\``,
					inline: true,
				},
				{
					name: `${process.env.DOT_EMOJI} Участников`,
					value: `\`\`\`${props.members.length}\`\`\``,
					inline: true,
				},
				{
					name: `${process.env.DOT_EMOJI} Заканчивается`,
					value: `<t:${props.end_date}:R>`,
					inline: true,
				},
			]);
		}

		return embed;
	},

	notification(title: string, text: string, imageUrl?: string): EmbedBuilder {
		const embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(text)
			.setColor(0x2f3136);

		if (imageUrl) {
			embed.setThumbnail(imageUrl);
		}

		return embed;
	},
};
