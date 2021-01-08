import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { TYPE, StyledInternalLink } from '../../theme'
import { ETHER } from '@bdswap/sdk'
import { ButtonPrimary } from '../Button'
import { StakingInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { Break, CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTranslation } from 'react-i18next'
import DoubleCurrencyLogo from '../DoubleLogo'
import { Countdown } from '../../pages/Hive/Countdown'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { useActiveWeb3React } from '../../hooks'
import { BDS } from '../../constants'

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  grid-gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
border-radius:20px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: radial-gradient(100% 90% at 20% 0%,#41beec 0%,#123471 100%);
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

// const APR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

declare global {
  interface Window {
    tvlItems: any;
  }
}

export default function HiveCard({ stakingInfo, i }: { stakingInfo: StakingInfo; i: number }) {
  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]

  const currency0 = unwrappedToken(token0)
  const { t } = useTranslation()

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  const token = currency0 === ETHER ? token1 : token0
  const backgroundColor = useColor(token)

  const { chainId } = useActiveWeb3React()
  const uni = chainId ? BDS[chainId] : undefined

  const uniPrice = useUSDCPrice(uni)

  if (stakingInfo && uniPrice) {
    if (!window.tvlItems) {
      window.tvlItems = {}
    }
    window.tvlItems['hive'] = (Number(stakingInfo?.totalStakedAmount.toFixed(0)) * Number(uniPrice.toFixed(8))).toFixed(0)
  }

  return (
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <DoubleCurrencyLogo currency0={currency0} currency1={ETHER} size={24} />
        <TYPE.white fontWeight={600} fontSize={18} style={{ marginLeft: '8px' }}>
          {currency0.symbol + ' → ' + ETHER.symbol + " #" + (i+1)}
          <Countdown exactEnd={stakingInfo?.periodFinish} exactStart={stakingInfo?.periodStart} />
        </TYPE.white>

        <StyledInternalLink to={`/hive/${currencyId(currency0)}/${i}`} style={{ width: '100%',color:'transparent' }}>
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white>{t('totalDeposited')}</TYPE.white>
          <TYPE.white>
            {`${stakingInfo?.totalStakedAmount.toFixed(0, { groupSeparator: ',' }) ?? '-'} BDS`}
          </TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Pool rate </TYPE.white>
          <TYPE.white>{`${stakingInfo.totalRewardRate
            ?.multiply(`${60 * 60 * 24 * 7 / 5}`)
            ?.toFixed(0, { groupSeparator: ',' })} HT / week`}</TYPE.white>
        </RowBetween>
      </StatContainer>

      {isStaking && (
        <>
          <Break />
          <BottomSection showBackground={true}>
            <TYPE.black color={'white'} fontWeight={500}>
              <span>Your rate</span>
            </TYPE.black>

            <TYPE.black style={{ textAlign: 'right' }} color={'white'} fontWeight={500}>
              <span  id="animate-zoom" role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
              ⚡
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24 * 7 / 5}`)
                ?.toFixed(4, { groupSeparator: ',' })} HT / week`}
            </TYPE.black>
          </BottomSection>
        </>
      )}
    </Wrapper>
  )
}
