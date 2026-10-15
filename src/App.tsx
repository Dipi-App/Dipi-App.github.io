import { Developer } from './components/Developer'
import { Download } from './components/Download'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { InstallGuide } from './components/InstallGuide'
import { OpenSource } from './components/OpenSource'
import { Screenshots } from './components/Screenshots'
import { fa } from './content/fa'
import { useLatestRelease } from './lib/release'

export default function App() {
  // One request for the whole page; both Hero and Download read from it.
  const release = useLatestRelease()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:end-3 focus:z-50 focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
      >
        {fa.skipToContent}
      </a>
      <Header />
      <main id="main">
        <Hero release={release} />
        <Features />
        <Screenshots />
        <Download release={release} />
        <InstallGuide release={release} />
        <OpenSource />
        <Developer />
      </main>
      <Footer />
    </>
  )
}
