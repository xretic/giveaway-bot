import { connectDiscord } from "./libs/discord";
import { connectDatabase } from "./libs/database";
import { startCrons } from "./crons/index";
import { config } from "dotenv";

config({
	path: "./.env",
});

const bootstrap = async (): Promise<void> => {
	await connectDatabase();
	await connectDiscord();
	await startCrons();
};

bootstrap()
	.then(() => {
		console.log("App started!");
	})
	.catch((err: Error) => {
		console.error(err);
	});
