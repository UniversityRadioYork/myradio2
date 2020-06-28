import initialRules from "../../features.json";
import { createSlice } from "@reduxjs/toolkit";
import { FLIPSFeatureConfig } from "./index.js";

const flipsSlice = createSlice({
  name: "FLIPS",
  initialState: {
    rules: initialRules as { [key: string]: FLIPSFeatureConfig },
  } as const,
  reducers: {},
});

export default flipsSlice.reducer;
