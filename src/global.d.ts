declare module "*.svg"
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.gif"
declare module "*.bmp"
declare module "*.tiff"

declare module "*.scss" {
  const content: { [className: string]: string }
  export = content
}

declare module "js-beautify" {
  export interface Config {
    indent_size: string
    indent_char: string
    max_preserve_newlines: "1"
    preserve_newlines: true
    keep_array_indentation: false
    break_chained_methods: false
    indent_scripts: "normal"
    brace_style: "collapse"
    space_before_conditional: false
    unescape_strings: false
    jslint_happy: false
    end_with_newline: false
    wrap_line_length: "40"
    indent_inner_html: false
    comma_first: false
    e4x: false
    indent_empty_lines: false
  }
  export function html(arg: string, config?: Config): string
}
