"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { ArrowRight, Sparkles, Smile, Heart, Zap, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

export default function Home() {
  const [activeIdentity, setActiveIdentity] = useState("Them");

  const identities = ["Her", "Him", "Them"];
  
  const filteredProducts = products.filter(p => p.identity === activeIdentity || activeIdentity === "Them");

  const moods = [
    { name: "She's Mad at Me", icon: <Zap className="text-amber-500" />, desc: "The 'I messed up' collection" },
    { name: "First Anniversary", icon: <Heart className="text-brand-maroon" />, desc: "Timeless tokens of love" },
    { name: "Just Because", icon: <Smile className="text-blue-400" />, desc: "Small wins, big smiles" },
    { name: "Special Win", icon: <Sparkles className="text-purple-500" />, desc: "Gifts for their big moment" },
  ];

  const occasions = [
    { name: "Weddings", image: "/images/wedding.png", desc: "For the new journey" },
    { name: "Birthdays", image: "/images/hero_gifts.png", desc: "Celebrate their day" },
    { name: "New Home", image: "/images/workspace.png", desc: "Warm their space" },
  ];

  const places = [
    { name: "Desk & Studio", image: "/images/workspace.png" },
    { name: "Cozy Bedroom", image: "/images/couple.png" },
    { name: "Outdoor Magic", image: "/images/premium_items.png" },
  ];

  return (
    <div className="min-h-screen bg-brand-beige">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-6 py-12 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-8 z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pink/50 rounded-full text-brand-maroon font-semibold text-sm">
                <Sparkles size={16} />
                <span>Gifts that speak when words won't</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif text-brand-maroon leading-[1.1]">
                Curated Treasures <br /> 
                <span className="text-[#0A0A0A] italic">for every soulmate</span>
              </h1>
              <p className="text-lg text-[#0A0A0A]/80 max-w-lg leading-relaxed font-medium">
                Whether they're mad, happy, or just yours—discover handpicked gifts that turn moments into memories.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Explore Collection</Button>
                <Button variant="outline" size="lg">How it Works</Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 relative aspect-square w-full max-w-2xl"
            >
              <div className="absolute inset-0 bg-brand-pink rounded-full blur-[100px] opacity-20 animate-pulse" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl rotate-2">
                <Image
                  src="/images/hero_gifts.png"
                  alt="Curated gifts"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl space-y-2 max-w-[200px]"
              >
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Heart key={i} size={12} className="fill-brand-maroon text-brand-maroon" />)}
                </div>
                <p className="font-serif text-sm italic font-medium text-brand-black">"Literally the best anniversary gift ever!"</p>
                <p className="text-[10px] text-brand-black/70 font-bold uppercase tracking-wider">— Sarah & Jamie</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Identity Section */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-brand-black/10 pb-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif text-brand-maroon">Gifting for...</h2>
                <div className="flex gap-4">
                  {identities.map((id) => (
                    <button
                      key={id}
                      onClick={() => setActiveIdentity(id)}
                      className={cn(
                        "text-3xl md:text-4xl font-serif transition-colors",
                        activeIdentity === id 
                          ? "text-brand-maroon underline decoration-brand-pink underline-offset-8" 
                          : "text-brand-black/40 hover:text-brand-black/60"
                      )}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="ghost" className="flex items-center gap-2 group text-brand-black font-semibold">
                Browse All categories <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} title={product.name} image={product.images[0]} />
              ))}
            </div>
          </div>
        </section>

        {/* Mood Section */}
        <section className="px-6 py-24 bg-brand-cream">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-maroon">What's the vibe today?</h2>
              <p className="text-brand-black/80 font-medium">Gifting isn't just about the person—it's about the moment. Tell us the mood, we'll find the gift.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {moods.map((mood, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-3xl shadow-sm border border-brand-maroon/5 flex flex-col items-center text-center gap-4 cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-brand-beige rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {mood.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-black">{mood.name}</h3>
                  <p className="text-sm text-brand-black/70 font-medium">{mood.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Occasions Section */}
        <section id="occasions" className="px-6 py-24 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6 self-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-pink/30 rounded-full text-brand-maroon text-xs font-bold uppercase tracking-widest">
                Special Moments
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-black leading-tight">Gifts for every <br /><span className="text-brand-maroon italic">Occasion</span></h2>
              <p className="text-brand-black/70 font-medium leading-relaxed">From wedding bells to birthday surprises, we curate collections that match the magnitude of your moments.</p>
              <Button variant="outline" className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">View All Occasions <Calendar size={18} /></Button>
            </div>
            {occasions.map((occ, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 0.98 }}
                className="relative aspect-[3/4] rounded-[2rem] overflow-hidden group cursor-pointer"
              >
                <Image src={occ.image} alt={occ.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white space-y-2">
                  <h3 className="text-2xl font-serif">{occ.name}</h3>
                  <p className="text-xs opacity-70 uppercase tracking-widest font-bold">{occ.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Places lifestyle section */}
        <section id="places" className="px-6 py-24 bg-brand-beige/30">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex items-end justify-between border-b border-brand-black/5 pb-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif text-brand-black">Gifting for <span className="italic">Places</span></h2>
                <p className="text-brand-black/70 font-medium max-w-sm">Bring warmth and curate vibes for the spaces they love most.</p>
              </div>
              <Button variant="ghost" className="flex items-center gap-2 group text-brand-black font-bold uppercase tracking-widest text-[10px]">
                Explore Places <MapPin size={18} className="group-hover:animate-bounce" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {places.map((place, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg">
                    <Image src={place.image} alt={place.name} fill className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-serif text-brand-black group-hover:text-brand-maroon transition-colors">{place.name}</h3>
                  <div className="h-0.5 w-full bg-brand-maroon mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto relative h-[500px] rounded-[3rem] overflow-hidden group">
            <Image
              src="/images/couple.png"
              alt="Two Puppies Lifestyle"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/80 to-transparent flex flex-col items-center justify-center text-center p-12 text-white space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif max-w-3xl leading-tight">
                "Every gift tells a story. Let's write yours together."
              </h2>
              <p className="text-lg opacity-80 font-medium">Join 50K+ couples celebrating love every day.</p>
              <Button variant="secondary" size="lg" className="rounded-full shadow-2xl">Create Your Wishlist</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-maroon text-brand-pink px-6 py-20 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-pink rounded-xl flex items-center justify-center text-brand-maroon font-serif text-xl">TP</div>
              <span className="font-serif text-2xl font-bold">Two Puppies</span>
            </div>
            <p className="text-brand-pink/80 text-sm leading-relaxed font-medium">
              Curating premium gifting experiences for the modern couple. Made with love for Every identity.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Categories</h4>
            <ul className="space-y-4 text-sm opacity-60">
              <li>Luxe Collections</li>
              <li>Jewelry & Aura</li>
              <li>Curated Boxes</li>
              <li>Handmade Treasures</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-sm opacity-80 font-medium">
              <li>Custom Orders</li>
              <li>Shipping Policy</li>
              <li>Track Order</li>
              <li>Gifting Guide</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Join our Circle</h4>
            <p className="text-xs opacity-80 mb-6 font-medium">Get weekly gifting inspiration and exclusive launches.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-white/10 border-none rounded-full px-4 text-sm w-full focus:ring-2 focus:ring-brand-pink text-white placeholder:text-white/40"
              />
              <Button size="sm" variant="secondary">Join</Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-brand-pink/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest opacity-40">
          <p>© 2024 Two Puppies Gifting Studio. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>Instagram</span>
            <span>TikTok</span>
            <span>Pinterest</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
