import { CreditCard, Users, TrendingUp, Shield } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Digital Payments',
      description: 'Secure and fast digital payment solutions for all your needs.'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive user management system with full CRUD operations.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      description: 'Real-time analytics and insights for better decision making.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Bank-grade security with encryption and fraud protection.'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to{' '}
          <span className="text-paytm-600">Paytm Demo</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Experience the power of modern digital payments with our comprehensive demo application.
          Built with React, Node.js, and MongoDB.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="/users"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-paytm-600 hover:bg-paytm-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              Explore Users
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-paytm-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to get started
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our demo application showcases modern web development practices with a full-stack implementation.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-paytm-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-paytm-50 rounded-lg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-paytm-600 font-semibold tracking-wide uppercase">
              Demo Statistics
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Built for scale
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-paytm-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Users
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Unlimited
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-6 w-6 text-paytm-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Transactions
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Real-time
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-paytm-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Uptime
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          99.9%
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-paytm-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Security
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Bank-grade
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
