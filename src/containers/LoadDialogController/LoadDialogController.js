import React, { useState, useContext } from 'react'

import { FileContext } from '../../context/file-context'
import { ViewportContext } from '../../context/viewport-context'
import { CounterContext } from '../../context/counter-context'

function LoadDialogController({ children }) {
  const [showDialog, setShowDialog] = useState(true)
  const { isFileLoaded, setData: setFileData } = useContext(FileContext)
  const { resetScale } = useContext(ViewportContext)
  const { resetCounter } = useContext(CounterContext)

  const onLoad = data => {
    setShowDialog(false)
    setFileData(data)
    resetScale()
    resetCounter()
  }

  return children({
    showDialog,
    openDialog: () => setShowDialog(true),
    closeDialog: () => setShowDialog(false),
    onLoad,
    isAtReload: () => isFileLoaded() && showDialog
  })
}

export default LoadDialogController
