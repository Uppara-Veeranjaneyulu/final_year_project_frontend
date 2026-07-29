import Navbar from './Navbar'
import Footer from './Footer'

/**
 * PageLayout wraps all pages with the shared Navbar + Footer.
 * Pass `noPad` for pages that control their own top padding.
 */
export default function PageLayout({ children, noPad = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-surface-950">
      <Navbar />
      <main className={`flex-1 ${noPad ? '' : 'pt-14'}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
