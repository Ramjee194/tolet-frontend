import { FaBrain, FaShieldAlt, FaUsers, FaCheck } from "react-icons/fa";

export default function WhyChoose() {
  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-16">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Why Choose Toletforrent?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We've reimagined the rental experience with cutting-edge technology,
          transparent processes, and a community-first approach.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Feature Card */}
        {[
          {
            icon: <FaBrain size={24} />,
            bg: "bg-red-100 text-red-500",
            title: "AI-Powered Matching",
            desc: "Our intelligent algorithm analyzes your preferences, lifestyle, and budget to connect you with properties that truly fit your needs.",
            points: [
              "Smart property recommendations",
              "Lifestyle compatibility scoring",
              "Budget optimization suggestions",
              "Preference learning over time",
            ],
            color: "text-red-500",
          },
          {
            icon: <FaShieldAlt size={24} />,
            bg: "bg-blue-100 text-blue-500",
            title: "Transparent Verification",
            desc: "Every user, property, and transaction is thoroughly verified through our comprehensive trust and safety system.",
            points: [
              "Identity verification for all users",
              "Property authenticity checks",
              "Financial background screening",
              "Real-time fraud detection",
            ],
            color: "text-blue-500",
          },
          {
            icon: <FaUsers size={24} />,
            bg: "bg-green-100 text-green-500",
            title: "Community-Driven Insights",
            desc: "Tap into the collective wisdom of our community with authentic reviews, neighborhood guides, and local insights.",
            points: [
              "Verified tenant and owner reviews",
              "Neighborhood safety ratings",
              "Local amenity recommendations",
              "Community event updates",
            ],
            color: "text-green-500",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-14 h-14 flex items-center justify-center ${feature.bg} rounded-xl mb-6`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {feature.desc}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheck className={`${feature.color} mt-1`} size={12} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`mt-8 font-semibold ${feature.color} hover:underline`}
            >
              Learn More →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
