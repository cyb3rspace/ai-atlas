import './globals.css'

export const metadata = {
  title: 'The AI Atlas — Evidence for the AI Age',
  description: 'Peer-reviewed studies, investigative journalism, and expert analysis on AI impact across every sector. Benefits and risks, made readable.',
  openGraph: {
    title: 'The AI Atlas',
    description: 'Evidence for the AI age. The studies, the reporting, the data — across every sector.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI Atlas',
    description: 'Evidence for the AI age. The studies, the reporting, the data — across every sector.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
