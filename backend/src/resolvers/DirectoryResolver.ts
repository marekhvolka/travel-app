import {Arg, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Directory} from "../models/Directory";
import {File} from "../models/File";
import {FileLoader} from "../data/loaders";

@Resolver(() => Directory)
export class DirectoryResolver {

  @FieldResolver(() => String)
  name(@Root() dir: Directory) {
    return dir.path.split('/').pop();
  }

  @FieldResolver(() => [File])
  files(@Root() dir: Directory) {
    return FileLoader.contents({path: dir.path, includeFiles: true})
  }

  @FieldResolver(() => [Directory])
  subdirectories(@Root() dir: Directory) {
    return FileLoader.contents({path: dir.path, includeDirs: true})
  }

  @Query(() => Directory)
  dir(@Arg("path", {nullable: false}) path: string) {
    // get the directory info at that path and pass it to dir
    return FileLoader.openDir(path)
  }
}
