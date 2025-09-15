export interface AccessLog {
    id: number;
    userId: number;
    userName?: string; // si l'API retourne le nom
    rfIdCardNumber: string;
    doorId: number;
    result: string;
    checkInDate: string;
    checkOutDate: string | null;
  }
  
  export interface AccessLogsResponse {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    logs: AccessLog[];
  }
  