import { ButtonInteraction } from "discord.js";
import actionRows from "../data/actionRows";
import embeds from "../data/embeds";
import { Giveaway, IGiveaway } from "../models/Giveaway";

export default async (buttonInteraction: ButtonInteraction): Promise<any> => {
	let giveaway = await Giveaway.findOne({ id: buttonInteraction.message.id });

	if (!giveaway) return;

	const member = buttonInteraction.guild.members.cache.get(
		buttonInteraction.user.id
	);

	if (giveaway.members.some((x) => x === member.id)) {
		giveaway = await Giveaway.findOneAndUpdate(
			{ id: buttonInteraction.message.id },
			{ $pull: { members: member.id } },
			{ new: true }
		);

		await updateGiveaway(giveaway, buttonInteraction);

		return await buttonInteraction.reply({
			ephemeral: true,
			embeds: [
				embeds.notification(
					"Розыгрыш",
					"Вы успешно отменили запись в розыгрыш!"
				),
			],
		});
	}

	if (giveaway.voice && !member.voice.channelId) {
		return await buttonInteraction.reply({
			ephemeral: true,
			embeds: [
				embeds.notification(
					"Ошибка",
					"Для того, чтобы принять участие в розыгрыше, нужно зайти **в любой голосовой канал**!"
				),
			],
		});
	}

	giveaway = await Giveaway.findOneAndUpdate(
		{ id: buttonInteraction.message.id },
		{ $push: { members: [member.id] } },
		{ new: true }
	);

	await updateGiveaway(giveaway, buttonInteraction);

	await buttonInteraction.reply({
		ephemeral: true,
		embeds: [
			embeds.notification(
				"Розыгрыш",
				"Вы успешно зарегистрировались в розыгрыше!"
			),
		],
	});
};

const updateGiveaway = async (
	giveaway: IGiveaway,
	buttonInteraction: ButtonInteraction
): Promise<void> => {
	await buttonInteraction.message.edit({
		embeds: [embeds.giveaway(giveaway)],
		components: [actionRows.giveaway()],
	});
};
