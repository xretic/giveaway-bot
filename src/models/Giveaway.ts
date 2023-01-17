import { Schema, model } from "mongoose";

export interface IGiveaway {
	_id: Schema.Types.ObjectId;
	id: string;
	channel_id: string;
	conductive: string;
	prize: string;
	voice: boolean;
	members: string[];
	winners: string[];
	required_winners: number;
	end: boolean;
	end_date: number;
}

const schema = new Schema<IGiveaway>({
	id: { type: String, required: true },
	channel_id: { type: String, required: true },
	conductive: { type: String, required: true },
	prize: { type: String, required: true },
	voice: { type: Boolean, required: true },
	members: { type: [String], default: [] },
	winners: { type: [String], default: [] },
	required_winners: { type: Number, required: true },
	end: { type: Boolean, default: false },
	end_date: { type: Number, required: true },
});

export const Giveaway = model<IGiveaway>("Giveaway", schema);
