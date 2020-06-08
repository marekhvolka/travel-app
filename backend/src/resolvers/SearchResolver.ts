import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '../models/Context'
import { Guide } from '../models/Guide'
import { Item } from '../models/Item'
import { SearchResult } from '../models/SearchResult'
import { Tag } from '../models/Tag'
import { Voucher } from '../models/Voucher'
import { AuthorizationError } from '../utils/errors'

@Resolver(() => SearchResult)
export class CityResolver {
  @Query(() => [SearchResult])
  async search(@Arg('searchTerm') searchTerm: String, @Ctx() context: Context) {
    if (!context.user) {
      throw new AuthorizationError('User not authorized')
    }

    const result: SearchResult[] = []

    const items = await Item.find({
      where: {
        $or: [
          {
            name: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
          {
            title: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
          {
            description: {
              $regex: searchTerm,
              $options: 'i'
            }
          }
        ]
      },
      take: 10
    })

    items.map((item: Item) => {
      result.push({
        id: item.id,
        name: item.name + ' (Item)',
        type: 'item'
      })
    })

    const guides = await Guide.find({
      where: {
        $or: [
          {
            name: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
          {
            description: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
          {
            url: {
              $regex: searchTerm,
              $options: 'i'
            }
          }
        ]
      },
      take: 10
    })

    guides.map((guide: Guide) => {
      result.push({
        id: guide.id,
        name: guide.name + ' (Guide)',
        type: 'guide'
      })
    })

    const tags = await Tag.find({
      where: {
        $or: [
          {
            name: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
          {
            description: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
        ]
      },
      take: 10
    })

    tags.map((tag: Tag) => {
      result.push({
        id: tag.id,
        name: tag.name + ' (Tag)',
        type: 'tag'
      })
    })

    const vouchers = await Voucher.find({
      where: {
        $or: [
          {
            code: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
          {
            description: {
              $regex: searchTerm,
              $options: 'i'
            }
          },
        ]
      },
      take: 10
    })

    vouchers.map((voucher: Voucher) => {
      result.push({
        id: voucher.id,
        name: voucher.code + ' (Voucher)',
        type: 'voucher'
      })
    })

    return result
  }
}
