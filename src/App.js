import React, { Suspense } from 'react'
import 'react-quill/dist/quill.snow.css'
// ** Router Import
import Router from './router/Router'

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
