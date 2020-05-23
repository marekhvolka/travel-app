import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { Select } from '../../../common/atoms/Select/Select'
import { TextArea } from '../../../common/atoms/TextArea/TextArea'
import { makeForm } from '../../../common/organism/Form/makeForm'

export const VoucherForm = makeForm(({ onChange, model, guides }) => (
  <>
    <Input name="code" label="Voucher code" value={model.code} onChange={onChange}/>
    <Input name="price" type="number" label="Voucher price" value={model.price} onChange={onChange}/>
    <Input
      name="maxUsageCount"
      type="number"
      label="Maximum number of usage"
      value={model.maxUsageCount}
      onChange={onChange}
    />
    <TextArea
      label="Description"
      placeholder="Description"
      name="description"
      value={model.description}
      onChange={onChange}
    />
    <Select label="Guide" name="guideId" onChange={onChange} options={guides} value={model.guideId}/>
  </>
))
