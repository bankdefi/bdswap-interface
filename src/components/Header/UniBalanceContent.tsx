import { ChainId, TokenAmount } from '@bdswap/sdk'
import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/svg/BDSToken.svg'
import { BDS } from '../../constants'
import { useTotalSupply, useTotalBurned } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
// import { useMerkleDistributorContract } from '../../hooks/useContract'
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { useTotalUniEarned } from '../../state/stake/hooks'
import { useAggregateUniBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, TYPE, UniTokenAnimated } from '../../theme'
// import { computeUniCirculation } from '../../utils/computeUniCirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'
import { useTranslation } from 'react-i18next'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: rgba(0, 0, 0, 0.18) 10px 8px 15px 5px, rgba(255, 255, 255, 0.565) -8px -10px 15px 5px;
  background: 'white';
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function UniBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const uni = chainId ? BDS[chainId] : undefined

  const { t } = useTranslation()

  const total = useAggregateUniBalance()
  const uniBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, uni)
  const uniToClaim: TokenAmount | undefined = useTotalUniEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(uni)
  const totalBurned: TokenAmount | undefined = useTotalBurned(uni)
  const uniPrice = useUSDCPrice(uni)
  const blockTimestamp = useCurrentBlockTimestamp()
  // const unclaimedUni = useTokenBalance(useMerkleDistributorContract()?.address, uni)
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && uni && chainId === ChainId.HECO_MAINNET
        ? totalSupply?.subtract(totalBurned ? totalBurned : new TokenAmount(uni!, '0'))
        : totalSupply?.subtract(totalBurned ? totalBurned : new TokenAmount(uni!, '0')),
    [blockTimestamp, chainId, totalSupply, uni, totalBurned]
  )

  const burned: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && uni && chainId === ChainId.HECO_MAINNET
        ? totalBurned
        : totalBurned,
    [blockTimestamp, chainId, totalBurned, uni]
  )

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween style={{ justifyContent: 'center' }}>
            <TYPE.white color="white" style={{ fontSize: 20 }}>{t('breakdown')}</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <div style={{ position: 'relative' }}>
                  <img src={tokenLogo} alt={'icon'} style={{ width: 120, height: 120, position: 'absolute', filter: 'drop-shadow(rgba(0, 0, 0, 0.3) 8px 8px 10px) drop-shadow(rgba(255, 255, 255, 0.565) -5px -5px 10px)' }} />
                  <UniTokenAnimated width="120px" src={tokenLogo} />{' '}
                </div>
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">{t('balance2')}</TYPE.white>
                  <TYPE.white color="white">{uniBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">{t('unclaimed')}:</TYPE.white>
                  <TYPE.white color="white">
                    {uniToClaim?.toFixed(2, { groupSeparator: ',' })}{' '}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">{t('waspPrice')}</TYPE.white>
              <TYPE.white color="white">${uniPrice?.toFixed(4) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">{t('waspInCirculation')}</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">{t('waspBurned')}</TYPE.white>
              <TYPE.white color="white">{burned?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {/* <RowBetween>
              <TYPE.white color="white">{t('totalSupply')}</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween> */}
            {uni && uni.chainId === ChainId.HECO_MAINNET ? (
              <ExternalLink href={`https://scan.hecochain.com/token/${uni.address}`}>View BDS Token Information</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
