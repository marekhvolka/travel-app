import React from 'react'
import { Input } from '../../../common/atoms/Input/Input'
import { Select } from '../../../common/atoms/Select/Select'
import { TextArea } from '../../../common/atoms/TextArea/TextArea'
import { Voucher } from '../../../models/Voucher'
import { Guide } from '../../../models/Guide'

type Props = {
  model: Voucher
  modelChanged: any
  guides: Guide[]
}

export const VoucherForm = ({ modelChanged, model, guides }: Props) => (
  <>
    <Input name="code" label="Voucher code" value={model.code} onChange={modelChanged}/>
    <Input name="price" type="number" label="Voucher price" value={model.price} onChange={modelChanged}/>
    <Input
      name="maxUsageCount"
      type="number"
      label="Maximum number of usage"
      value={model.maxUsageCount}
      onChange={modelChanged}
    />
    <TextArea
      label="Description"
      placeholder="Description"
      name="description"
      value={model.description}
      onChange={modelChanged}
    />
    <Select label="Guide" name="guideId" onChange={modelChanged} options={guides} value={model.guideId}/>
  </>
)
