'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import noDataImg from '@/assets/illustrations/no_data.svg';

export interface AccessLog {
  id: number;
  userId: number;
  userName?: string;
  rfIdCardNumber: string;
  doorId: number;
  result: string;
  checkInDate: string;
  checkOutDate: string;
}

interface AccessLogsTableProps {
  logs: AccessLog[];
  onEdit?: (log: AccessLog) => void;
  onDelete?: (log: AccessLog) => void;
}

export default function AccessLogsTable({ logs }: AccessLogsTableProps) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Image src={noDataImg} alt="Aucune donnée" width={300} height={300} />
        <p className="mt-4 text-gray-500">Aucune donnée trouvée</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Nom', 'Status', 'Check-in', 'Check-out'].map((header, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-center font-semibold ${
                  index === 0 ? 'rounded-tl-lg' : ''
                } ${index === 3 ? 'rounded-tr-lg' : ''}`}
                style={{ backgroundColor: '#94e03e', color: '#ffffff' }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {logs.map((log) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ backgroundColor: '#f9fafb' }}
                className="border-b"
              >
                <td className="px-4 py-3 text-center">
                  <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-medium">
                    {log.userName || log.userId}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
                    {log.result}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="bg-pink-50 text-pink-700 px-3 py-2 rounded-lg">
                    {new Date(log.checkInDate).toLocaleString('fr-FR')}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg">
                    {log.checkOutDate
                      ? new Date(log.checkOutDate).toLocaleString('fr-FR')
                      : '-'}
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
