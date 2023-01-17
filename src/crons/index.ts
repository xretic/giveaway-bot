import checkGiveaways from "./checkGiveaways";

export const startCrons = async (): Promise<void> => {
	await checkGiveaways();
};
