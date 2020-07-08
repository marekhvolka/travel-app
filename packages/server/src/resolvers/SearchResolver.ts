import { Guide, Item, SearchResult, Tag, Voucher } from '@md/common'
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getRepository } from 'typeorm'
import { isAuth } from '../middleware/isAuth'

@Resolver(() => SearchResult)
export class CityResolver {
  @Query(() => [SearchResult])
  @UseMiddleware(isAuth)
  async search(@Arg('searchTerm') searchTerm: String) {
    const result: SearchResult[] = []

    const items = await getRepository(Item).find({
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
        _id: item._id,
        name: item.name + ' (Item)',
        type: 'item'
      })
    })

    const guides = await getRepository(Guide).find({
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
        _id: guide._id,
        name: guide.name + ' (Guide)',
        type: 'guide'
      })
    })

    const tags = await getRepository(Tag).find({
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
        _id: tag._id,
        name: tag.name + ' (Tag)',
        type: 'tag'
      })
    })

    const vouchers = await getRepository(Voucher).find({
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
        _id: voucher._id,
        name: voucher.code + ' (Voucher)',
        type: 'voucher'
      })
    })

    return result
  }
}
