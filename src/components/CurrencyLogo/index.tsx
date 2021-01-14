import { Currency, ETHER, Token } from '@bdswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/HT.png'
import { HBTC, HETH } from '../../constants'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) => {
  if (address.toLowerCase() === HBTC.address.toLowerCase()) {
    return 'https://raw.githubusercontent.com/bankdefi/token-list/main/icons/BTC.png';
  }

  if (address.toLowerCase() === HETH.address.toLowerCase()) {
    return 'https://raw.githubusercontent.com/bankdefi/token-list/main/icons/ETH.png';
  }

  return (`https://www.wanscan.org/img/tokens/${address}.png`).toLowerCase()
}

const StyledEthereumLogo = styled.img<{ size: string }>`
 
  height: ${({ size }) => size};
  margin-right:-3px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
 
  height: ${({ size }) => size};
  margin-right:-3px;
  
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency?.symbol === 'BDS') {
      return [require('../../assets/svg/Logomark_WASP_token.svg')]
    }

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
