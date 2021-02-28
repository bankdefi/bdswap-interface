import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { TYPE, StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { ETHER, JSBI, TokenAmount } from '@bdswap/sdk'
import { ButtonPrimary } from '../Button'
import { StakingInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { Break } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { useTranslation } from 'react-i18next'
import { BDS } from '../../constants'
import { useActiveWeb3React } from '../../hooks'

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  grid-gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  /*display: none;*/
`};
`

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  box-shadow:rgba(0, 0, 0, 0.18) 10px 8px 15px 5px, rgba(255, 255, 255, 0.565) -8px -10px 15px 5px;
  border-radius:20px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: white;
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

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
  border-radius: 0 0 10px 10px;
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

export default function PoolCard({ stakingInfo }: { stakingInfo: StakingInfo }) {
  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]

  const currency0 = unwrappedToken(token0)
  const currency1 = unwrappedToken(token1)
  const { t } = useTranslation()

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  const token = currency0 === ETHER ? token1 : token0
  const WETH = currency0 === ETHER ? token0 : token1
  const backgroundColor = useColor(token)

  const totalSupplyOfStakingToken = useTotalSupply(stakingInfo.stakedAmount.token)
  const [, stakingTokenPair] = usePair(...stakingInfo.tokens)


  // let returnOverMonth: Percent = new Percent('0')
  let valueOfTotalStakedAmountInWETH: TokenAmount | undefined
  let valueOfTotalStakedAmountInWLSP: TokenAmount | undefined

  if (totalSupplyOfStakingToken && stakingTokenPair) {
    // take the total amount of LP tokens staked, multiply by HT value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmountInWETH = new TokenAmount(
      WETH,
      JSBI.divide(
        JSBI.multiply(
          JSBI.multiply(stakingInfo.totalStakedAmount.raw, stakingTokenPair.reserveOf(WETH).raw),
          JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
        ),
        totalSupplyOfStakingToken.raw
      )
    )
    valueOfTotalStakedAmountInWLSP = new TokenAmount(
      WETH,
      JSBI.multiply(stakingInfo.totalStakedAmount.raw, JSBI.BigInt(1))
    )
  }

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(WETH)
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmountInWETH && USDPrice?.quote(valueOfTotalStakedAmountInWETH)
  
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? BDS[chainId] : undefined
  const uniPrice = useUSDCPrice(uni)
  const weekReward = stakingInfo.totalRewardRate?.multiply(`${60 * 60 * 24 * 7}`)?.toFixed(0)
  const apy = valueOfTotalStakedAmountInUSDC && weekReward && uniPrice ? (Number(weekReward) * Number(uniPrice?.toFixed(8)) / Number(valueOfTotalStakedAmountInUSDC.toFixed(0)) / 7 * 365 * 100).toFixed(0) : '--' 
  console.debug('apy:', apy.toString(), '%');
  console.debug('apy', apy.toString(), 
    'valueOfTotalStakedAmountInUSDC', valueOfTotalStakedAmountInUSDC && valueOfTotalStakedAmountInUSDC.toFixed(0),
    'valueOfTotalStakedAmountInWETH', valueOfTotalStakedAmountInWETH && valueOfTotalStakedAmountInWETH.toFixed(0),
    'USDPrice', USDPrice&&USDPrice.toFixed(8),
    'stakingTokenPair', stakingTokenPair && stakingTokenPair,
    'reserveOf', stakingTokenPair && stakingTokenPair.reserveOf(WETH).toFixed(8),
    'WETH', WETH.address,
    'totalStakedAmount', stakingInfo && stakingInfo.totalStakedAmount.toFixed(8),
    'totalSupplyOfStakingToken', totalSupplyOfStakingToken && totalSupplyOfStakingToken.toFixed(8),
    weekReward.toString(), uniPrice?.toFixed(8));

  if (valueOfTotalStakedAmountInUSDC && stakingTokenPair) {
    if (!window.tvlItems) {
      window.tvlItems = {}
    }
    window.tvlItems[stakingTokenPair!.liquidityToken.address] = valueOfTotalStakedAmountInUSDC.toFixed(0)
  }

  return (
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      
      <TopSection>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
        <TYPE.black fontWeight={600} fontSize={18} style={{ marginLeft: '8px' }}>
          {currency0.symbol} / {currency1.symbol}
        </TYPE.black>

        <StyledInternalLink to={`/farm/${currencyId(currency0)}/${currencyId(currency1)}`} style={{ width: '100%',color:'transparent' }}>
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.black>{t('totalDeposited')}</TYPE.black>
          <TYPE.black>
            {valueOfTotalStakedAmountInUSDC
              ? `🏆 APY: ${apy}%`
              // ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}  🏆 APY: ${apy}%`
              //  +
              //   ' / ' +
              //   `${valueOfTotalStakedAmountInWLSP?.toSignificant(6, { groupSeparator: ',' }) ?? '-'} BDSLP`
              : `${valueOfTotalStakedAmountInWLSP?.toSignificant(6, { groupSeparator: ',' }) ?? '-'} BDSLP`}
          </TYPE.black>
        </RowBetween>
        <RowBetween>
          <TYPE.black> Pool rate </TYPE.black>
          <TYPE.black>{`${stakingInfo.totalRewardRate
            ?.multiply(`${60 * 60 * 24 * 7}`)
            ?.toFixed(0, { groupSeparator: ',' })} BDS / week`}</TYPE.black>
        </RowBetween>
      </StatContainer>

      {isStaking && (
        <>
          <Break />
          <BottomSection showBackground={true}>
            <TYPE.black fontWeight={500}>
              <span>Your rate</span>
            </TYPE.black>

            <TYPE.black style={{ textAlign: 'right' }} fontWeight={500}>
              <span  id="animate-zoom" role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
              💗
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24 * 7}`)
                ?.toFixed(0, { groupSeparator: ',' })} BDS / week`}
            </TYPE.black>
          </BottomSection>
        </>
      )}
    </Wrapper>
  )
}
