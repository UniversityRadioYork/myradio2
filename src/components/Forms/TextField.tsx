import React from "react";
import classNames from "classnames";
import { useField, useFormikContext } from "formik";
import { Colors, Classes } from "@blueprintjs/core";

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
            "form-field",
            Classes.INPUT,
            meta.touched && meta.error && "bp3-intent-danger"
          )}
          disabled={formik.isSubmitting}
          {...field}
        />
        {typeof props.helper === "string" && (
          <div className="bp3-helper-text">{props.helper}</div>
        )}
        {meta.touched && meta.error && (
          <div
            className="bp3-helper-text"
            style={{ color: Colors.RED1, fontWeight: "bold" }}
          >
            {meta.error}
          </div>
        )}
      </div>
    </>
  );
}
