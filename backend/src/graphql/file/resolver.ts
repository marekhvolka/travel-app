import { FileLoader } from '../../data/loaders'
import { createDirectory, resourcesSizes } from '../../utils/file-functions'

export const resolver = {
  Directory: {
    files(dir) {
      return dir.files()
    },

    subdirectories(dir) {
      return dir.subdirectories()
    }
  },
  File: {
    content(file) {
      return file.read()
    },

    size(file) {
      return file.stats()
        .then(stats => stats.size)
    },
  },
  Query: {
    file(obj, { path }) {
      return FileLoader.openFile(path)
      // get file info and pass it to file
    },
    dir(obj, { path }) {
      // get the directory info at that path and pass it to dir
      return FileLoader.openDir(path)
    },
  },

  Mutation: {
    createDirectory(_, { name, path }) {
      const fullPath = path + name

      resourcesSizes.forEach(size => {
        createDirectory(size.dirname + '/' + fullPath)
      })

      return {
        path: fullPath,
        name: name,
      }
    }
  },
}
