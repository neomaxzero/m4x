import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import '../style.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'm4x' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html>
      <head>
        <HeadContent />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LDF17VT6YS" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LDF17VT6YS');
            `,
          }}
        />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
