import { createFileRoute } from '@tanstack/react-router'
import { AlertTriangle, CheckCircle, Star } from 'lucide-react'

export const Route = createFileRoute('/results')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FAF3E0] p-8">
      <div className="max-w-4xl mx-auto space-y-8 pt-16">
        {/* Title Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-[#2E7D32] mb-2">
            Organic Valley - Milk
          </h1>
          <p className="text-[#37474F]/70 text-xl">
            Product Analysis Results
          </p>
        </section>

        {/* Risks Section */}
        <section className="bg-white/80 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold text-[#37474F]">Risks to Consider</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Contains synthetic growth hormones",
              "Animals were not raised on pasture",
              "May contain traces of antibiotics",
              "Includes artificial additives"
            ].map((risk, index) => (
              <li key={index} className="flex items-center bg-red-50 p-3 rounded-md text-red-700">
                <span className="ml-2">{risk}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Benefits Section */}
        <section className="bg-white/80 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-[#37474F]">Benefits</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Free from synthetic pesticides and fertilizers",
              "Produced without the use of hormones",
              "Meets ethical animal welfare standards"
            ].map((benefit, index) => (
              <li key={index} className="flex items-center bg-green-50 p-3 rounded-md text-green-700">
                <span className="ml-2">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Recommendations Section */}
        <section className="bg-white/80 rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-[#37474F]">Better Alternatives</h2>
          </div>
          <ul className="space-y-4">
            {[
              {
                name: "Brand X - Organic Whole Milk",
                reason: "Certified Organic, no hormones, pasture-raised"
              },
              {
                name: "Brand Y - Grass-Fed Milk",
                reason: "100% grass-fed, higher in nutrients, ethical farming"
              },
              {
                name: "Brand Z - Pasture-Raised Dairy",
                reason: "Humane certified, no antibiotics, sustainable practices"
              }
            ].map((alternative, index) => (
              <li key={index} className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-blue-800">{alternative.name}</h3>
                <p className="text-blue-600 mt-1 text-sm">{alternative.reason}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
