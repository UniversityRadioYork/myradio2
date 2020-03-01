import React from "react";
import { useForm, DeepPartial, FormContextValues, ValidationOptions } from "react-hook-form";

export interface FormFieldProps<TData extends {}> {
  // TODO: register is marked as optional to avoid compilation errors in the actual form page
  // it'll be passed down by Form, so it'll always be set
  methods?: FormContextValues<TData>;

  formRef?: React.RefObject<HTMLFormElement>;
  
  name: string;

  // Validation props
  validation?: ValidationOptions;
}

function isFormField<TData extends {}>(
  thing: React.ReactNode
): thing is React.ReactElement<FormFieldProps<TData>> {
  return (
    typeof thing === "object" &&
    thing !== null &&
    "props" in thing &&
    "name" in thing.props
  );
}

interface FormProps<TData extends {}> {
  onSubmit: (data: TData) => any;
  defaultValues?: DeepPartial<TData>;
}

export const Form: React.FC<FormProps<any>> = ({
  children,
  defaultValues,
  onSubmit
}) => {
  const methods = useForm({
    defaultValues
  });
  const { handleSubmit } = methods;
  const formRef = React.useRef<HTMLFormElement | null>(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child =>
        isFormField(child)
          ? React.createElement(child.type, {
              ...child.props,
              methods,
              formRef,
              key: child.props.name
            })
          : child
      )}
    </form>
  );
};

export function createForm<TData extends {}>(): React.FC<FormProps<TData>> {
  return Form;
}
