'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningHours from './OpeningHours';
import BreakAndHolidays from './BreakAndHolidays';


export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['Général', 'Horaires d ouverture', 'Jours fériés'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      <div className="flex space-x-2 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTab(idx)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTab === idx
                ? 'bg-green-500 text-white shadow'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedTab === 0 && (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="border px-3 py-2 rounded w-full"
                placeholder="Company Name"
              />
              <input
                className="border px-3 py-2 rounded w-full"
                placeholder="Email"
              />
            </div>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Save General Settings
            </button>
          </motion.div>
        )}

{selectedTab === 1 && (
  <motion.div
    key="hours"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-4 md:p-6 rounded-lg shadow w-full max-w-5xl "
  >
    <OpeningHours />
  </motion.div>
)}


{selectedTab === 2 && (
  <BreakAndHolidays />
)}

      </AnimatePresence>
    </div>
  );
}
