import styled from 'styled-components'
import { EmojiFoodBeverage } from 'styled-icons/material-outlined'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  padding: 5px 3px;
  border-radius: 5px;

  background-color: transparent;

  transition: background-color 0.2s;


  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > div span {
    color: var(--senary);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:hover,
  &.active {
    background-color: var(--quinary);

    > div span {
      color: var(--white);
    }
  }
`

export const ContestIcon = styled(EmojiFoodBeverage)`
  width: 20px;
  height: 20px;

  color: var(--symbol);
  margin: 0 5px;
`
