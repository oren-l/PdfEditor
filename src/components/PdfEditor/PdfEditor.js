import React from 'react'

import ViewportStateProvider from '../../context/viewport-context'
import CounterProvider from '../../context/counter-context'
import ToolbarController from '../../containers/ToobarController/ToobarController'
import Toolbar from '../Toolbar/Toolbar'
import LoadDialogController from '../../containers/LoadDialogController/LoadDialogController'
import PdfLoader from '../PdfLoader/PdfLoader'
import PdfViewport from '../PdfRenderer/PdfViewport'
import PdfViewportController from '../../containers/PdfViewportController/PdfViewportController'
import EscKeyHandler from '../EscKeyHandler/EscKeyHandler'
import ModificationProvider from '../../context/modification-context'

import styles from './PdfEditor.module.css'

function PdfEditor() {
  console.log('[PdfEditor] render')

  return (
    <div className={styles.screenViewport}>
      <ViewportStateProvider>
        <CounterProvider>
          <ModificationProvider>
            <div className={styles.editorArea}>
              <LoadDialogController>
                {loadDialogCtrl => (
                  <React.Fragment>
                    {loadDialogCtrl.isAtReload() ? (
                      <EscKeyHandler onClick={loadDialogCtrl.closeDialog} />
                    ) : null}

                    <ToolbarController>
                      {toolbarCtrl => (
                        <Toolbar
                          onLoad={loadDialogCtrl.openDialog}
                          {...toolbarCtrl}
                        />
                      )}
                    </ToolbarController>
                    <div className={styles.pdfViewportArea}>
                      {loadDialogCtrl.showDialog ? (
                        <PdfLoader onLoad={loadDialogCtrl.onLoad} />
                      ) : null}

                      <PdfViewportController>
                        {viewportCtrl => <PdfViewport {...viewportCtrl} />}
                      </PdfViewportController>
                    </div>
                  </React.Fragment>
                )}
              </LoadDialogController>
            </div>
          </ModificationProvider>
        </CounterProvider>
      </ViewportStateProvider>
    </div>
  )
}

export default PdfEditor
