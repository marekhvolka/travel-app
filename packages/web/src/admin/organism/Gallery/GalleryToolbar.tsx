import React, { useState } from 'react'
import { Button } from '../../../common/atoms/Button/Button'
import { UploadForm } from '../UploadForm/UploadForm'
import { CreateDirectory } from './CreateDirectory'

export const GalleryToolbar = ({ path, onGoBack, onRefresh }) => {
  const [showUpload, setShowUpload] = useState(false)
  const [showCreateDirectory, setShowCreateDirectory] = useState(false)

  return (
    <div>
      <div>
        <h2 style={{ display: 'inline-block' }}>Path: /{path.join('/')}</h2>
        {path.length > 0 && (
          <Button onClick={onGoBack}>Back</Button>
        )}
        <Button onClick={() => setShowUpload(true)}>Upload</Button>
        <Button onClick={() => setShowCreateDirectory(true)}>Create directory</Button>
      </div>
      {showUpload && (
        <UploadForm
          path={path.join('/')}
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
