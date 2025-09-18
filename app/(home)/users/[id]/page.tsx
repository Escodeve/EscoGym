'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  fetchUserByIdRequest,
  fetchUserMembershipRequest,
  fetchUserAccessLogsRequest,
} from '@/redux/slices/users';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';
import { Membership, AccessLog } from '@/@Types/users';

const UserProfile: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const userId = Number(params.id);

  const { loading, selectedUser, membership, accessLogs } = useSelector(
    (state: RootState) => state.users
  );

  const [tabIndex, setTabIndex] = useState(0);

  // Fetch user, membership, access logs
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserByIdRequest(userId));
      dispatch(fetchUserMembershipRequest(userId));
      dispatch(fetchUserAccessLogsRequest(userId));
    }
  }, [dispatch, userId]);

  if (loading || !selectedUser) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress sx={{ color: '#94e03e' }} />
      </Box>
    );
  }

  return (
    <Box className="p-8">
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/users')}
        sx={{
          mb: 4,
          color: 'black',
          fontWeight: 'bold',
          '&:hover': { color: '#94e03e' },
        }}
      >
        Retour
      </Button>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="shadow-lg mb-6"
          sx={{
            borderRadius: '20px',
            border: '2px solid rgba(148,224,62,0.5)',
            background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(0,0,0,0.05) 50%, rgba(148,224,62,0.15) 100%)`,
            backdropFilter: 'blur(6px)',
            p: 2,
          }}
        >
          <CardContent className="flex items-center space-x-6">
            <Avatar
              sx={{
                bgcolor: '#94e03e',
                width: 90,
                height: 90,
                fontSize: 36,
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : '?'}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                {selectedUser.name}
              </Typography>
              <Typography sx={{ color: 'black', opacity: 0.8 }}>{selectedUser.phone}</Typography>
              <Typography sx={{ color: 'black', opacity: 0.8 }}>{selectedUser.email}</Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card
          className="shadow-lg"
          sx={{
            borderRadius: '18px',
            border: '1px solid rgba(148,224,62,0.4)',
            background: `linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(0,0,0,0.04) 50%, rgba(148,224,62,0.12) 100%)`,
            backdropFilter: 'blur(4px)',
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={(_, newValue) => setTabIndex(newValue)}
            textColor="inherit"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': { color: 'black', fontWeight: 'bold', textTransform: 'none', fontSize: '16px' },
              '& .Mui-selected': { color: '#94e03e !important' },
              '& .MuiTabs-indicator': { backgroundColor: '#94e03e', height: '3px' },
            }}
          >
            <Tab icon={<PersonIcon />} iconPosition="start" label="Informations personnelles" />
            <Tab icon={<SubscriptionsIcon />} iconPosition="start" label="Abonnement" />
            <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Journal d'accès" />
          </Tabs>
          <Divider />

          <CardContent sx={{ p: 4 }}>
            {/* Personal Info */}
            {tabIndex === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField label="Nom" value={selectedUser.name} />
                  <InfoField label="Email" value={selectedUser.email} />
                  <InfoField label="Téléphone" value={selectedUser.phone} />
                  <InfoField label="Statut du compte" value={selectedUser.accountStatus} />
                  <InfoField label="Statut d'accès" value={selectedUser.accessStatus} />
                  <InfoField
                    label="Date d'adhésion"
                    value={selectedUser.joinedAt ? new Date(selectedUser.joinedAt).toLocaleDateString() : '-'}
                  />
                  <InfoField label="Genre" value={selectedUser.gender || '-'} />
                  <InfoField label="RFID" value={selectedUser.rfIdCardNumber || '-'} />
                </Box>
              </motion.div>
            )}

            {/* Membership */}
            {tabIndex === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                {membership ? (
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoField label="Plan" value={membership.membershipPlanName} />
                    <InfoField label="Durée" value={`${membership.membershipDurationInMonths} mois`} />
                    <InfoField
                      label="Date de début"
                      value={membership.startDate ? new Date(membership.startDate).toLocaleDateString() : '-'}
                    />
                    <InfoField
                      label="Date d'expiration"
                      value={membership.expiryDate ? new Date(membership.expiryDate).toLocaleDateString() : '-'}
                    />
                    <InfoField label="Statut de paiement" value={membership.paymentStatus} />
                    <InfoField label="Montant payé" value={membership.paidAmount || 0} />
                    <InfoField label="Montant à payer" value={membership.amountToPay || 0} />
                  </Box>
                ) : (
                  <Typography>Aucun abonnement trouvé</Typography>
                )}
              </motion.div>
            )}

            {/* Access Logs */}
            {tabIndex === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                {accessLogs && accessLogs.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date dentrée</TableCell>
                        <TableCell>Date de sortie</TableCell>
                        <TableCell>Durée</TableCell>
                        <TableCell>Résultat</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accessLogs.map((log: AccessLog, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{log.checkInDate ? new Date(log.checkInDate).toLocaleString() : '-'}</TableCell>
                          <TableCell>{log.checkOutDate ? new Date(log.checkOutDate).toLocaleString() : '-'}</TableCell>
                          <TableCell>{log.duration || '-'}</TableCell>
                          <TableCell>{log.result}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>Aucun journal daccès trouvé</Typography>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

// Reusable info field
const InfoField = ({ label, value }: { label: string; value: string | number }) => (
  <Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#94e03e' }}>
      {label}
    </Typography>
    <Typography sx={{ color: 'black', fontSize: '15px' }}>{value}</Typography>
  </Box>
);

export default UserProfile;
