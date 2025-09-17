export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  accountStatus: string;
  membershipPlanName: string;
  membershipDuration: number;
  startDate: string;
  expiryDate: string;
  paymentStatus: string;
    rfIdCardNumber?: string;
  gender?: string;
  accessStatus: string;
  joinedAt?: string;
  role : string

}
export interface Membership {
  membershipPlanName: string;
  membershipDurationInMonths: number;
  membershipMonthlyPrice: number;
  membershipDiscount: number;
  membershipAddedDays: number;
  startDate: string;   // ISO date
  expiryDate: string;  // ISO date
  paymentStatus: string;
  paidAt: string;
  paidAmount: number;
  amountToPay: number;
}
export interface AccessLog {
  checkInDate: string;   // ISO date
  checkOutDate: string;  // ISO date
  result: "ALLOWED" | "DENIED";
  reason: string | null;
  duration: string;      // e.g. "2 hours 57 minutes"
  createdAt: string;     // ISO date
}
