import fs from 'fs-extra'
import path from 'path'
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import { FileLoader } from '../data/loaders'
import { File } from '../models/File'
import { FileStats } from '../models/FileStats'

@Resolver(() => File)
export class FileResolver {
  @FieldResolver(() => String)
  name(@Root() file: File) {
    return path.basename(file.path)
  }

  @FieldResolver(() => String)
  async content(@Root() file: File) {
    const fileHandler = await fs.open(file.path, 'r+')
    return fs.readFile(fileHandler)
  }

  @FieldResolver(() => FileStats)
  async stats(@Root() file: File) {
    const fileHandler = await fs.open(file.path, 'r+')
    return fs.fstat(fileHandler).catch(err => {
      console.error('error getting file stats')
      console.error(err)
      return null
    })
  }

  @Query(() => File)
  file(@Arg('path', { nullable: false }) path: string) {
    return FileLoader.openFile(path)
    // get file info and pass it to file
  }
}
