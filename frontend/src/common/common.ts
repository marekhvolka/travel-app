import config from '../config'

const IMAGE_SIZES = {
  THUMBNAIL: 'thumbnail',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
}

const ITEM_TYPES = {
  PLACE: 'place',
}

const getImageUrl = (size, imageUrl) =>
  imageUrl && (!imageUrl.includes('http') ? `${config.backendUrl}/${size}/${imageUrl}` : imageUrl)

const removeKeys = item => {
  const blackList = ['__typename']

  if (item === null || item === undefined) {
    return item
  }

  if (Array.isArray(item)) {
    return item.map(value => removeKeys(value))
  }

  if (typeof item === 'object') {
    const newObj = {}
    Object.entries(item).forEach(([key, value]) => {
      if (!blackList.includes(key)) {
        newObj[key] = removeKeys(value)
      }
    })
    return newObj
  }
  return item
}

export { IMAGE_SIZES, ITEM_TYPES, getImageUrl, removeKeys }
