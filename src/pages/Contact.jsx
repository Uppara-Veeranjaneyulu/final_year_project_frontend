import { useState } from 'react'
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineAcademicCap } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import { TEAM } from '../utils/paperData'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate send
    setTimeout(() => setSent(true), 800)
  }

  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Contact"
            title="Get in Touch"
            subtitle="For questions about the research, collaboration inquiries, or feedback on the platform."
            center
          />

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact form */}
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Send a Message</h3>
              {sent ? (
                <Card className="text-center py-10">
                  <span className="text-4xl mb-3 block">✅</span>
                  <p className="font-semibold text-surface-900 dark:text-white">Message Sent!</p>
                  <p className="text-sm text-surface-500 mt-2">We'll get back to you soon.</p>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-surface-500 font-medium block mb-1">Name</label>
                    <input
                      className="input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-surface-500 font-medium block mb-1">Email</label>
                    <input
                      className="input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-surface-500 font-medium block mb-1">Subject</label>
                    <input
                      className="input"
                      placeholder="Research inquiry / Collaboration / Other"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-surface-500 font-medium block mb-1">Message</label>
                    <textarea
                      className="input min-h-32 resize-none"
                      placeholder="Your message..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Project Contacts</h3>

              {/* Guide */}
              <Card className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                    VS
                  </div>
                  <div>
                    <p className="font-medium text-surface-900 dark:text-white text-sm">Dr. Vandhana S</p>
                    <p className="text-xs text-surface-400">Project Guide</p>
                  </div>
                </div>
                <a href="mailto:s_vandhana@cb.amrita.edu" className="flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400 hover:underline">
                  <HiOutlineMail />
                  s_vandhana@cb.amrita.edu
                </a>
              </Card>

              {/* Students */}
              <div className="space-y-2 mb-6">
                {TEAM.filter((m) => !m.isGuide).map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl border border-surface-100 dark:border-surface-800">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {m.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-900 dark:text-white">{m.name}</p>
                        <p className="text-xs text-surface-400">{m.regId}</p>
                      </div>
                    </div>
                    <a href={`mailto:${m.email}`} className="text-surface-400 hover:text-primary-600 transition-colors">
                      <HiOutlineMail />
                    </a>
                  </div>
                ))}
              </div>

              {/* University */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <HiOutlineLocationMarker className="text-surface-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">Amrita Vishwa Vidyapeetham</p>
                    <p className="text-xs text-surface-500">Coimbatore, Tamil Nadu, India</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <HiOutlineAcademicCap className="text-surface-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">Amrita School of Computing</p>
                    <p className="text-xs text-surface-500">Department of Computer Science & Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
