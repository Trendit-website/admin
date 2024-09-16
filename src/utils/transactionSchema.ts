export type TransactionSchema = {
  data: {
    current_page: number;
    pages: number;
    total: number;
    transactions: any[];
    total_inflow: number | string;
    total_outflow: number | string;
    total_pending_inflow: number | string;
    total_pending_outflow: number | string;
  };
};
