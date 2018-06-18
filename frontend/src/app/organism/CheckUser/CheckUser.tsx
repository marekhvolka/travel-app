import React, { useState } from 'react'
import Modal from 'react-modal'
import Link from 'react-router-dom/Link'
import { Button } from '../../../common/atoms/Button/Button'
import { makeModal } from '../../molecules/ModalWindow/ModalWindow'

const CheckUser = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Modal isOpen={isOpen}>
      <div>
        <h3 className={'text-center'}>
          Do you want to login or play without an account?
        </h3>
        <div className={'p-5 text-center'}>
          <Link to={'/login'}>
            <Button primary>Login</Button>
          </Link>
          <Button onClick={() => setIsOpen(false)}>
            Play without account
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default makeModal(CheckUser)
