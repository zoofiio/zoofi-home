import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import '@fontsource/zalando-sans-expanded/400.css';
import '@fontsource/zalando-sans-expanded/500.css';
import '@fontsource/zalando-sans-expanded/600.css';
import '@fontsource/zalando-sans-expanded/700.css';
import '@fontsource/parkinsans/400.css';
import '@fontsource/parkinsans/500.css';
import '@fontsource/parkinsans/600.css';
import '@fontsource/dseg7-classic-mini/700.css';
import '@fontsource/dm-mono/500-italic.css';
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP)
gsap.registerPlugin(DrawSVGPlugin)
// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
