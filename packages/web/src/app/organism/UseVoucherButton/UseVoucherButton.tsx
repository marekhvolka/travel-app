import { useMutation } from '@apollo/react-hooks'
import { Input, Modal } from 'antd'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button } from '../../../common/atoms/Button/Button'
import { FlashMessageType, showFlashMessage } from '../../../common/atoms/FlashMessage/FlashMessage'

const MUTATION = gql`
  mutation($voucherCode: String!) {
    useVoucher(voucherCode: $voucherCode) {
      id
      code
    }
  }
  
`

export const UseVoucherButton = () => {
  const [showedForm, setShowedForm] = useState(false)
  const [voucherCode, setVoucherCode] = useState('')
  const [enterVoucherCodeMutation, { error }] = useMutation(MUTATION)

  const sendVoucherCode = async () => {

    try {
      await enterVoucherCodeMutation({
        variables: {
          voucherCode
        }
      })

      setVoucherCode('')
      setShowedForm(false)
      showFlashMessage('Voucher successfully applied', FlashMessageType.SUCCESS)
    } catch (err) {
      // console.log(JSON.stringify(err))
    }
  }

  const onCloseModal = () => {
    setShowedForm(false)
    setVoucherCode('')
  }

  return (
    <>
      <Modal
        visible={showedForm}
        onCancel={onCloseModal}
        onOk={sendVoucherCode} okText="Apply voucher"
        title="Enter voucher code"
      >
        <Input
          placeholder="Voucher code"
          onChange={(event) => setVoucherCode(event.target.value)}
          value={voucherCode}
        />
        {error && error.graphQLErrors[0].message}
      </Modal>
      <Button onClick={() => setShowedForm(true)}>Use Voucher</Button>
    </>
  )
}
