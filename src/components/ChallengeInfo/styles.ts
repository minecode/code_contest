import styled from 'styled-components'
import { Hashtag } from 'styled-icons/heroicons-outline'
import { AlternateEmail } from 'styled-icons/material'

export const ContainerDescription = styled.div`
  grid-area: CD;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: var(--primary);
`

export const Info = styled.div`
  padding: 30px;

  display: flex;
  flex-direction: column;

  /* max-height: calc(100vh - 250px - 46px); */
  /* overflow-y: scroll; */

  color: var(--white);

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }
`

export const InputWrapper = styled.div`
  width: 100%;

  padding: 16px;
`

export const Input = styled.input`
  width: 100%;
  height: 44px;

  padding: 0 10px 0 57px;
  border-radius: 7px;

  color: var(--white);
  background-color: var(--chat-input);

  position: relative;

  &::placeholder {
    color: var(--gray);
  }

  ~ svg {
    position: relative;
    top: -50%;
    left: 14px;
    transition: 180ms ease-in-out;
  }
`

export const InputIcon = styled(AlternateEmail)`
  width: 24px;
  height: 24px;

  color: var(--gray);
`

export const ContainerInfo = styled.div`
  grid-area: CI;

  display: flex;
  align-items: center;

  padding: 0 17px;
  background-color: var(--primary);

  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
  z-index: 2;
`

export const HashtagIcon = styled(Hashtag)`
  width: 24px;
  height: 24px;

  color: var(--symbol);
`

export const Title = styled.h1`
  margin-left: 9px;

  font-size: 16px;
  font-weight: bold;

  color: var(--white);

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const Separator = styled.div`
  height: 24px;
  width: 1px;

  background-color: var(--white);
  opacity: 0.2;

  margin: 0 13px;
`

export const Description = styled.span`
  font-size: 15px;
  color: var(--gray);

  text-overflow: ellipsis;
  overflow: hidden;
`
