import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../rootReducer";
import { Dialog, Classes, FormGroup, HTMLSelect } from "@blueprintjs/core";
import * as state from "./state";
import { patch } from "../../lib/globalConfig";
import { useApolloClient } from "@apollo/react-hooks";

const DevOptions: React.FC = () => {
  const popupConfig = useSelector((state: AppState) => state.DevOptionsPopup);
  const globalConfig = useSelector((state: AppState) => state.GlobalConfig);
  const dispatch = useDispatch();
  const client = useApolloClient();

  const lastEnv = useRef<string>();
  useEffect(() => {
    if (lastEnv.current !== globalConfig.myradio.environment) {
      client.cache.reset();
    }
    lastEnv.current = globalConfig.myradio.environment;
  }, [globalConfig.myradio.environment, client.cache]);

  return (
    <Dialog
      isOpen={popupConfig.open}
      onClose={() => dispatch(state.close())}
      title="Developer Options"
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup label="Environment">
          <HTMLSelect
            value={globalConfig.myradio.environment}
            onChange={(e) =>
              dispatch(
                patch({
                  path: "myradio.environment",
                  newValue: e.target.value,
                })
              )
            }
            options={["dev", "staging", "prod"]}
          ></HTMLSelect>
        </FormGroup>
      </div>
    </Dialog>
  );
};

export default DevOptions;
