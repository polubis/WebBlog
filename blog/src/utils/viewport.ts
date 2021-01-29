const MOBILE = 600
const TABLET = 900
const LAPTOP = 1440
const DESKTOP = 1920

const getUpViewport = (size: number): string => `(min-width: ${size}px)`

const getDownViewport = (size: number): string => `(max-width: ${size - 1}px)`

export const M_UP = getUpViewport(MOBILE)
export const T_UP = getUpViewport(TABLET)
export const L_UP = getUpViewport(LAPTOP)
export const D_UP = getUpViewport(DESKTOP)

export const M_DOWN = getDownViewport(MOBILE)
export const T_DOWN = getDownViewport(TABLET)
export const L_DOWN = getDownViewport(LAPTOP)
export const D_DOWN = getDownViewport(DESKTOP)