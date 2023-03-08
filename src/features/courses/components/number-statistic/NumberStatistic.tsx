import React from "react"
import styled from "styled-components"
import { S, XXL } from "../../../../ui"
import theme from "../../../../utils/theme"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding: 16px 12px 12px 12px;
  border-radius: 2px;
  background: ${theme.blackA};

  ${S} {
    margin-top: 4px;
  }
`

export interface NumberStatisticProps {
  value: number
  label: string
}

export const NumberStatistic = ({ label, value }: NumberStatisticProps) => {
  return (
    <Container className="number-statistic">
      <XXL>{value}</XXL>
      <S>{label}</S>
    </Container>
  )
}
