import { Directory, File } from '@md/common'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { FileLoader } from '../data/loaders'
import { isAuth } from '../middleware/isAuth'
import { createDirectory, resourcesSizes } from '../utils/file-functions'

@Resolver(() => Directory)
export class DirectoryResolver {
  @FieldResolver(() => String)
  name(@Root() dir: Directory) {
    return dir.path.split('/').pop()
  }

  @FieldResolver(() => [File])
  files(@Root() dir: Directory) {
    return FileLoader.contents(dir.path, { includeFiles: true })
  }

  @FieldResolver(() => [Directory])
  subdirectories(@Root() dir: Directory) {
    return FileLoader.contents(dir.path, { includeDirs: true })
  }

  @Query(() => Directory)
  @UseMiddleware(isAuth)
  dir(@Arg('path', { nullable: false }) path: string) {
    // get the directory info at that path and pass it to dir
    return FileLoader.openDir(path)
  }

  @Mutation(() => Directory)
  @UseMiddleware(isAuth)
  createDirectory(@Arg('name') name: string, @Arg('path') path: string) {
    const fullPath = path + name

    resourcesSizes.forEach(async (size) => {
      await createDirectory(size.dirname + '/' + fullPath)
    })

    return {
      path: fullPath,
      name: name,
    }
  }
}
