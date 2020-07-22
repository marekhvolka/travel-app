import shell from 'shelljs'
import sharp from 'sharp'
import fs from 'fs-extra'

export const resourcesSizes = [
  {
    dirname: 'thumbnail',
    width: 150,
    height: 100,
  },
  {
    dirname: 'small',
    width: 450,
    height: 300,
  },
  {
    dirname: 'medium',
    width: 900,
    height: 600,
  },
  {
    dirname: 'large',
    width: 1200,
    height: 800,
  },
]

const relativePath = __dirname + `/../../resources/`

export const saveFile = async (sourcePath: string, targetPath: string, targetFileName: string, cropData: any) => {
  const info = await sharp(sourcePath).metadata()

  const cropped = sharp(sourcePath).extract({
    left: calculateSize(info.width!, cropData.x),
    top: calculateSize(info.height!, cropData.y),
    width: calculateSize(info.width!, cropData.width),
    height: calculateSize(info.height!, cropData.height),
  })

  resourcesSizes.forEach(resourceSize => {
    const outputDir = `${resourceSize.dirname}/${targetPath}/`

    if (!directoryExists(outputDir)) {
      createDirectory(outputDir)
    }

    cropped.resize(resourceSize.width, resourceSize.height).toFile(relativePath + outputDir + targetFileName)
  })
}

export const deleteFile = (path: string) => {
  resourcesSizes.forEach((resourceSize) => {
    fs.removeSync(`${relativePath}/${resourceSize}/${path}`)
  })
}

export const directoryExists = (path: string): boolean => {
  return fs.existsSync(relativePath + path)
}

export const createDirectory = (path: string) => {
  console.log(relativePath + path)
  return shell.mkdir('-p', relativePath + path)
}

const calculateSize = (fullSize: number, percentage: number): number => {
  return Math.floor((fullSize * percentage) / 100.0)
}
