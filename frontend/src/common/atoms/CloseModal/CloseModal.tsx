import React from 'react'
import { Button } from '../Button/Button'

type Props = {
  onClick: any
}

export const CloseModal = ({ onClick }: Props) => <Button onClick={onClick}>X</Button>
