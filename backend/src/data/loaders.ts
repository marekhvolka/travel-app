import fs from 'fs-extra'
import path from 'path'
import { Directory } from '../models/Directory'
import { File } from '../models/File'

export class FileLoader {
  static baseDir = __dirname + '/../../resources/large'

  static makeFullPath(partialPath: string) {
    return path.join(FileLoader.baseDir, partialPath)
  }

  static async openFile(filePath: string) {
    try {
      const file = new File()
      file.path = filePath
      return file
    } catch (err) {
      console.error('cannot open file', filePath)
      return err
    }
  }

  static async openDir(dirPath: string) {
    const fullPath = FileLoader.makeFullPath(dirPath)

    try {
      const stats = await fs.stat(fullPath)

      if (!stats.isDirectory()) {
        console.error(`${fullPath} is not a directory`)
        return null
      }

      const dir = new Directory()
      dir.path = dirPath

      return dir
    } catch (err) {
      console.error('could not find directory', fullPath)
      return null
    }
  }

  static async contents(path: string, { includeFiles = false, includeDirs = false }) {
    const dirFullPath = FileLoader.makeFullPath(path)

    try {
      const files = await fs.readdir(dirFullPath)
      const promises = files.map(async (fileName: string) => {
        const fullPath = path + '/' + fileName

        const res = await fs.stat(FileLoader.makeFullPath(fullPath))

        if (includeFiles && res.isFile() && fileName !== '.DS_Store') {
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
}
