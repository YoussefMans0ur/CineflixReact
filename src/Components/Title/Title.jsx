import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'

export default function Title({title}) {
  return (
    <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
    </HelmetProvider>
  )
}
