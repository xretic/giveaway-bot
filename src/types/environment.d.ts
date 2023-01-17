export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			MONGO_URL: string;
			GUILD_ID: string;
			DOT_EMOJI: string;
		}
	}
}
