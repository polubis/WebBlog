import beautify from "js-beautify"

const beautifyMdx = (code: string): string => {
  const result = beautify.html(code, {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "1",
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "normal",
    brace_style: "collapse",
    space_before_conditional: false,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: "40",
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
  })

  return result
}

export { beautifyMdx }
