import React from "react";
import { useField, useFormikContext } from "formik";
import { TagInput, Intent } from "@blueprintjs/core";

export interface TagFieldProps {
  name: string;
  id: string;
  label: string;
  helper?: string;
}

export function TagField(props: TagFieldProps) {
  const [_, meta, helpers] = useField(props.name);
  const formik = useFormikContext();
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <div className="bp3-form-content form-field">
        <TagInput
          values={meta.value}
          onChange={((values: string[]) => helpers.setValue(values)) as any}
          intent={meta.error ? Intent.DANGER : undefined}
          disabled={formik.isSubmitting}
        />
        {typeof props.helper === "string" && (
          <div className="form-helper">{props.helper}</div>
        )}
        {meta.touched && meta.error && (
          <div
            className="form-helper error"
          >
            {meta.error}
          </div>
        )}
      </div>
    </>
  );
}
