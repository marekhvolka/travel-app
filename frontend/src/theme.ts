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
