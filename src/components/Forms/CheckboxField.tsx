import React from "react";
import { useField } from "formik";
import { Checkbox } from "@blueprintjs/core";

export interface CheckboxFieldProps {
  name: string;
  id: string;
  label: string;
  helper?: string;
}

export function CheckboxField(props: CheckboxFieldProps) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <>
      <div className="form-label">
        <label htmlFor={props.id}>{props.label}</label>
      </div>
      <div className="bp3-form-content form-field">
        <Checkbox
          checked={field.value}
          onChange={(e) => helpers.setValue(e.currentTarget.checked)}
          id={props.id}
        />
        {typeof props.helper === "string" && (
          <div className="form-helper">{props.helper}</div>
        )}
        {meta.touched && meta.error && (
          <div className="form-helper error">{meta.error}</div>
        )}
      </div>
    </>
  );
}
