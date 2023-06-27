import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"

const Container = styled.div`
  border-radius: 4px;
  background: ${theme.bg2};
  min-width: 200px;

  input,
  textarea {
    color: ${theme.white};
    height: 44px;
    background: none;
    width: 100%;
    border: none;
    padding: 14px 18px;
    font-size: 16px;
    line-height: 20px;
    font-family: "Lexend";

    &::placeholder {
      color: ${theme.placeholderText};
      font-size: 16px;
      font-family: "Lexend";
    }
  }

  textarea {
    min-height: 160px;
    resize: vertical;
    max-height: 400px;
  }
`

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = (props: InputProps) => {
  return (
    <Container className="ui-input">
      <input {...props} />
    </Container>
  )
}

export interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

export const Textarea = (props: TextareaProps) => {
  return (
    <Container className="ui-input">
      <textarea {...props} />
    </Container>
  )
}
