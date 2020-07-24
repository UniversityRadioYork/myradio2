import React from "react";
import Yup from "yup";
import { FormikHelpers, Formik, Form as FormikForm, FormikProps } from "formik";

import "./formStyles.scss";
import { Prompt } from "react-router-dom";

export interface FormProps<T extends {}> {
  initialValues: T;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => any;
  validationSchema: Yup.ObjectSchema<any>;
  children: React.ReactNode;
  innerRef?: React.Ref<FormikProps<T>>;
}

const DEBUG = true && process.env.NODE_ENV === "development";

export function Form<T>(props: FormProps<T>) {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
      innerRef={props.innerRef}
    >
      {(formik) => (
        <>
          <Prompt
            when={Object.keys(formik.touched).some(
              (k) => (formik.touched as any)[k]
            )}
            message="You have unsaved changes. Are you sure you want to close this page?"
          />
          <FormikForm className="form" data-testid="FORM">
            {props.children}
          </FormikForm>
          {DEBUG && (
            <>
              <p>
                <code>{JSON.stringify(formik.values)}</code>
              </p>
              <p>
                <code>{JSON.stringify(formik.errors)}</code>
              </p>
            </>
          )}
        </>
      )}
    </Formik>
  );
}
