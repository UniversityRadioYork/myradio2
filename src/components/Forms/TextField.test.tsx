import React from "react";
import { render } from "@testing-library/react";

import * as Yup from "yup";
import { TextField } from "./TextField";
import { Form } from "./Form";
import { renderInAppContext } from "../../testUtils/renderUtils";

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
});
