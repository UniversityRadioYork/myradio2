import store from "../../store";

export type FLIPSFeatureConfig =
	| {
			static: boolean;
	  }
	| {
			env: {
				localhost: boolean;
				dev: boolean;
				staging: boolean;
				prod: boolean;
			};
	  }
	| { and: FLIPSFeatureConfig[] }
	| { or: FLIPSFeatureConfig[] }
	| { not: FLIPSFeatureConfig };

export function evaluateFeature(feat: FLIPSFeatureConfig): boolean {
	const state = store.getState();
	if ("static" in feat) {
		return feat.static;
	} else if ("env" in feat) {
		let environment: "dev" | "staging" | "prod" | "localhost" =
			state.GlobalConfig.myradio.environment;
		if (environment === "dev" && window.location.hostname === "localhost") {
			environment = "localhost";
		}
		return feat.env[environment] === true;
	} else if ("and" in feat) {
		return feat.and.every(evaluateFeature);
	} else if ("or" in feat) {
		return feat.or.some(evaluateFeature);
	} else if ("not" in feat) {
		return !evaluateFeature(feat.not);
	} else {
		throw new Error("Unrecognised FLIPS rule " + JSON.stringify(feat));
	}
}

export function FLIPS(feat: string): boolean {
	const state = store.getState().FLIPS;
	if (!(feat in state)) {
		throw new Error(`Unrecognised FLIPS feature ${feat}!`);
	}
	return evaluateFeature(state.rules[feat]);
}
