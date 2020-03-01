import initialRules from "../../features.json";
import { createSlice } from "@reduxjs/toolkit";

export type FLIPSFeatureConfig = 
	| {
		rule: "env";
		localhost: boolean;
		dev: boolean;
		staging: boolean;
		prod: boolean;
	}

const flipsSlice = createSlice({
	name: "FLIPS",
	initialState: {
		rules: initialRules as { [key: string]: FLIPSFeatureConfig }
	} as const,
	reducers: {}
})

export default flipsSlice.reducer;
