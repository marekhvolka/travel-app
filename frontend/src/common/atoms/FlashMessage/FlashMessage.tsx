import EventEmitter from 'events'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export enum FlashMessageType {
  ERROR,
  WARNING,
  SUCCESS,
  INFO
}

const ColorMap = {
  [FlashMessageType.ERROR]: 'red',
  [FlashMessageType.WARNING]: 'yellow',
  [FlashMessageType.SUCCESS]: 'green',
  [FlashMessageType.INFO]: 'blue',
}

type FlashMessageProps = {
  type: FlashMessageType
}

const Container = styled.div < FlashMessageProps > `
  border: 1px solid ${(props) => ColorMap[props.type]}
  border-radius: 5px
  position: absolute
  bottom: 30px
  right: 50px
  padding: 10px 20px
  z-index: 1000
  background: #fff
  color: ${(props) => ColorMap[props.type]}
`

const eventEmitter = new EventEmitter()

export const FlashMessage = () => {
  const [visibility, setVisibility] = useState(false)
  const [text, setText] = useState('')
  const [type, setType] = useState()
  const [timeoutHandler, setTimeoutHandler] = useState(0)

  useEffect(() => {
    eventEmitter.addListener('flash', ({ text, type }) => {
      setText(text)
      setType(type)
      setVisibility(true)

      setTimeoutHandler(setTimeout(() => {
        setVisibility(false)
      }, 5000))
    })

    return () => {
      clearTimeout(timeoutHandler)
    }
  }, [])

  return (
    visibility ? (
      <Container type={type}>
        <span>{text}</span>
      </Container>
    ) : (
      <div style={{display: 'none'}}></div>
    )
  )
}

export const showFlashMessage = (text: string, type: FlashMessageType) => {
  eventEmitter.emit('flash', { text, type })
}
