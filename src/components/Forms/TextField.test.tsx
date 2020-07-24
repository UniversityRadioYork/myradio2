import React from "react";
import { fireEvent, act, wait } from "@testing-library/react";

import * as Yup from "yup";
import { TextField } from "./TextField";
import { Form } from "./Form";
import { renderInAppContext } from "../../testUtils/renderUtils";
import { FormikProps } from "formik";

describe("TextField", () => {
  it("renders an input with appropriate ID and name attrs", () => {
    const result = renderInAppContext(
      <Form
        initialValues={{}}
        onSubmit={() => {}}
        validationSchema={Yup.object()}
      >
        <TextField id="testId" name="testName" label="test label" />
      </Form>
    );
    const input = result.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "testName");
    expect(input).toHaveAttribute("id", "testId");
  });

  it("has a label", () => {
    const result = renderInAppContext(
      <Form
        initialValues={{}}
        onSubmit={() => {}}
        validationSchema={Yup.object()}
      >
        <TextField id="testId" name="testName" label="test label" />
      </Form>
    );
    expect(result.getByLabelText("test label")).toBeInTheDocument();
  });

  it("updates text when you type", async () => {
    const result = renderInAppContext(
      <Form
        initialValues={{ testName: "value 1" }}
        onSubmit={() => {}}
        validationSchema={Yup.object()}
      >
        <TextField id="testId" name="testName" label="test label" />
      </Form>
    );
    expect(result.getByRole("textbox").getAttribute("value")).toEqual(
      "value 1"
    );

    fireEvent.change(result.getByRole("textbox"), {
      target: {
        value: "value 2",
      },
    });

    await wait();

    expect(result.getByRole("textbox").getAttribute("value")).toEqual(
      "value 2"
    );
  });

  it("syncs Formik state", async () => {
    const bagRef = React.createRef<FormikProps<any>>();
    const result = renderInAppContext(
      <Form
        initialValues={{ test: "value 1" }}
        onSubmit={() => {}}
        validationSchema={Yup.object().shape({ test: Yup.string() })}
        innerRef={bagRef}
      >
        <TextField id="testId" name="test" label="test label" />
      </Form>
    );

    fireEvent.change(result.getByRole("textbox"), {
      target: {
        value: "value 2",
      },
    });

    await wait();
    expect(bagRef.current!.values.test).toEqual("value 2");
  });

  it("sets the correct value on submit", async () => {
    const bagRef = React.createRef<FormikProps<any>>();
    const submitter = jest.fn();
    const result = renderInAppContext(
      <Form
        initialValues={{ test: "value 1" }}
        onSubmit={submitter}
        validationSchema={Yup.object().shape({ test: Yup.string() })}
        innerRef={bagRef}
      >
        <TextField id="testId" name="test" label="test label" />
      </Form>
    );

    fireEvent.change(result.getByRole("textbox"), {
      target: {
        value: "value 2",
      },
    });

    await wait();

    act(() => {
      bagRef.current!.submitForm();
    });

    await wait();

    expect(submitter).toHaveBeenCalledWith(
      { test: "value 2" },
      expect.any(Object)
    );
  });
});
