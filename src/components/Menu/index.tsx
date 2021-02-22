import React, { useRef } from 'react'
import { BookOpen, Code, Info, MessageCircle } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
// import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
// import { ButtonPrimary } from '../Button'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: white;
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: #0071bc;

  padding: 0.15rem 0.5rem;
  border-radius: 10px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: #0071bc;
    opacity:0.9;
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 9.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

export default function Menu() {
  // const { account } = useActiveWeb3React()

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  // const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          {false && <MenuItem id="link" href="https://twitter.com/bankdefi">
            <Info size={14} />
            Twitter
          </MenuItem>}
          <MenuItem id="link" href="https://medium.com/@bankdefi">
            <BookOpen size={14} />
            Blog
          </MenuItem>
          <MenuItem id="link" href="https://docs.bankdefi.finance/">
            <BookOpen size={14} />
            Docs
          </MenuItem>
          <MenuItem id="link" href="https://t.me/BankDefiCommunity">
            <MessageCircle size={14} />
            Telegram
          </MenuItem>
          <MenuItem id="link" href="https://github.com/bankdefi/bdswap-interface/discussions">
            <MessageCircle size={14} />
            Discussions
          </MenuItem>
          <MenuItem id="link" href="https://github.com/bankdefi">
            <Code size={14} />
            Code
          </MenuItem>
          {false && <MenuItem id="link" href="https://t.me/bankdefi_official">
            <MessageCircle size={14} />
            Telegram
          </MenuItem>}
          {
          /*
          <MenuItem id="link" href="https://uniswap.info/">
            <PieChart size={14} />
            Analytics
          </MenuItem> */}
          {/* {account && (
            <ButtonPrimary onClick={openClaimModal} padding="8px 16px" width="100%" borderRadius="12px" mt="0.5rem">
              Claim BDS
            </ButtonPrimary>
          )} */}
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
