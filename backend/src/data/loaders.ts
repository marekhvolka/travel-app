import fs from 'fs-extra'
import path from 'path'

class FileLoader {
  static baseDir = __dirname + '/../../resources/large'

  static makeFullPath(partialPath) {
    return path.join(FileLoader.baseDir, partialPath)
  }

  static async openFile(filePath) {
    const fullPath = FileLoader.makeFullPath(filePath)

    try {
      const file = await fs.open(fullPath, 'r+')
      return new File(file, path.basename(fullPath), filePath)
    } catch (err) {
      console.error('cannot open file', fullPath)
      return err
    }
  }

  static async openDir(dirPath) {
    const fullPath = FileLoader.makeFullPath(dirPath)

    try {
      const stats = await fs.stat(fullPath)

      if (!stats.isDirectory()) {
        console.error(`${fullPath} is not a directory`)
        return null
      }

      return new Directory(dirPath)
    } catch (err) {
      console.error('could not find directory', fullPath)
      return null
    }
  }
}

class Directory {
  constructor(dirPath) {
    this.path = dirPath

    // figure out the name
    const pathFragments = dirPath.split('/')
      .filter(x => x) //nix only

    this.name = pathFragments[pathFragments.length - 1]
  }

  async contents({ includeFiles = true, includeDirs = true }) {
    const dirFullPath = FileLoader.makeFullPath(this.path)

    try {
      const files = await fs.readdir(dirFullPath)
      const promises = files.map(async fileName => {
        const fullPath = this.path + '/' + fileName

        const res = await fs.stat(FileLoader.makeFullPath(fullPath))

        if (includeFiles && res.isFile()) {
          return FileLoader.openFile(fullPath)
        }

        if (includeDirs && res.isDirectory()) {
          return FileLoader.openDir(fullPath)
        }
      })

      const values = await Promise.all(promises)

      return values.filter(v => v !== undefined)

    } catch (err) {
      console.error(err)
      console.error('cannot list dir contents')
    }
  }

  files() {
    return this.contents({ includeDirs: false })
  }

  subdirectories() {
    return this.contents({ includeFiles: false })
  }
}

class File {
  constructor(fd, name, fullPath) {
    this.fd = fd
    this.name = name
    this.path = fullPath
  }

  read() {
    return fs.readFile(this.fd)
  }

  stats() {
    return fs.fstat(this.fd)
      .catch(err => {
        console.error('error getting file stats')
        return null
      })
  }
}

export { FileLoader, File }
