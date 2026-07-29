import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageSpinner } from './components/ui/LoadingSpinner'
import { useTheme } from './hooks/useTheme'

// Lazy load all pages for code splitting
const Home              = lazy(() => import('./pages/Home'))
const About             = lazy(() => import('./pages/About'))
const ResearchPaper     = lazy(() => import('./pages/ResearchPaper'))
const Documentation     = lazy(() => import('./pages/Documentation'))
const DatasetLibrary    = lazy(() => import('./pages/DatasetLibrary'))
const DataVisualization = lazy(() => import('./pages/DataVisualization'))
const MLModels          = lazy(() => import('./pages/MLModels'))
const RLModels          = lazy(() => import('./pages/RLModels'))
const TrainingDashboard = lazy(() => import('./pages/TrainingDashboard'))
const Results           = lazy(() => import('./pages/Results'))
const Experiments       = lazy(() => import('./pages/Experiments'))
const APIDocs           = lazy(() => import('./pages/APIDocs'))
const Blog              = lazy(() => import('./pages/Blog'))
const Team              = lazy(() => import('./pages/Team'))
const Contact           = lazy(() => import('./pages/Contact'))

function ScrollToTop() {
  // Scroll to top on route change
  return null
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/about"           element={<About />} />
        <Route path="/research-paper"  element={<ResearchPaper />} />
        <Route path="/documentation"   element={<Documentation />} />
        <Route path="/datasets"        element={<DatasetLibrary />} />
        <Route path="/visualization"   element={<DataVisualization />} />
        <Route path="/ml-models"       element={<MLModels />} />
        <Route path="/rl-models"       element={<RLModels />} />
        <Route path="/training"        element={<TrainingDashboard />} />
        <Route path="/results"         element={<Results />} />
        <Route path="/experiments"     element={<Experiments />} />
        <Route path="/api-docs"        element={<APIDocs />} />
        <Route path="/blog"            element={<Blog />} />
        <Route path="/team"            element={<Team />} />
        <Route path="/contact"         element={<Contact />} />
        {/* 404 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  // Initialize theme (prevents FOUC)
  useTheme()

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
