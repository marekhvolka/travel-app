import React, { Fragment } from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { TextArea } from '../../../common/atoms/TextArea/TextArea'
import { makeForm } from '../../../common/organism/Form/makeForm'

export const VoucherForm = makeForm(({ onChange, model }) => (
  <Fragment>
    <Input name="code" label="Voucher code" value={model.code} onChange={onChange} />
    <Input name="price" type="number" label="Voucher price" value={model.price} onChange={onChange} />
    <TextArea
      label="Description"
      placeholder="Description"
      name="description"
      value={model.description}
      onChange={onChange}
    />
  </Fragment>
))
