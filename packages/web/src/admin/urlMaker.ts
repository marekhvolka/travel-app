export const getItemUrl = (id: string): string => `/items/edit/${id}`
export const getGuideUrl = (id: string): string => `/guides/edit/${id}`
export const getCityUrl = (id: string): string => `/cities/edit/${id}`
export const getVoucherUrl = (id: string): string => `/vouchers/edit/${id}`
export const getTagUrl = (id: string): string => `/tags/edit/${id}`
export const getUserUrl = (id: string): string => `/users/edit/${id}`

export const getUrl = (id: string, type: string): string => {
  switch (type) {
    case 'item': return getItemUrl(id)
    case 'guide': return getGuideUrl(id)
    case 'city': return getCityUrl(id)
    case 'voucher': return getVoucherUrl(id)
    case 'tag': return getTagUrl(id)
    case 'user': return getUserUrl(id)
  }
}
