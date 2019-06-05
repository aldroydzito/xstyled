/* eslint-disable no-continue, no-loop-func, no-cond-assign */
import emStyled from '@emotion/styled'
import { css } from './css'

function flattenFunc(value, arg) {
  if (typeof value === 'function') {
    return flattenFunc(value(arg), arg)
  }
  return value
}

function getCreateStyle(baseCreateStyle) {
  return (...args) =>
    baseCreateStyle(p => {
      const flattenedArgs = args.map(arg => flattenFunc(arg, p))
      const result = css(...flattenedArgs)(p)
      return result
    })
}

export function styled(component) {
  return getCreateStyle(emStyled(component))
}

Object.keys(emStyled).forEach(key => {
  styled[key] = styled(key)
})
