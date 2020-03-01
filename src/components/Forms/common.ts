import { Intent } from "@blueprintjs/core";

export interface FormGroupCommonProps {
  label: string;
  inline?: boolean;
  helperText?: boolean;
  labelInfo?: React.ReactElement;
  intent?: Intent;
  disabled?: boolean;
}
