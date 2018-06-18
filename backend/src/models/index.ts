import mongoose  from 'mongoose'
import config from '../../config/config'

const Schema = mongoose.Schema
const String = Schema.Types.String
const Boolean = Schema.Types.Boolean
const Number = Schema.Types.Number
const ObjectId = Schema.Types.ObjectId

mongoose.connect(
  config.mongodb.host,
  {
    dbName: config.mongodb.database,
    user: config.mongodb.username,
    pass: config.mongodb.password,
    useNewUrlParser: true,
  },
)

const VoucherSchema = new Schema({
  code: String,
  price: Number,
  description: String,
  partnerId: String,
})

const GuideDataSchema = new Schema({
  guideId: String,
  mapZoomLevel: Number,
  mapLatitude: Number,
  mapLongitude: Number,
  viewType: String,
  itemId: String,
  favouriteItemIds: [String],
})

const UserSchema = new Schema({
  email: String,
  passwordHash: String,
  role: String,
  guidesData: [GuideDataSchema],
})

const TagSchema = new Schema({
  name: String,
  description: String,
  color: String,
  icon: String,
  published: Boolean,
  items: [
    {
      type: ObjectId,
      ref: 'Item',
    },
  ],
})

const ItemSchema = new Schema({
  name: String,
  title: String,
  description: String,
  type: String,
  published: Boolean,
  previewImageUrl: String,
  tagIds: [String],
  latitude: Number,
  longitude: Number,
  zoomLevel: Number,
})

const ItemRelationSchema = new Schema({
  firstItemId: String,
  secondItemId: String,
})

const CitySchema = new Schema({
  name: String,
  items: [ItemSchema],
})

const GuideSchema = new Schema({
  name: String,
  url: String,
  description: String,
  latitude: Number,
  longitude: Number,
  zoomLevel: Number,
  published: Boolean,
  cityId: String,
  previewImageUrl: String,
  itemIds: [String],
  price: Number,
  currency: String,
})

export const City = mongoose.model('City', CitySchema)
export const User = mongoose.model('User', UserSchema)

export const GuideData = mongoose.model('GuideData', GuideDataSchema)

export const Item = mongoose.model('Item', ItemSchema)
export const ItemRelation = mongoose.model('ItemRelation', ItemRelationSchema)
export const Guide = mongoose.model('Guide', GuideSchema)
export const Tag = mongoose.model('Tag', TagSchema)

export const Voucher = mongoose.model('Voucher', VoucherSchema)
