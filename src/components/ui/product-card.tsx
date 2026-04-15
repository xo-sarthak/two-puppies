"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
}

export const ProductCard = ({ id, title, price, image, category }: ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/product/${id}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-cream">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
            <Button variant="secondary" size="sm" className="p-3 shadow-lg" onClick={(e) => e.preventDefault()}>
              <Heart size={18} />
            </Button>
            <Button variant="secondary" size="sm" className="p-3 shadow-lg" onClick={(e) => e.preventDefault()}>
              <ShoppingBag size={18} />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest uppercase text-brand-maroon">
              {category}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex justify-between items-start">
        <Link href={`/product/${id}`}>
          <div>
            <h3 className="font-serif text-lg font-medium text-brand-black hover:text-brand-maroon transition-colors">{title}</h3>
            <p className="text-sm text-brand-black/60 font-medium">{category}</p>
          </div>
        </Link>
        <p className="font-medium text-brand-maroon">{price}</p>
      </div>
    </motion.div>
  );
};
