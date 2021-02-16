import { ChainId, JSBI, Percent, Token, WETH } from '@bdswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { 
  // fortmatic, 
  injected, 
  // portis, walletconnect, walletlink 
} from '../connectors'

export const ROUTER_ADDRESS = '0x541219927DCccD832102caa86221F423d706465F'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// export const HUSD = new Token(ChainId.HECO_MAINNET, '0x0298c2b32eae4da002a15f36fdf7615bea3da047', 18, 'HUSD', 'HUSD')
export const DAI = new Token(ChainId.HECO_MAINNET, '0x60d64ef311a4f0e288120543a14e7f90e76304c6', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.HECO_MAINNET, '0xd459dad367788893c17c09e17cfbf0bf25c62833', 6, 'USDC', 'USDC')
export const USDT = new Token(ChainId.HECO_MAINNET, '0x0298c2b32eae4da002a15f36fdf7615bea3da047', 8, 'HUSD', 'HUSD')
export const COMP = new Token(ChainId.HECO_MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.HECO_MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.HECO_MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const WBTC = new Token(ChainId.HECO_MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 18, 'WBTC', 'Wrapped BTC')
export const USDT1 = new Token(ChainId.HECO_TESTNET, '0x04f535663110a392a6504839beed34e019fdb4e0', 6, 'wanUSDT', 'wanUSDT')

export const wanBTC = new Token(ChainId.HECO_MAINNET, '0xd15e200060fc17ef90546ad93c1c61bfefdc89c7', 8, 'wanBTC', 'wanBTC')
export const wanETH = new Token(ChainId.HECO_MAINNET, '0xe3ae74d1518a76715ab4c7bedf1af73893cd435a', 18, 'wanETH', 'wanETH')

export const HBTC = new Token(ChainId.HECO_MAINNET, '0x66a79d23e58475d2738179ca52cd0b41d73f0bea', 18, 'HBTC', 'Heco-Peg BTC Token');
export const HUSD = new Token(ChainId.HECO_MAINNET, '0x0298c2b32eae4da002a15f36fdf7615bea3da047', 8, 'HUSD', 'Heco-Peg HUSD Token');
export const HETH = new Token(ChainId.HECO_MAINNET, '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', 18, 'HETH', 'Heco-Peg ETH Token');
export const BDL = new Token(ChainId.HECO_MAINNET, '0xbb2edc71b5b0ec0eea892fb821c101e4db18b550', 18, 'BDL', 'BDL');
// export const HBTC = new Token(ChainId.HECO_MAINNET, '0x66a79d23e58475d2738179ca52cd0b41d73f0bea', 18, 'HBTC', 'Heco-Peg HBTC Token');


// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

const UNI_ADDRESS = '0x69120197b77b51d32fFA5eAfe16b3d78115640c6'
const UNI_ADDRESS_TESTNET = '0x3Bb87041edF93EaEA82F47F2B495E5859085E3eE'
export const BDS: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, 'BDS', 'BDSwap'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS_TESTNET, 18, 'BDS', 'BDSwap'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS_TESTNET, 18, 'BDS', 'BDSwap'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS_TESTNET, 18, 'BDS', 'BDSwap'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS_TESTNET, 18, 'BDS', 'BDSwap'),
  [ChainId.HECO_MAINNET]: new Token(ChainId.HECO_MAINNET, UNI_ADDRESS, 18, 'BDS', 'BDSwap'),
  [ChainId.HECO_TESTNET]: new Token(ChainId.HECO_TESTNET, UNI_ADDRESS, 18, 'BDS', 'BDSwap')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'UNI',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.HECO_MAINNET]: [WETH[ChainId.HECO_MAINNET]],
  [ChainId.HECO_TESTNET]: [WETH[ChainId.HECO_TESTNET]],

}
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.HECO_MAINNET]: [...WETH_ONLY[ChainId.HECO_MAINNET], HUSD, HBTC, HETH, BDS[ChainId.HECO_MAINNET], BDL]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [HUSD, WETH[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.HECO_MAINNET]: [...WETH_ONLY[ChainId.HECO_MAINNET], HUSD, HBTC, HETH, BDS[ChainId.HECO_MAINNET], BDL]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.HECO_MAINNET]: [...WETH_ONLY[ChainId.HECO_MAINNET], HUSD, HBTC, HETH, BDS[ChainId.HECO_MAINNET], BDL]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    ],
    [USDC, USDT],
    [DAI, USDT]
  ],
  [ChainId.HECO_MAINNET]: [
    [HBTC, HETH],
    [WETH[ChainId.HECO_MAINNET], HETH],
    [WETH[ChainId.HECO_MAINNET], HBTC],
    [WETH[ChainId.HECO_MAINNET], HUSD],
    [HUSD, BDS[ChainId.HECO_MAINNET]],
    [HUSD, BDL],
  ],
  [ChainId.HECO_TESTNET]: [
    [
      new Token(ChainId.HECO_TESTNET, '0xd459dad367788893c17c09e17cfbf0bf25c62833', 6, 'USDC', 'USDC'),
      new Token(ChainId.HECO_TESTNET, '0x04f535663110a392a6504839beed34e019fdb4e0', 6, 'USDT', 'USDT')
    ],
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  // WALLET_CONNECT: {
  //   connector: walletconnect,
  //   name: 'WalletConnect',
  //   iconName: 'walletConnectIcon.svg',
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   color: '#4196FC',
  //   mobile: true
  // },
  // WALLET_LINK: {
  //   connector: walletlink,
  //   name: 'Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Use Coinbase Wallet app on mobile device',
  //   href: null,
  //   color: '#315CF5'
  // },
  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com/mtUDhEZPy1',
  //   color: '#315CF5',
  //   mobile: true,
  //   mobileOnly: true
  // },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: 'Fortmatic',
  //   iconName: 'fortmaticIcon.png',
  //   description: 'Login using Fortmatic hosted wallet',
  //   href: null,
  //   color: '#6748FF',
  //   mobile: true
  // },
  // Portis: {
  //   connector: portis,
  //   name: 'Portis',
  //   iconName: 'portisIcon.png',
  //   description: 'Login using Portis hosted wallet',
  //   href: null,
  //   color: '#4A6C9B',
  //   mobile: true
  // }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much HT so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 HT
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
