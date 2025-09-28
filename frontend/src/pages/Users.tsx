import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, UserCheck, UserX } from 'lucide-react'
import { api } from '../services/api'
import UserModal from '../components/UserModal'
import LoadingSpinner from '../components/LoadingSpinner'

interface User {
  _id: string
  name: string
  email: string
  phone: string
  address: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface UserFormData {
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  isActive: boolean
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [viewingUser, setViewingUser] = useState<User | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/users')
      setUsers(response.data.data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async (userData: UserFormData) => {
    try {
      await api.post('/users', userData)
      await fetchUsers()
      setIsModalOpen(false)
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create user')
    }
  }

  const handleUpdateUser = async (userData: UserFormData) => {
    if (!editingUser) return
    
    try {
      await api.put(`/users/${editingUser._id}`, userData)
      await fetchUsers()
      setEditingUser(null)
      setIsModalOpen(false)
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update user')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    
    try {
      await api.delete(`/users/${userId}`)
      await fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete user')
    }
  }

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const endpoint = isActive ? 'deactivate' : 'activate'
      await api.patch(`/users/${userId}/${endpoint}`)
      await fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update user status')
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  )

  const openCreateModal = () => {
    setEditingUser(null)
    setViewingUser(null)
    setIsModalOpen(true)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setViewingUser(null)
    setIsModalOpen(true)
  }

  const openViewModal = (user: User) => {
    setViewingUser(user)
    setEditingUser(null)
    setIsModalOpen(true)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your users and their information
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={openCreateModal}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new user.'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <li key={user._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        user.isActive ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <span className={`text-sm font-medium ${
                          user.isActive ? 'text-green-800' : 'text-gray-800'
                        }`}>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openViewModal(user)}
                      className="text-gray-400 hover:text-gray-600"
                      title="View user"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-gray-400 hover:text-blue-600"
                      title="Edit user"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                      className={`${
                        user.isActive 
                          ? 'text-gray-400 hover:text-orange-600' 
                          : 'text-gray-400 hover:text-green-600'
                      }`}
                      title={user.isActive ? 'Deactivate user' : 'Activate user'}
                    >
                      {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-gray-400 hover:text-red-600"
                      title="Delete user"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingUser(null)
          setViewingUser(null)
        }}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        user={editingUser || viewingUser}
        isViewMode={!!viewingUser}
      />
    </div>
  )
}

export default Users
