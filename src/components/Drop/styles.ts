import styled from 'styled-components'
import AceEditor from "react-ace";

export const Container = styled.div`
  grid-area: DF;
`

export const SubmitButton = styled.button`

  align-items: center;
  background: var(--discord);
  border-radius: 4px;
  margin: 20px;
  padding: 0 12px;

  &:hover {
    background: var(--link);
    cursor: pointer;
  }
`

export const DropFiles = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--gray);

  > div {
    width: 100% !important;
    
  }

`

export const Editor = styled(AceEditor)`
    * {
        font-family: inherit;
    }
`
export const DropFilesZone = styled.div`

  > span {
    font-size: 2rem;
    color: var(--gray);
  }

  > p {
    margin-bottom: 10px;
  }

  &:hover {
    cursor: pointer;
  }
`