import React from "react";
import { FormFieldProps } from "./Form";
import { Button, Intent, Classes } from "@blueprintjs/core";

type SubmitProps<TData extends {}> = FormFieldProps<TData> & {
  text?: string;
  intent?: Intent;
};

export const SubmitButton: React.FC<SubmitProps<any>> = (props) => (
  <input
    type="submit"
    className={Classes.BUTTON}
    value={props.text || "Submit"}
  />
);
