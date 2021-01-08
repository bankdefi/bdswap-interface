import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 10px 8px 15px 5px #0000002e, -8px -10px 15px 5px #ffffff90;
  border-radius: 20px;
  padding: 15px;

`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper id="body-wrapper">{children}</BodyWrapper>
}
