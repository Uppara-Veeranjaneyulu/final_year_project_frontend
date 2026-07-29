import { motion } from 'framer-motion'
import { HiOutlineCheckCircle, HiOutlineLightBulb, HiOutlineArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { CONTRIBUTIONS, PAPER } from '../utils/paperData'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const SECTIONS = [
  {
    id: 'problem',
    badge: 'Problem Statement',
    badgeColor: 'red',
    title: 'The Core Challenge',
    icon: '⚠️',
    content: `Dynamic cloud computing environments experience significant variations in workload intensity, task characteristics, and resource demand. Traditional task scheduling and load balancing techniques such as Round Robin and Least Connections are primarily reactive and often fail to adapt effectively to sudden workload fluctuations and heterogeneous resource requirements.

Sudden increases in task arrival rates may result in overloaded servers, increased response time, resource contention, request drops, and violations of Service-Level Agreements (SLAs). Conversely, over-provisioning resources during periods of low workload results in inefficient resource utilization and increased operational cost.`,
  },
  {
    id: 'motivation',
    badge: 'Motivation',
    badgeColor: 'yellow',
    title: 'Why This Research?',
    icon: '💡',
    content: `Machine learning-based workload forecasting provides an opportunity to anticipate future resource demand before overload occurs. Reinforcement Learning (RL) provides a complementary mechanism in which an intelligent agent learns resource allocation decisions through interaction with the computing environment. Instead of relying on fixed scheduling rules, the agent observes system conditions, selects resource allocation actions, and improves its scheduling policy based on performance feedback.

A single centralized RL agent has two structural limitations: (1) it does not scale gracefully as the number of servers grows, and (2) a fixed-weight reward function requires manual tuning and cannot automatically shift emphasis when the dominant failure mode changes. This motivates combining workload forecasting, an adaptive reward mechanism, and a multi-agent RL formulation.`,
  },
  {
    id: 'existing',
    badge: 'Existing System',
    badgeColor: 'gray',
    title: 'Existing Approaches & Limitations',
    icon: '🔄',
    items: [
      { name: 'Round Robin',                issue: 'Simple but ignores resource utilization and task requirements' },
      { name: 'First-Come-First-Serve',      issue: 'No priority, no resource awareness' },
      { name: 'Min-Min / Max-Min',           issue: 'Static — does not adapt to changing workloads' },
      { name: 'Least Connections',           issue: 'Better latency/load variance but lower throughput than PPO' },
      { name: 'Fixed-weight RL (single-agent)', issue: 'Does not scale; manually tuned reward coefficients stay constant' },
      { name: 'Deep Learning Forecasting',  issue: 'LSTM, GRU, etc. fail under temporal regime shift (R² down to −687)' },
    ],
  },
  {
    id: 'proposed',
    badge: 'Proposed System',
    badgeColor: 'blue',
    title: 'Our Approach',
    icon: '🚀',
    content: `The proposed framework combines three components:

1. SARIMAX Workload Forecasting: A rolling one-step-ahead forecasting strategy that updates using the latest observation, enabling faster adaptation to regime changes. Achieved RMSE 0.0708 and R² 0.270 — best among all 7 evaluated models.

2. Adaptive Dynamic Reward System (AdaptiveRewardManager): Automatically re-weights reward coefficients once per episode based on normalized violations of target service objectives (drop rate < 2%, latency < 50ms, etc.). Removes the need for manual reward tuning.

3. Multi-Agent Reinforcement Learning (MAPPO): Each server is modelled as an autonomous agent under a Dec-POMDP formulation. MAPPO with centralized training and decentralized execution (CTDE) keeps each agent's observation fixed at 19 features regardless of cluster size — solving the scalability limitation.`,
  },
  {
    id: 'objectives',
    badge: 'Objectives',
    badgeColor: 'green',
    title: 'Research Objectives',
    icon: '🎯',
    items: CONTRIBUTIONS.map((c, i) => ({ name: `Objective ${i + 1}`, issue: c, positive: true })),
  },
  {
    id: 'outcome',
    badge: 'Expected Outcome',
    badgeColor: 'purple',
    title: 'Expected Outcomes',
    icon: '✅',
    items: [
      { name: 'Higher throughput',      issue: 'PPO achieved 0.590 vs 0.463 for Round Robin', positive: true },
      { name: 'Lower drop rate',        issue: 'PPO achieved 41.00% (lowest among all schedulers)', positive: true },
      { name: 'Adaptive reward tuning', issue: 'AdaptiveRewardManager auto-shifts emphasis toward violated objectives', positive: true },
      { name: 'Scalable scheduling',    issue: 'MAPPO local observation (19 features) stays fixed as cluster grows', positive: true },
      { name: 'Robust forecasting',     issue: 'SARIMAX outperforms deep learning models under temporal regime shift', positive: true },
      { name: 'Better resource util.',  issue: 'Predictive allocation prevents both overload and over-provisioning', positive: true },
    ],
  },
]

export default function About() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-14 text-center">
            <Badge variant="blue" className="mb-4">About the Project</Badge>
            <h1 className="page-title mb-4">{PAPER.title}</h1>
            <p className="section-subtitle max-w-2xl mx-auto">{PAPER.subtitle}</p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-10">
            {SECTIONS.map((sec, si) => (
              <motion.section
                key={sec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: si * 0.05 }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{sec.icon}</span>
                  <div>
                    <Badge variant={sec.badgeColor} className="mb-1">{sec.badge}</Badge>
                    <h2 className="text-xl font-bold text-surface-900 dark:text-white">{sec.title}</h2>
                  </div>
                </div>

                {/* Content */}
                {sec.content && (
                  <Card className="prose-style">
                    {sec.content.split('\n\n').map((para, pi) => (
                      <p key={pi} className="text-surface-600 dark:text-surface-400 leading-7 mb-4 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </Card>
                )}

                {/* Items list */}
                {sec.items && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {sec.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="flex gap-3 p-4 rounded-xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900"
                      >
                        <HiOutlineCheckCircle
                          className={`text-lg flex-shrink-0 mt-0.5 ${
                            item.positive ? 'text-primary-500' : 'text-red-400'
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-surface-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 leading-relaxed">{item.issue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-wrap gap-3">
            <Link to="/research-paper" className="btn-primary gap-2">
              Read Full Paper <HiOutlineArrowRight />
            </Link>
            <Link to="/documentation" className="btn-outline gap-2">
              View Documentation <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
