import { motion } from 'framer-motion'
import { HiOutlineExternalLink, HiOutlineUser, HiOutlineMail } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { TEAM } from '../utils/paperData'

function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover className={`${member.isGuide ? 'border-primary-200 dark:border-primary-800/50' : ''} h-full`}>
        {/* Avatar */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
            {member.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {member.isGuide && <Badge variant="blue">Guide</Badge>}
            </div>
            <h3 className="font-semibold text-surface-900 dark:text-white leading-snug">{member.name}</h3>
            <p className="text-xs text-surface-500 dark:text-surface-400">{member.title}</p>
            {member.regId && (
              <p className="text-xs font-mono text-surface-400 dark:text-surface-500 mt-0.5">{member.regId}</p>
            )}
          </div>
        </div>

        {/* Department */}
        <div className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800/50 mb-4">
          <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
            {member.department}
          </p>
          <p className="text-xs text-surface-400 dark:text-surface-500">{member.university}</p>
        </div>

        {/* Contributions */}
        <div className="mb-4">
          <p className="text-xs text-surface-400 mb-2">Contributions</p>
          <div className="flex flex-wrap gap-1">
            {member.contributions.map((c) => (
              <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Email */}
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-2 text-xs text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <HiOutlineMail />
          <span className="truncate">{member.email}</span>
        </a>
      </Card>
    </motion.div>
  )
}

export default function Team() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Team"
            title="Project Team"
            subtitle="Final Year B.Tech Project — Department of Computer Science & Engineering, Amrita School of Computing, Amrita Vishwa Vidyapeetham, Coimbatore"
            center
          />

          {/* Guide first */}
          <div className="max-w-md mx-auto mb-8">
            {TEAM.filter((m) => m.isGuide).map((m) => (
              <TeamMemberCard key={m.id} member={m} index={0} />
            ))}
          </div>

          {/* Students */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM.filter((m) => !m.isGuide).map((m, i) => (
              <TeamMemberCard key={m.id} member={m} index={i + 1} />
            ))}
          </div>

          {/* University info */}
          <div className="mt-14 text-center">
            <Card className="inline-block text-left max-w-2xl w-full">
              <h3 className="font-semibold text-surface-900 dark:text-white mb-3">
                Institution
              </h3>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                <strong>Amrita School of Computing</strong><br />
                Department of Computer Science and Engineering<br />
                Amrita Vishwa Vidyapeetham<br />
                Coimbatore, Tamil Nadu, India
              </p>
              <div className="mt-4 flex gap-2">
                <a href="https://www.amrita.edu" target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm gap-1">
                  <HiOutlineExternalLink /> Amrita University
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
