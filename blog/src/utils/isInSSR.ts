export const isInSSR = (): boolean =>
  typeof window === "undefined" || !window.document
