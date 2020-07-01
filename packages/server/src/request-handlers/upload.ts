import { RequestHandler } from 'express'
import { Form } from 'multiparty'
import { saveFile } from '../utils/file-functions'

export const uploadFileRequestHandler: RequestHandler = (req, res) => {
  const form = new Form()
  form.parse(req, async (err, fields, files) => {
    const targetFileName = fields['filename'][0]
    const targetPath = fields['path'][0]
    const crop = JSON.parse(fields['crop'][0])
    const file = files.file[0]

    await saveFile(file.path, targetPath, targetFileName, crop)

    res.json({ status: 'ok' })
  })
}
