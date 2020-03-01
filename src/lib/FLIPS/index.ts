import { FLIPSFeatureConfig } from "./state";
import store from "../../store";

export function evaluateFeature(feat: FLIPSFeatureConfig): boolean {
	const state = store.getState();
	switch (feat.rule) {
		case "env":
			let environment: "dev" | "staging" | "prod" | "localhost" = state.GlobalConfig.myradio.environment;
			if (environment === "dev" && window.location.hostname === "localhost") {
				environment = "localhost";
			}
			return feat[environment] === true;
		default: throw new Error(`Unrecognised FLIPS rule ${feat.rule}`);
	}
}

export function FLIPS(feat: string): boolean {
	const state = store.getState().FLIPS;
	if (!(feat in state)) {
		throw new Error(`Unrecognised FLIPS feature ${feat}!`);
	}
	return evaluateFeature(state.rules[feat]);
}
