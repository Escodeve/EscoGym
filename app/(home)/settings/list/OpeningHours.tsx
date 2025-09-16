'use client';

import { useState, useEffect } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

type DayHours = {
  open: boolean;
  start: string;
  end: string;
  gender: 'Homme' | 'Femme';
};

const daysOfWeek: string[] = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

function generateTimes(): string[] {
  const times: string[] = [];
  const pad = (num: number) => num.toString().padStart(2, '0');

  for (let hour = 0; hour < 24; hour++) {
    for (let min of [0, 30]) {
      times.push(`${pad(hour)}:${pad(min)}`);
    }
  }
  return times;
}

export default function OpeningHours() {
  const [hours, setHours] = useState<Record<string, DayHours>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchHours() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token manquant');

        const res = await fetch(
          'https://gym-access-worker.gym-access.workers.dev/api/v1/config/days',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data;

        if (!Array.isArray(data)) throw new Error('Les données ne sont pas un tableau');

        const mappedHours: Record<string, DayHours> = {};
        daysOfWeek.forEach((dayName, index) => {
          const dayData = data.find((d) => d.day === index) || {
            startTime: '1970-01-01T09:00:00.000Z',
            endTime: '1970-01-01T17:00:00.000Z',
            gender: 'MALE',
            isOpen: index !== 0 && index !== 6,
          };

          mappedHours[dayName] = {
            start: new Date(dayData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            end: new Date(dayData.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            gender: dayData.gender === 'FEMALE' ? 'Femme' : 'Homme',
            open: dayData.isOpen,
          };
        });

        setHours(mappedHours);
      } catch (err) {
        console.error(err);
        toast.error('❌ Erreur lors de la récupération des horaires');
      } finally {
        setLoading(false);
      }
    }

    fetchHours();
  }, []);

  function toggleDay(day: string) {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open },
    }));
  }

  function updateTime(day: string, field: 'start' | 'end', value: string) {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  }

  function updateGender(day: string, gender: 'Homme' | 'Femme') {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], gender },
    }));
  }

  async function handleSave() {
    setSaving(true); 
    
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");

      const res = await fetch(
        "https://gym-access-worker.gym-access.workers.dev/api/v1/config/days",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      const json = await res.json();
      const daysData = Array.isArray(json) ? json : json.data;

      const dayIdMap: Record<string, number> = {};
      daysData.forEach((d: any) => {
        const dayName = daysOfWeek[d.day];
        dayIdMap[dayName] = d.id;
      });

      for (let dayName of daysOfWeek) {
        const dayData = hours[dayName];
        const dayId = dayIdMap[dayName];

        if (dayId === undefined) continue;

        const formatTime = (time: string) => `1970-01-01 ${time}`;

        const payload: any = {
          gender: dayData.gender === "Femme" ? "FEMALE" : "MALE",
          isOpen: dayData.open,
        };

        if (dayData.open) {
          payload.startTime = formatTime(dayData.start);
          payload.endTime = formatTime(dayData.end);
        }

        const resPut = await fetch(
          `https://gym-access-worker.gym-access.workers.dev/api/v1/config/days/${dayId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!resPut.ok) {
          const errMsg = await resPut.json();
          console.error("Erreur API:", errMsg);
          throw new Error(`Erreur HTTP ${resPut.status} pour ${dayName}`);
        }
      }

      toast.success("✅ Horaires enregistrés avec succès !");
    } catch (err) {
      console.error(err);
      toast.error("❌ Erreur lors de l’enregistrement des horaires");
    } finally {
      setSaving(false); 
    }
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-6">Définir les horaires standards</h2>

      <div className="space-y-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2 min-w-[120px]">
              <input
                type="checkbox"
                checked={hours[day].open}
                onChange={() => toggleDay(day)}
                className="w-5 h-5 rounded-md"
              />
              <span className="font-medium">{day}</span>
            </label>

            {hours[day].open ? (
              <>
                <select
                  value={hours[day].start}
                  onChange={(e) => updateTime(day, 'start', e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {generateTimes().map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <span className="text-sm">à</span>
                <select
                  value={hours[day].end}
                  onChange={(e) => updateTime(day, 'end', e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {generateTimes().map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => updateGender(day, 'Homme')}
                  className={`flex items-center gap-1 px-3 py-1 rounded border ${
                    hours[day].gender === 'Homme'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  <FaMale /> Homme
                </button>
                <button
                  type="button"
                  onClick={() => updateGender(day, 'Femme')}
                  className={`flex items-center gap-1 px-3 py-1 rounded border ${
                    hours[day].gender === 'Femme'
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  <FaFemale /> Femme
                </button>
              </>
            ) : (
              <span className="text-gray-500 text-sm ml-2">Fermé</span>
            )}
          </div>
        ))}
      </div>

     
      <motion.div className="flex justify-end mt-6">
        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className={`px-6 py-3 rounded font-medium text-white ${
            saving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {saving ? '⏳ Enregistrement...' : 'Enregistrer les horaires'}
        </motion.button>
      </motion.div>
    </div>
  );
}
