import React from "react";
import classNames from "classnames";
import { useField, useFormikContext } from "formik";
import { Classes } from "@blueprintjs/core";

export interface TextFieldProps {
  name: string;
  id: string;
  label: string;
  helper?: string;
}

export function TextField(props: TextFieldProps) {
  const [field, meta, _] = useField(props.name);
  const formik = useFormikContext();
  return (
    <>
      <div className="form-label">
        <label htmlFor={props.id}>{props.label}</label>
      </div>
      <div className="bp3-form-content form-field">
        <input
          id={props.id}
          type="text"
          className={classNames(
            Classes.INPUT,
            meta.touched && meta.error && Classes.INTENT_DANGER
          )}
          disabled={formik.isSubmitting}
          {...field}
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
