import type { Metadata } from 'next'
import 'src/sections/home/home.css'
import 'src/sections/premieres/premieres.css'
import 'src/sections/search/search.css'
import 'src/sections/view/view.css'
import 'src/components/show/show.css'
import 'src/assets/css/animations.css'
import 'src/assets/css/font-icons.css'
import 'src/assets/css/style.css'

export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}