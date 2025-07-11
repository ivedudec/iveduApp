import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { isHexString } from 'ethereumjs-util';
import {
  Display,
  TextColor,
  TextVariant,
} from '../../../../../helpers/constants/design-system';
import {
  getCurrentChainId,
  getConversionRate,
  getCurrentCurrency,
} from '../../../../../ducks/iveduapp/iveduapp';
import { formatValue, isValidAmount } from '../../../../../../app/scripts/lib/util';

const nativeTokenAddress = chainId =>
  require('@iveduapp/assets-controllers').getNativeTokenAddress(chainId);

const numericToEth = numeric => {
  return numeric.toBase(10).toDenomination('ETH').round(2, BigNumber.ROUND_HALF_DOWN);
};

export const renderPercentageWithNumber = (value, formattedValuePrice, color) => (
  <Box display={Display.Flex}>
    <Text
      variant={TextVariant.bodyMdMedium}
      color={color}
      data-testid="token-increase-decrease-value"
      style={{ whiteSpace: 'pre' }}
      ellipsis
    >
      {formattedValuePrice}
    </Text>
    <Text
      variant={TextVariant.bodyMdMedium}
      color={color}
      data-testid="token-increase-decrease-percentage"
      ellipsis
    >
      {value}
    </Text>
  </Box>
);

export const PercentageAndAmountChange = ({ value }) => {
  const fiatCurrency = useSelector(getCurrentCurrency);
  const locale = useSelector(state => state.locale.intlLocale);
  
  

};
