import React from 'react'
import 'jest-dom/extend-expect'
import { render } from '@testing-library/react'
import styled from '@emotion/styled'
import { css } from './css'

describe('#css', () => {
  it('transforms rules', () => {
    const Dummy = styled.div`
      ${css`
        margin: 2;
        padding: 1;
        margin-top: 2px;
      `}
    `
    const { container } = render(<Dummy />)
    expect(container.firstChild).toHaveStyle(`
      margin: 8px;
      margin-top: 2px;
      padding: 4px;
    `)
  })

  it('transforms multi values', () => {
    const Dummy = styled.div`
      ${css`
        margin: 1 2;
      `}
    `
    const { container } = render(<Dummy />)
    expect(container.firstChild).toHaveStyle('margin: 4px 8px;')
  })

  it('transforms constants', () => {
    const two = 2
    const Dummy = styled.div`
      ${css`
        margin: 1 ${two};
      `}
    `
    const { container } = render(<Dummy />)
    expect(container.firstChild).toHaveStyle('margin: 4px 8px;')
  })
})
