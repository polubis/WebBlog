const MOBILE = 600
const TABLET = 900
const LAPTOP = 1440
const DESKTOP = 1920

const getUpViewport = (size: number): string => `(min-width: ${size}px)`

export const M_UP = getUpViewport(MOBILE)
export const T_UP = getUpViewport(TABLET)
export const L_UP = getUpViewport(LAPTOP)
export const D_UP = getUpViewport(DESKTOP)

// $mobile: 600px;
// $tablet: 900px;
// $laptop: 1280px;
// $desktop: 1920px;

// @import '../palette';

// @mixin max-width($width) {
//   @media (max-width: $width) {
//     @content;
//   }
// }

// @mixin min-width($width) {
//   @media (min-width: $width) {
//     @content;
//   }
// }

// @mixin mobile {
//   @media (max-width: $mobile) {
//     @content;
//   }
// }

// @mixin mobile-up {
//   @media (min-width: $mobile) {
//     @content;
//   }
// }

// @mixin tablet-down {
//   @media (max-width: $tablet) {
//     @content;
//   }
// }

// @mixin tablet {
//   @media (min-width: $mobile) and (max-width: $tablet) {
//     @content;
//   }
// }

// @mixin tablet-up {
//   @media (min-width: $tablet) {
//     @content;
//   }
// }

// @mixin laptop-down {
//   @media (max-width: $laptop) {
//     @content;
//   }
// }

// @mixin laptop {
//   @media (min-width: $tablet) and (max-width: $laptop) {
//     @content;
//   }
// }

// @mixin laptop-up {
//   @media (min-width: $laptop) {
//     @content;
//   }
// }

// @mixin desktop {
//   @media (min-width: $desktop) {
//     @content;
//   }
// }
