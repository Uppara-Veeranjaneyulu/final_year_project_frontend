import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMail, HiOutlineUsers, HiOutlineArrowRight, HiOutlineCheckCircle } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'

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
                  <HiOutlineCheckCircle className="text-5xl text-emerald-500 mx-auto mb-3" />
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
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">Research & Team Inquiries</h3>

              <Card className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
                    <HiOutlineMail className="text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-surface-900 dark:text-white text-sm">General Support</p>
                    <p className="text-xs text-surface-400">Questions & Inquiries</p>
                  </div>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed mb-3">
                  Have questions about the CloudRL research platform or models? Send us a message using the form.
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <HiOutlineUsers className="text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-surface-900 dark:text-white text-sm">Team Information</p>
                    <p className="text-xs text-surface-400">Researchers & Contributors</p>
                  </div>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed mb-4">
                  All details regarding the researchers, project guide, and contributors are available on the Team page.
                </p>
                <Link to="/team" className="btn-outline btn-sm gap-1 w-full justify-center">
                  View Team Details <HiOutlineArrowRight />
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
