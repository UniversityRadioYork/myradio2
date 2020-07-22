import React from "react";
import classNames from "classnames";
import { useField, FieldInputProps, useFormikContext } from "formik";
import { HTMLSelect } from "@blueprintjs/core";

interface SelectFieldValue {
  key: string;
  value: string;
  label: string;
}

export interface SelectFieldProps {
  name: string;
  id: string;
  label: string;
  values: SelectFieldValue[] | "loading";
  helper?: string;
}

export function SelectField(props: SelectFieldProps) {
  const [field, meta, _helpers] = useField(props.name);
  const formik = useFormikContext();
  return (
    <>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <div className="bp3-form-content form-field">
        <HTMLSelect
          id={props.id}
          className={classNames(
            meta.touched && meta.error && "bp3-intent-danger"
          )}
          disabled={formik.isSubmitting}
          {...field as Omit<FieldInputProps<any>, "multiple">}
        >
          {props.values === "loading" ? (
            <option disabled>Loading...</option>
          ) : (
            props.values.map((val) => (
              <option key={val.key} value={val.value}>
                {val.label}
              </option>
            ))
          )}
        </HTMLSelect>
        <div className="form-helper">
          What type is your show? If unsure, leave it as Regular.
        </div>
        {/* TODO uniqueness checking */}
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
