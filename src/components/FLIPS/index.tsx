import React from "react";

import { evaluateFeature } from "../../lib/FLIPS";
import { useSelector } from "react-redux";
import { AppState } from "../../rootReducer";

interface FLIPSProps {
	feature: string;
	fallback?: React.ReactNode;
}

const Flips: React.FC<FLIPSProps> = ({ feature, fallback, children }) => {
	const state = useSelector((state: AppState) => state.FLIPS);
	if (!(feature in state.rules)) {
		throw new Error(`Unregcognised Flips feature ${feature}`);
	}
	const result = evaluateFeature(state.rules[feature]);
	if (result) {
		return children as any;
	} else if (fallback) {
		return fallback;
	} else {
		return null;
	}
}

export default Flips;
