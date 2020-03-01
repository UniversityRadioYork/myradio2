import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";

export interface GlobalConfig {
	myradio: {
		webBase: string;
		apiBase: string;
		apiKey?: string;
	}
}

const globalConfig = createSlice({
	name: "GlobalConfig",
	initialState: {
		myradio: {
			webBase: "https://ury.org.uk/myradio-dev",
			apiBase: "https://ury.org.uk/api-dev/v2"
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
