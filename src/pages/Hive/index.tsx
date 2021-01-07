import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { useAllStakingRewardsInfo, useStakingInfo } from '../../state/hive/hooks'
import { TYPE, ExternalLink } from '../../theme'
import HiveCard from '../../components/earnHive/HiveCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
// import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()
  const stakingRewardsInfo = useAllStakingRewardsInfo()

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (stakingRewardsInfo[chainId]?.length ?? 0) > 0)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Hive your BDS</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Hive your BDS to get honey tokens.
                </TYPE.white>
              </RowBetween>{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://medium.com/wanswap/introducing-wanswap-the-wanchain-based-cross-chain-decentralized-exchange-with-automated-market-5e5f5956c223"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about BDS Hive</TYPE.white>
              </ExternalLink>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          {/* <Countdown exactEnd={stakingInfos?.[0]?.periodFinish} exactStart={stakingInfos?.[0]?.periodStart} /> */}
        </DataRow>

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            stakingInfos?.map((stakingInfo, i) => {
              return <HiveCard key={i} stakingInfo={stakingInfo} i={i}/>
            })
          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
