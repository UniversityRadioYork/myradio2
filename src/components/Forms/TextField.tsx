import React from "react";
import { FormFieldProps } from "./Form";
import { IconName, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import { FormGroupCommonProps } from "./common";

type TextFieldProps<TData> = FormFieldProps<TData> &
  FormGroupCommonProps & {
    leftIcon?: IconName;
    rightIcon?: IconName;
    type?: string;
    rightElement?: JSX.Element;
    placeholder?: string;
    round?: boolean;
  };

export const TextField: React.FC<TextFieldProps<any>> = props => {
  const { methods, validation, label, inline, helperText, formRef, ...inputProps } = props;
  return (
    <FormGroup
      label={label}
      inline={inline}
      helperText={helperText}
      disabled={props.disabled}
      intent={props.intent}
      labelInfo={props.labelInfo}
    >
      <InputGroup inputRef={methods!.register(validation || {})} {...inputProps} />
    </FormGroup>
  );
};

