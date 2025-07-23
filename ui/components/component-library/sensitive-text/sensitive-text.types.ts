import type { TextProps } from '../text/text.types';

export const SensitiveTextLength = {
  Short: '6',
  Medium: '9',
  Long: '12',
  ExtraLong: '20',
} as const;

export type SensitiveTextLengthType = typeof SensitiveTextLength[keyof typeof SensitiveTextLength];
export type CustomLength = string;
export type SensitiveTextProps<C extends React.ElementType = 'p'> = Omit<TextProps<C>, 'children'> & {
  isHidden?: boolean;
  length?: SensitiveTextLengthType | CustomLength;
  children?: React.ReactNode;
};
