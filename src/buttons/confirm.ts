import { ButtonInteraction, CommandInteraction } from "discord.js";
import embeds from "../data/embeds";
import getDateFromString from "../utils/getDateFromString";
import { Giveaway } from "../models/Giveaway";
import actionRows from "../data/actionRows";

export default async (
	commandInteraction: CommandInteraction<"cached">,
	props: {
		prize: string;
		duration: string;
		winnersCount: number;
		condition: string;
	}
): Promise<any> => {
	const endDate = getDateFromString(props.duration);

	if (isNaN(endDate)) {
		return await commandInteraction.editReply({
			embeds: [
				embeds.notification("Ошибка", `Вы ввели некорректное время розыгрыша!`),
			],
			components: [],
		});
	}

	await commandInteraction.editReply({
		embeds: [
			embeds.notification(
				"Розыгрыш запущен",
				`Вы успешно запустили розыгрыш на **${props.prize}**!`
			),
		],
		components: [],
	});

	const msg = await commandInteraction.channel.send({
		embeds: [
			embeds.giveaway({
				prize: props.prize,
				conductive: commandInteraction.user.id,
				end_date: endDate,
				end: false,
				members: [],
				winners: [],
				required_winners: props.winnersCount,
				voice: props.condition === "С войсом" ? true : false,
			}),
		],
		components: [actionRows.giveaway()],
	});

	await Giveaway.create({
		id: msg.id,
		channel_id: commandInteraction.channelId,
		prize: props.prize,
		conductive: commandInteraction.user.id,
		end_date: endDate,
		end: false,
		members: [],
		winners: [],
		required_winners: props.winnersCount,
		voice: props.condition === "С войсом" ? true : false,
	});
};
