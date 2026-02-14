export default function TrustedSection() {
  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-16">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Trusted by Thousands
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Our community's success speaks for itself. Join property owners and renters 
          who've transformed their rental experience with Toletforrent.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        
        {/* Stat 1 */}
        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <h3 className="text-4xl font-bold text-red-500">47,832</h3>
          <p className="mt-2 font-semibold text-gray-900">
            Successful Rentals
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Properties matched with perfect tenants
          </p>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <h3 className="text-4xl font-bold text-red-500">34%</h3>
          <p className="mt-2 font-semibold text-gray-900">
            Average Revenue Increase
          </p>
          <p className="text-sm text-gray-500 mt-1">
            For property owners using our platform
          </p>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <h3 className="text-4xl font-bold text-red-500">96%</h3>
          <p className="mt-2 font-semibold text-gray-900">
            Tenant Satisfaction
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Based on verified reviews and ratings
          </p>
        </div>

        {/* Stat 4 */}
        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <h3 className="text-4xl font-bold text-red-500">12,847</h3>
          <p className="mt-2 font-semibold text-gray-900">
            Active Community Members
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Renters and owners actively using Toletforrent
          </p>
        </div>

      </div>

    </section>
  );
}
