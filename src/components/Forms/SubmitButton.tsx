import React from "react";
import { useFormikContext } from "formik";
import { Button, Intent } from "@blueprintjs/core";

interface SubmitButtonProps {
  label?: string;
}

export function SubmitButton(props: SubmitButtonProps) {
  const formik = useFormikContext();

  return (
    <Button
      intent={Intent.PRIMARY}
      disabled={formik.isSubmitting}
      onClick={() => formik.submitForm()}
      text={props.label || "Submit"}
      loading={formik.isSubmitting}
    />
  );
}
