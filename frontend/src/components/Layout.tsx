import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Wallet } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/users', label: 'Users', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Wallet className="h-8 w-8 text-paytm-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Paytm Demo
                </span>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-paytm-600 bg-paytm-50'
                        : 'text-gray-600 hover:text-paytm-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-paytm-600 bg-white shadow-sm'
                      : 'text-gray-600 hover:text-paytm-600 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
