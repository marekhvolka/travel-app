import { DefaultTheme } from "styled-components"
import {
  BorderRadiusProps,
  FontFamilyProps,
  FontSizeProps,
  FontStyleProps,
  FontWeightProps,
  LetterSpacingProps,
  LineHeightProps,
  SizeProps,
  SpaceProps,
  TextAlignProps,
  TextStyleProps
} from 'styled-system'

export type StyledSystemProps =
  | SpaceProps
  | FontSizeProps
  | FontStyleProps
  | SizeProps
  | TextStyleProps
  | LetterSpacingProps
  | FontFamilyProps
  | FontWeightProps
  | BorderRadiusProps
  | FontFamilyProps
  | LineHeightProps
  | TextAlignProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { color: string; as?: keyof JSX.IntrinsicElements | React.ComponentType<any> }

const theme: DefaultTheme = {
  color: {
    primary: '#aa4439',
    secondary: 'white',
    muted: '#6d7688',
  },
  border: {
    radius: '5px',
    color: '#ccc',
  },
}

export default theme

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const media = {
  mobile: `@media only screen and (max-width: ${size.mobileL})`,
  tablet: `@media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop})`,
  desktop: `@media only screen and (min-width: ${size.laptop})`,
  bigDesktop: `@media only screen and (min-width: ${size.laptopL})`,
};
