import React from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import _ from 'lodash';

import { formatNumber } from 'utils/formatting';
import { CURRENCIES } from 'utils/currencies';

import CurrencyColor from 'components/CurrencyColor';
import PriceChange from 'components/PriceChange';

import styles from './AssetList.scss';

const AssetList = ({ assets }) => {
  // Order assets based on the "official order"
  const sortedAssets = _.sortBy(assets, (asset) => {
    const assetList = CURRENCIES.map(currency => currency.symbol);
    return assetList.indexOf(asset.symbol);
  });

  return (
    <Flex auto column className={ styles.container }>
      { sortedAssets.map(asset => (
        <AssetRow
          key={ asset.symbol }
          { ...asset }
        />
      )) }
    </Flex>
  );
};

const AssetRow = ({
  name,
  symbol,
  color,
  balance,
  nativeBalance,
  change,
}) => {
  const direction = change >= 0 ? 'up' : 'down';

  return (
    <Flex
      align="center"
      justify="space-between"
      className={ styles.row }
    >
      <Flex align="flex-start">
        <CurrencyColor color={ color } className={ styles.colorDot } />
        <Flex column>
          <div>{ name }</div>
          <div className={ styles.balance }>
            { formatNumber(balance) } { symbol }
          </div>
        </Flex>
      </Flex>
      <div>
        <Flex justify="flex-end">
          { formatNumber(nativeBalance, 'USD') }
        </Flex>
        <Flex justify="flex-end">
          <PriceChange direction={ direction } trigger={ change }>
            { formatNumber(change, 'USD', { directionSymbol: true }) }
          </PriceChange>
        </Flex>
      </div>
    </Flex>
  );
};

export default observer(AssetList);
