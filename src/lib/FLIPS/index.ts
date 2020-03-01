import store from "../../store";

export type FLIPSFeatureConfig =
	| {
			rule: "static";
			enabled: boolean;
	  }
	| {
			rule: "env";
			localhost: boolean;
			dev: boolean;
			staging: boolean;
			prod: boolean;
	  }
	| {
			rule: "and";
			and: FLIPSFeatureConfig[];
	  }
	| {
			rule: "or";
			or: FLIPSFeatureConfig[];
	  }
	| {
			rule: "not";
			not: FLIPSFeatureConfig;
	  };

export function evaluateFeature(feat: FLIPSFeatureConfig): boolean {
	const state = store.getState();
	switch (feat.rule) {
		case "static":
			return feat.enabled;
		case "env":
			let environment: "dev" | "staging" | "prod" | "localhost" =
				state.GlobalConfig.myradio.environment;
			if (
				environment === "dev" &&
				window.location.hostname === "localhost"
			) {
				environment = "localhost";
			}
			return feat[environment] === true;
		case "and":
			return feat.and.every(evaluateFeature);
		case "or":
			return feat.or.some(evaluateFeature);
		case "not":
			return !evaluateFeature(feat.not);
		default:
			throw new Error("Can't happen.");
	}
}

export function FLIPS(feat: string): boolean {
	const state = store.getState().FLIPS;
	if (!(feat in state)) {
		throw new Error(`Unrecognised FLIPS feature ${feat}!`);
	}
	return evaluateFeature(state.rules[feat]);
}
