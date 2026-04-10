"use client";

import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { SearchInput } from "../ui/SearchInput";
import { BusinessCard, type BusinessData } from "./BusinessCard";
import { EmptyState } from "./EmptyState";
import { motion, AnimatePresence } from "framer-motion";

export function FeedContainer({ initialItems }: { initialItems: BusinessData[] }) {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = initialItems.filter(item => {
    const matchesCategory = currentCategory === "All" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SearchInput placeholder="Search businesses, cafes..." onSearch={setSearchQuery} />
      
      <div style={{ marginTop: "16px" }}>
        <CategoryFilter selected={currentCategory} onSelect={setCurrentCategory} />
      </div>

      <div style={{ marginTop: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "16px" }}>
          Near you
        </h2>
        
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <BusinessCard business={item} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
