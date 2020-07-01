import React, { useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { Button } from '../../../common/atoms/Button/Button'
import { makeModal } from '../../molecules/ModalWindow/ModalWindow'

const CheckUser = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Modal isOpen={isOpen}>
      <div>
        <h3 style={{textAlign: 'center'}}>Do you want to login or play without an account?</h3>
        <div>
          <Link to={'/login'}>
            <Button primary>Login</Button>
          </Link>
          <Button onClick={() => setIsOpen(false)}>Explore without account</Button>
        </div>
      </div>
    </Modal>
  )
}

export default makeModal(CheckUser)
