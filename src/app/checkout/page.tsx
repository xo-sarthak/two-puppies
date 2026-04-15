"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle2, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      clearCart();
    }
    setStep(prev => prev + 1);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center space-y-8"
        >
          <div className="w-24 h-24 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto text-brand-maroon">
            <CheckCircle2 size={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-serif text-brand-maroon">Order Confirmed</h1>
            <p className="text-brand-black/60 font-medium">Your curated treasures are being prepared with care. We'll notify you soon!</p>
          </div>
          <Link href="/" className="block">
            <Button size="lg" className="w-full">Continue Discovery</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-beige">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-12">
              {/* Stepper */}
              <div className="flex items-center gap-8">
                <div className={cn("flex items-center gap-2", step >= 1 ? "text-brand-maroon" : "text-brand-black/20")}>
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2", step >= 1 ? "border-brand-maroon bg-brand-maroon text-white" : "border-brand-black/20")}>1</div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                </div>
                <div className="h-[1px] w-12 bg-brand-black/10" />
                <div className={cn("flex items-center gap-2", step >= 2 ? "text-brand-maroon" : "text-brand-black/20")}>
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2", step >= 2 ? "border-brand-maroon bg-brand-maroon text-white" : "border-brand-black/20")}>2</div>
                  <span className="font-bold uppercase tracking-widest text-[10px]">Payment</span>
                </div>
              </div>

              <form onSubmit={handleNextStep} className="space-y-8">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-3xl font-serif text-brand-black">Shipping Address</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="First Name" />
                        <Input placeholder="Last Name" />
                        <div className="col-span-2">
                          <Input placeholder="Address Line 1" />
                        </div>
                        <Input placeholder="City" />
                        <Input placeholder="Postal Code" />
                      </div>
                      <Button size="lg" className="w-full h-16 text-lg">Continue to Payment</Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-3xl font-serif text-brand-black">Secure Payment</h2>
                      <div className="bg-brand-cream/30 p-8 rounded-3xl space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <CreditCard className="text-brand-maroon" />
                            <span className="font-bold text-sm uppercase tracking-widest">Card Details</span>
                          </div>
                          <div className="flex gap-2">
                            <div className="w-8 h-5 bg-zinc-200 rounded" />
                            <div className="w-8 h-5 bg-zinc-200 rounded" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Input placeholder="Card Number" />
                          <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="MM / YY" />
                            <Input placeholder="CVC" />
                          </div>
                        </div>
                      </div>
                      <Button size="lg" className="w-full h-16 text-lg shadow-2xl">Complete Order — ${totalAmount.toFixed(2)}</Button>
                      <p className="text-center text-[10px] uppercase font-bold tracking-widest text-brand-black/40 flex items-center justify-center gap-2">
                        <ShieldCheck size={14} /> Encrypted Secure Checkout
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Order Review Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-brand-black/5 space-y-8 sticky top-32">
                <h3 className="text-2xl font-serif text-brand-black italic underline decoration-brand-pink">In Your Bag</h3>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 aspect-square rounded-xl overflow-hidden bg-brand-cream">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-brand-black">{item.name}</h4>
                        <p className="text-xs text-brand-black/50">{item.quantity} x {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-8 border-t border-brand-black/5 space-y-4 font-medium">
                  <div className="flex justify-between text-brand-black/60">
                    <span>Shipping fee</span>
                    <span className="text-brand-maroon">FREE</span>
                  </div>
                  <div className="flex justify-between text-2xl font-serif text-brand-black">
                    <span>Final Amount</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input 
      placeholder={placeholder}
      className="w-full h-14 px-6 rounded-2xl bg-white border border-brand-black/5 focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none font-medium transition-all"
    />
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
