import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Zap, Users, ArrowRight, Check } from 'lucide-react'

export default function Landing() {
  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-accent" />,
      title: "Cross-Platform Publishing",
      description: "Schedule and publish content across Twitter, Facebook, Instagram, and LinkedIn from one dashboard."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "AI Caption Assistant",
      description: "Generate optimized captions for each platform with AI, considering character limits and best practices."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Smart Scheduling",
      description: "Get AI-powered suggestions for optimal posting times based on audience activity patterns."
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1 social account",
        "10 posts per month",
        "Basic scheduling",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      features: [
        "5 social accounts",
        "100 posts per month",
        "AI caption assistant",
        "Smart scheduling",
        "Priority support"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Business",
      price: "$79",
      period: "per month",
      features: [
        "15 social accounts",
        "Unlimited posts",
        "Advanced analytics",
        "Team collaboration",
        "Custom integrations",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-container">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Schedule social posts everywhere,
            <span className="text-accent block mt-2">effortlessly.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered social media scheduling that helps creators and businesses 
            publish content across multiple platforms simultaneously.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-accent text-lg px-8 py-3 inline-flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-container bg-surface/50">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Everything you need to manage social media
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center animate-fade-in">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-container">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Choose your plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`card relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300 ml-1">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/register" 
                  className={`w-full block text-center py-3 rounded-md transition-colors ${
                    plan.popular ? 'btn-accent' : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}