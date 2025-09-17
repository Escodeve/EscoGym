'use client';


import { Box, Typography, Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { User } from '@/@Types/users';

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02, boxShadow: '0px 8px 20px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          borderRadius: 3,
          p: 4,
          mb: 3,
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #e0e0e0',
        }}
      >
        <Box className="flex items-center gap-4">
          <Avatar sx={{ width: 40, height: 40 }}>{user.name.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">{user.phone}</Typography>
            <Typography variant="body2">Plan: {user.membershipPlanName}</Typography>
            <Typography variant="body2">Durée: {user.membershipDuration} mois</Typography>
            <Typography variant="body2">Début: {user.startDate}</Typography>
            <Typography variant="body2">Fin: {user.expiryDate}</Typography>
            <Typography variant="body2">Paiement: {user.paymentStatus}</Typography>
            <Typography variant="body2">Statut compte: {user.accountStatus}</Typography>
          </Box>
        </Box>
        <Box>
          <IconButton color="primary" onClick={() => onEdit(user)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(user.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  );
}
