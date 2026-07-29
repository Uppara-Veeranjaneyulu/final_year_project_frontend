import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { BLOG_POSTS } from '../utils/paperData'

const TAG_COLORS = {
  Planning: 'gray',
  Dataset: 'blue',
  Preprocessing: 'purple',
  Experiments: 'yellow',
  Milestone: 'green',
  Development: 'blue',
  Results: 'green',
  Architecture: 'purple',
  Writing: 'gray',
  Future: 'yellow',
}

export default function Blog() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            label="Research Journal"
            title="Project Blog"
            subtitle="A week-by-week account of the research and development journey — from problem identification to paper submission."
          />

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-surface-200 dark:bg-surface-800 hidden sm:block" />

            <div className="space-y-6">
              {BLOG_POSTS.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative sm:pl-14"
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-primary-500 border-2 border-white dark:border-surface-950 shadow hidden sm:block" />

                  <Card hover>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant={TAG_COLORS[post.tag] || 'gray'}>{post.tag}</Badge>
                          <span className="text-xs text-surface-400">{post.week}</span>
                        </div>
                        <h3 className="font-semibold text-surface-900 dark:text-white leading-snug">{post.title}</h3>
                        <p className="text-xs text-surface-400 mt-0.5">{post.date}</p>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm font-medium text-surface-700 dark:text-surface-300 leading-relaxed mb-3">
                      {post.summary}
                    </p>

                    {/* Content */}
                    <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                      {post.content}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
              Read the full technical documentation for implementation details.
            </p>
            <Link to="/documentation" className="btn-primary gap-2">
              View Documentation <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
