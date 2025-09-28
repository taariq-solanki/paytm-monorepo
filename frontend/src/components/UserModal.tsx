import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

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

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userData: UserFormData) => Promise<void>
  user?: User | null
  isViewMode?: boolean
}

const UserModal = ({ isOpen, onClose, onSubmit, user, isViewMode = false }: UserModalProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    isActive: true
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: {
          street: user.address.street || '',
          city: user.address.city || '',
          state: user.address.state || '',
          zipCode: user.address.zipCode || '',
          country: user.address.country || 'India'
        },
        isActive: user.isActive
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'India'
        },
        isActive: true
      })
    }
    setErrors({})
  }, [user])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isViewMode) return

    if (!validateForm()) return

    try {
      setLoading(true)
      await onSubmit(formData)
    } catch (error: any) {
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {isViewMode ? 'View User' : user ? 'Edit User' : 'Create User'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-300' : ''}`}
                  disabled={isViewMode}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'border-red-300' : ''}`}
                  disabled={isViewMode}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`input-field ${errors.phone ? 'border-red-300' : ''}`}
                disabled={isViewMode}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Address</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="input-field"
                  disabled={isViewMode}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className="input-field"
                    disabled={isViewMode}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="input-field"
                    disabled={isViewMode}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.address.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    className="input-field"
                    disabled={isViewMode}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.address.country}
                    onChange={(e) => handleAddressChange('country', e.target.value)}
                    className="input-field"
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            {!isViewMode && (
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded border-gray-300 text-paytm-600 shadow-sm focus:border-paytm-300 focus:ring focus:ring-paytm-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active user</span>
                </label>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                {isViewMode ? 'Close' : 'Cancel'}
              </button>
              {!isViewMode && (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserModal
