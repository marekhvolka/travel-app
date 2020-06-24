import fs from 'fs-extra'
import path from 'path'
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { FileLoader } from '../data/loaders'
import { isAuth } from '../middleware/isAuth'
import { Context } from '../models/Context'
import { File } from '../models/File'
import { FileStats } from '../models/FileStats'
import { deleteFile } from '../utils/file-functions'

@Resolver(() => File)
export class FileResolver {
  @FieldResolver(() => String)
  name(@Root() file: File) {
    return path.basename(file.path)
  }

  @FieldResolver(() => String)
  async content(@Root() file: File) {
    const fullPath = FileLoader.makeFullPath(file.path)
    const fileHandler = await fs.open(fullPath, 'r+')
    return fs.readFile(fileHandler)
  }

  @FieldResolver(() => FileStats)
  async stats(@Root() file: File) {
    const fullPath = FileLoader.makeFullPath(file.path)
    try {
      const fileHandler = await fs.open(fullPath, 'r+')
      return fs.fstat(fileHandler)
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Query(() => File)
  @UseMiddleware(isAuth)
  file(@Arg('path', { nullable: false }) path: string) {
    return FileLoader.openFile(path)
    // get file info and pass it to file
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  delete(@Arg('path', { nullable: false }) path: string, @Ctx() context: Context) {
    deleteFile(path)

    return 'ok'
  }
}
