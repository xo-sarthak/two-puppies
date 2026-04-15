"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronLeft, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount, totalAmount } = useCart();

  return (
    <div className="min-h-screen bg-brand-beige">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-black flex items-center gap-4">
              <ShoppingBag size={40} className="text-brand-maroon" />
              Your Bag
            </h1>
            <span className="text-brand-black/60 font-medium uppercase tracking-widest text-sm">
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white p-6 rounded-3xl flex gap-6 items-center shadow-sm"
                    >
                      <div className="relative w-24 aspect-square rounded-2xl overflow-hidden bg-brand-cream">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-xl font-bold text-brand-black">{item.name}</h3>
                          <p className="font-serif text-lg text-brand-maroon">{item.price}</p>
                        </div>
                        <p className="text-sm text-brand-black/50 font-medium">{item.category}</p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-4 bg-brand-beige rounded-full px-4 py-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-brand-maroon transition-colors">
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-brand-maroon transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-black/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 space-y-6">
                    <p className="text-2xl font-serif text-brand-black/40 italic">Your bag is empty.</p>
                    <Link href="/">
                      <Button variant="outline" size="lg">Start Crafting Memories</Button>
                    </Link>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            {cart.length > 0 && (
              <div className="lg:col-span-4">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl space-y-8 sticky top-32">
                  <h2 className="text-2xl font-serif text-brand-black">Order Summary</h2>
                  <div className="space-y-4 border-b border-brand-black/5 pb-6">
                    <div className="flex justify-between text-brand-black/60 font-medium">
                      <span>Subtotal</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-brand-black/60 font-medium">
                      <span>Shipping</span>
                      <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest bg-green-50 px-2 py-1 rounded">Free</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-2xl font-serif text-brand-black">
                    <span>Total</span>
                    <span className="text-brand-maroon">${totalAmount.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout" className="block w-full">
                    <Button size="lg" className="w-full h-16 text-lg group">
                      Proceed to Checkout <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
