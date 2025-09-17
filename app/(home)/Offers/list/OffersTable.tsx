'use client';

import { IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Offer {
  id: number;
  name: string;
  monthlyPrice: number;
  discountPercentage: number;
  addedDays: number;
  durationInMonths: number;
}

interface OffersTableProps {
  offers: Offer[];
  onEdit: (offer: Offer) => void;
  onDelete: (offer: Offer) => void;

}

export default function OffersTable({ offers, onEdit, onDelete }: OffersTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Name', 'Prix mensuel', 'Réduction %', 'Jours ajoutés', 'Durée (mois)', 'Actions'].map((header, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-left ${index === 0 ? 'rounded-tl-lg' : ''} ${index === 5 ? 'text-center rounded-tr-lg' : ''}`}
                style={{ backgroundColor: '#94e03e', color: '#ffffff' }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {Array.isArray(offers) && offers.map((offer) => (
              <motion.tr
                key={offer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
                className="border-b"
              >
                <td className="px-4 py-3 text-center">
                  <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-medium">{offer.name}</div>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg">{offer.monthlyPrice} dh</div>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">{offer.discountPercentage}%</div>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg">{offer.addedDays} jours</div>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="bg-pink-50 text-pink-700 px-3 py-2 rounded-lg">{offer.durationInMonths} mois</div>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <IconButton color="primary" onClick={() => onEdit(offer)} sx={{ borderRadius: 2 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(offer)} sx={{ borderRadius: 2 }}>
  <DeleteIcon />
</IconButton>

                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
