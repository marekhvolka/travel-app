import {Arg, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {File} from "../models/File";
import {FileLoader} from "../data/loaders";

@Resolver(() => File)
export class FileResolver {

  @FieldResolver(() => String)
  content(@Root() file: File) {
    return file.read()
  }

  @FieldResolver(() => Number)
  size(@Root() file: File) {
    return file.stats().then(stats => stats.size)
  }

  @Query(() => File)
  file(@Arg("path", { nullable: false}) path: string) {
    return FileLoader.openFile(path)
    // get file info and pass it to file
  }
}
