import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";

export interface GlobalConfig {
	myradio: {
		environment: "dev" | "staging" | "prod";
		apiKey?: string;
	}
}

const globalConfig = createSlice({
	name: "GlobalConfig",
	initialState: {
		myradio: {
			environment: "dev"
		}
	} as GlobalConfig,
	reducers: {
		patch(state, action: PayloadAction<{ path: string, newValue: any }>) {
			set(state, action.payload.path, action.payload.newValue);
		}
	}
});

export default globalConfig.reducer;

export const { patch } = globalConfig.actions;
