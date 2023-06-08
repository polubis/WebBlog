const SMALL_MOBILE = 420
const MOBILE = 600
const TABLET = 900
const LAPTOP = 1440
const DESKTOP = 1920

const getUpViewport = (size: number): string => `(min-width: ${size}px)`

const getDownViewport = (size: number): string => `(max-width: ${size - 1}px)`

export const mUp = (width: number): boolean => width >= MOBILE
export const tUp = (width: number): boolean => width >= TABLET
export const tDown = (width: number): boolean => width < TABLET
export const lUp = (width: number): boolean => width >= LAPTOP
export const dUp = (width: number): boolean => width >= DESKTOP

export const SM_UP = getUpViewport(SMALL_MOBILE)
export const M_UP = getUpViewport(MOBILE)
export const T_UP = getUpViewport(TABLET)
export const L_UP = getUpViewport(LAPTOP)
export const D_UP = getUpViewport(DESKTOP)

export const SM_DOWN = getDownViewport(SMALL_MOBILE)
export const M_DOWN = getDownViewport(MOBILE)
export const T_DOWN = getDownViewport(TABLET)
export const L_DOWN = getDownViewport(LAPTOP)
export const D_DOWN = getDownViewport(DESKTOP)
