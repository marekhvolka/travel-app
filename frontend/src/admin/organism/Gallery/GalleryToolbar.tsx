import React, { useState } from 'react'
import { Button } from '../../../common/atoms/Button/Button'
import { UploadForm } from '../UploadForm/UploadForm'
import { CreateDirectory } from './CreateDirectory'

export const GalleryToolbar = ({ path, onGoBack, onRefresh }) => {
  const [showUpload, setShowUpload] = useState(false)
  const [showCreateDirectory, setShowCreateDirectory] = useState(false)

  return (
    <div>
      <h2>
        Path: /{path.join('/')} {path.length > 0 && (<Button onClick={onGoBack}>Back</Button>)}
        <Button onClick={() => setShowUpload(true)}>Upload</Button>
        <Button onClick={() => setShowCreateDirectory(true)}>Create directory</Button>
      </h2>
      {showUpload && (
        <UploadForm
          path={path}
          onClose={() => {
            setShowUpload(false)
            onRefresh()
          }}
        />
      )}

      {showCreateDirectory && (
        <CreateDirectory
          path={path}
          onSuccess={() => {
            setShowCreateDirectory(false)
            onRefresh()
          }}
          onClose={() => setShowCreateDirectory(false)}
        />
      )}
    </div>
  )
}
