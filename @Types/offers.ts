export interface MembershipPlan {
    id: number;
    name?: string;
    montlyPrice: number;
    discountPercentage: number;
    addedDyas: number;
    durationInMonths: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface MembershipPlanCreate {
    name: string;
    monthlyPrice: number;
    discountPercentage: number;
    addedDays: number;
    durationInMonths: number;
  }
  
  export interface MembershipPlanUpdate {
    name: string;
    monthlyPrice: number;
    discountPercentage: number;
    addedDays: number;
    durationInMonths: number;
  }
  
  export interface ApiResponse {
    status: string;
    message: string;
  }
  