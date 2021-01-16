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
    return 'https://token-icons.vercel.app/icon/BTC.png';
  }

  if (address.toLowerCase() === HETH.address.toLowerCase()) {
    return 'https://token-icons.vercel.app/icon/ETH.png';
  }

  if (address.toLowerCase() === '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd') {
    return 'https://token-icons.vercel.app/icon/ETH.png';
  }

  if (address.toLowerCase() === '0x1ed3538383bbfdb80343b18f85d6c5a5fb232fb6') {
    return 'https://token-icons.vercel.app/icon/HT.png';
  }

  return (`https://token-icons.vercel.app/tokens/${address}.png`).toLowerCase()
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
      return [require('../../assets/svg/BDSToken.svg')]
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
