import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineSearch, HiOutlineDatabase, HiOutlineDownload } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import Tabs from '../components/ui/Tabs'
import { DATASETS } from '../utils/paperData'
import { getDatasetColor } from '../utils/formatters'

const CATEGORIES = ['All', 'Cloud', 'HPC', 'Scientific']

const BADGE_MAP = {
  cloud: 'blue',
  hpc: 'green',
  scientific: 'purple',
}

function DatasetCard({ ds, selected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      <Card
        hover
        className={`cursor-pointer transition-all ${
          selected
            ? 'border-primary-400 dark:border-primary-600 ring-2 ring-primary-200 dark:ring-primary-900'
            : ''
        }`}
        onClick={() => onSelect(ds.id)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={BADGE_MAP[ds.badge] || 'gray'}>{ds.category}</Badge>
              <Badge variant="gray">{ds.type}</Badge>
              {selected && <Badge variant="blue" dot>Selected</Badge>}
            </div>
            <h3 className="font-semibold text-surface-900 dark:text-white text-sm leading-snug">
              {ds.name}
            </h3>
            <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{ds.source}</p>
          </div>
          <HiOutlineDatabase className="text-surface-300 dark:text-surface-600 flex-shrink-0 mt-1" />
        </div>

        <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed mb-4 line-clamp-3">
          {ds.description}
        </p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Size', value: ds.size },
            { label: 'Frequency', value: ds.frequency },
            { label: 'Target Variable', value: ds.targetVariable },
            { label: 'Used In', value: ds.usedIn },
          ].map((m) => (
            <div key={m.label} className="p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
              <p className="text-xs text-surface-400 dark:text-surface-500">{m.label}</p>
              <p className="text-xs font-medium text-surface-700 dark:text-surface-300 mt-0.5 truncate">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs text-surface-400 mb-1.5">Features</p>
          <div className="flex flex-wrap gap-1">
            {ds.features.map((f) => (
              <span key={f} className="code-tag text-xs">{f}</span>
            ))}
          </div>
        </div>

        {/* Available metrics */}
        <div className="flex items-center gap-3 text-xs">
          {Object.entries(ds.metrics).map(([k, v]) => (
            <span key={k} className={v ? 'text-emerald-600 dark:text-emerald-400' : 'text-surface-300 dark:text-surface-600'}>
              {v ? '✓' : '✗'} {k}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-100 dark:border-surface-800">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(ds.id) }}
            className={`btn-sm flex-1 justify-center ${selected ? 'btn-primary' : 'btn-outline'}`}
          >
            {selected ? '✓ Selected for Training' : 'Select for Training'}
          </button>
          <button className="btn-sm btn-ghost p-2">
            <HiOutlineDownload />
          </button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function DatasetLibrary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = DATASETS.filter((ds) => {
    const matchCat = category === 'All' || ds.category === category
    const matchSearch = ds.name.toLowerCase().includes(search.toLowerCase()) ||
                        ds.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <SectionHeader
              label="Dataset Library"
              title="Workload Datasets"
              subtitle="7 real-world cloud, HPC, and scientific workload datasets evaluated in the paper. Select a dataset to use in the Training Dashboard."
            />

            {/* Search + filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <div className="relative flex-1 max-w-sm">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search datasets..."
                  className="input pl-9"
                />
              </div>
              <div className="flex gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`btn-sm ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected dataset info */}
          {selected && (() => {
            const ds = DATASETS.find((d) => d.id === selected)
            return (
              <div className="mb-6 p-4 rounded-xl border border-primary-200 dark:border-primary-800/50 bg-primary-50 dark:bg-primary-900/10 flex items-center gap-3">
                <span className="text-primary-600 dark:text-primary-400 text-lg">✓</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                    {ds?.name} selected for training
                  </p>
                  <p className="text-xs text-primary-600 dark:text-primary-400">
                    Go to Training Dashboard to configure and train a model with this dataset.
                  </p>
                </div>
                <a href="/training" className="btn-primary btn-sm">Train →</a>
              </div>
            )
          })()}

          {/* Count */}
          <p className="text-sm text-surface-400 mb-4">
            Showing {filtered.length} of {DATASETS.length} datasets
          </p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((ds) => (
              <DatasetCard
                key={ds.id}
                ds={ds}
                selected={selected === ds.id}
                onSelect={(id) => setSelected(selected === id ? null : id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-surface-400">
              <HiOutlineDatabase className="text-4xl mx-auto mb-3 opacity-40" />
              <p>No datasets match your search.</p>
            </div>
          )}

          {/* Dataset stats overview */}
          <div className="mt-14">
            <SectionHeader
              label="Overview"
              title="Dataset Categories"
              subtitle="Distribution of the 7 datasets across Cloud, HPC, and Scientific categories."
            />
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { cat: 'Cloud', count: 3, desc: 'Google Cluster (v1, v2.1), Bitbrains GWA-T-12', color: 'blue', icon: '☁️' },
                { cat: 'HPC',   count: 2, desc: 'Parallel Workloads Archive, HPC2N',            color: 'green', icon: '🖥️' },
                { cat: 'Scientific', count: 2, desc: 'Spitzer Space Telescope, XMM-Newton',      color: 'purple', icon: '🔭' },
              ].map((cat) => (
                <Card key={cat.cat} hover className="flex gap-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-surface-900 dark:text-white">{cat.cat}</p>
                      <Badge variant={cat.color}>{cat.count} datasets</Badge>
                    </div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{cat.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
