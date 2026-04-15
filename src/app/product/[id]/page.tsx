"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingBag, Heart, Share2, Star, Check, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Navbar } from "@/components/layout/navbar";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-beige">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif text-brand-maroon">Product not found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-beige selection:bg-brand-pink">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs / Back */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-brand-black/50 hover:text-brand-black transition-colors mb-8 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-widest">Back to Collection</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Zara-style Editorial Gallery */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {product.images.map((img, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-brand-cream"
                  >
                    <Image 
                      src={img} 
                      alt={product.name} 
                      fill 
                      className="object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Product Details Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-brand-maroon font-bold text-xs uppercase tracking-widest">
                    <Star size={14} className="fill-brand-maroon" />
                    <span>Highly Coveted</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif text-brand-black leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-serif text-brand-maroon">{product.price}</p>
                </div>

                <div className="space-y-6 border-y border-brand-black/5 py-8">
                  <p className="text-brand-black/80 font-medium leading-relaxed italic">
                    {product.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-brand-black/60 font-medium">
                        <Check size={16} className="text-brand-maroon" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full h-16 text-lg shadow-xl"
                    onClick={handleAddToCart}
                  >
                    <AnimatePresence mode="wait">
                      {added ? (
                        <motion.span 
                          key="added"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Check size={20} /> Added to Bag
                        </motion.span>
                      ) : (
                        <motion.span 
                          key="add"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag size={20} /> Add to Bag
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full h-16 text-lg group">
                    <Heart size={20} className="mr-2 group-hover:fill-brand-maroon transition-colors" /> Add to Wishlist
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-black/5">
                  <div className="flex flex-col items-center text-center gap-2">
                    <ShieldCheck size={24} className="text-brand-maroon" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Handpicked</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Truck size={24} className="text-brand-maroon" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Share2 size={24} className="text-brand-maroon" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Curated Care</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Section */}
          <section className="mt-32 pt-20 border-t border-brand-black/5">
            <h2 className="text-3xl font-serif text-brand-black mb-12 italic text-center">You might also love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.filter(p => p.id !== product.id).slice(0, 4).map((p, i) => (
                <motion.div 
                  key={p.id}
                  whileHover={{ y: -10 }}
                  className="space-y-4 cursor-pointer"
                  onClick={() => router.push(`/product/${p.id}`)}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg font-medium">{p.name}</h3>
                    <p className="font-medium text-brand-maroon">{p.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
