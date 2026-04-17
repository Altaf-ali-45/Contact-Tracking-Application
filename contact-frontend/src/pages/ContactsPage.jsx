import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { clearToken } from '../auth'

function ContactsPage() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadContacts = async () => {
    setError('')
    setLoading(true)
    try {
      const response = await api.get('/contacts')
      setContacts(response?.data?.content || [])
    } catch (requestError) {
      if (requestError?.response?.status === 401 || requestError?.response?.status === 403) {
        clearToken()
        navigate('/login', { replace: true })
        return
      }
      setError('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const onLogout = () => {
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">My Contacts</h1>
          <button className="rounded border border-slate-300 px-3 py-2 text-sm" onClick={onLogout}>
            Logout
          </button>
        </header>

        {loading ? <p className="mt-6 text-slate-600">Loading contacts...</p> : null}
        {error ? <p className="mt-6 text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Title</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-slate-500" colSpan={4}>
                      No contacts yet
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="border-t border-slate-200">
                      <td className="px-4 py-3">{contact.name}</td>
                      <td className="px-4 py-3">{contact.email}</td>
                      <td className="px-4 py-3">{contact.phone}</td>
                      <td className="px-4 py-3">{contact.title}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </main>
  )
}

export default ContactsPage
