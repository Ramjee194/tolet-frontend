import { FaCircle } from "react-icons/fa";

export default function LiveActivity() {
  return (
    <section className="bg-white py-20 px-6 lg:px-16">
      
      
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Live Activity
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          Real-time updates
        </p>
      </div>

   
      <div className="mt-12 max-w-3xl mx-auto space-y-6">

      
        <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <FaCircle className="text-green-500 mt-2 animate-pulse" size={10} />
          <div>
            <p className="font-semibold text-gray-900">
              New rental agreement signed in Brooklyn, NY
            </p>
            <p className="text-sm text-gray-500 mt-1">
              2 minutes ago
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <FaCircle className="text-blue-500 mt-2" size={10} />
          <div>
            <p className="font-semibold text-gray-900">
              Property listed in Manhattan, NY
            </p>
            <p className="text-sm text-gray-500 mt-1">
              5 minutes ago
            </p>
          </div>
        </div>

       
        <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <FaCircle className="text-purple-500 mt-2" size={10} />
          <div>
            <p className="font-semibold text-gray-900">
              Tenant application approved in Chicago, IL
            </p>
            <p className="text-sm text-gray-500 mt-1">
              8 minutes ago
            </p>
          </div>
        </div>

      
        <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <FaCircle className="text-red-500 mt-2" size={10} />
          <div>
            <p className="font-semibold text-gray-900">
              Property tour scheduled in San Francisco, CA
            </p>
            <p className="text-sm text-gray-500 mt-1">
              12 minutes ago
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
