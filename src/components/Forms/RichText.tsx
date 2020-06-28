import React, { useEffect } from "react";
import { FormFieldProps } from "./Form";
import {
  IconName,
  Intent,
  FormGroup,
  InputGroup,
  Card,
  Button,
  Classes,
} from "@blueprintjs/core";
import { FormGroupCommonProps } from "./common";
import { EditorState, RichUtils, Editor } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

type RichTextField<TData> = FormFieldProps<TData> & FormGroupCommonProps;

export const RichTextField: React.FC<RichTextField<any>> = (props) => {
  const { methods, validation, label, inline, helperText } = props;

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  function sync() {
    methods!.setValue(
      props.name,
      stateToHTML(editorState.getCurrentContent(), {
        // TODO
      })
    );
  }

  useEffect(() => {
    methods!.register({ name: props.name });
  }, [methods!.register]);

  function setStyling(styling: string) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, styling));
  }

  return (
    <FormGroup
      label={label}
      inline={inline}
      helperText={helperText}
      disabled={props.disabled}
      intent={props.intent}
      labelInfo={props.labelInfo}
    >
      <Card elevation={0}>
        <Button
          onClick={() => setStyling("BOLD")}
          active={editorState.getCurrentInlineStyle().has("BOLD")}
          minimal
          icon="bold"
        />
        <Button
          onClick={() => setStyling("ITALIC")}
          active={editorState.getCurrentInlineStyle().has("ITALIC")}
          minimal
          icon="italic"
        />
        <Button
          onClick={() => setStyling("UNDERLINE")}
          active={editorState.getCurrentInlineStyle().has("UNDERLINE")}
          minimal
          icon="underline"
        />
        <div className={Classes.INPUT}>
          <Editor
            editorState={editorState}
            onChange={(e) => {
              setEditorState(e);
              sync();
            }}
          />
        </div>
      </Card>
    </FormGroup>
  );
};
