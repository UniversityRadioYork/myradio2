import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../rootReducer";
import { Dialog, Classes, FormGroup, HTMLSelect } from "@blueprintjs/core";
import * as state from "./state";
import { patch } from "../../lib/globalConfig";

const DevOptions: React.FC = () => {
	const popupConfig = useSelector((state: AppState) => state.DevOptionsPopup);
	const globalConfig = useSelector((state: AppState) => state.GlobalConfig);
	const dispatch = useDispatch();

	return (
		<Dialog isOpen={popupConfig.open} onClose={() => dispatch(state.close())} title="Developer Options">
			<div className={Classes.DIALOG_BODY}>
				<FormGroup label="Environment">
					<HTMLSelect value={globalConfig.myradio.environment} onChange={e => dispatch(patch({
						path: "myradio.environment",
						newValue: e.target.value
					}))} options={["dev", "staging", "prod"]}>
					</HTMLSelect>
				</FormGroup>
			</div>
		</Dialog>
	);
};

export default DevOptions;
