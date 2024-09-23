export type InsightSchema = {
  data: {
    total_earners_settled: string;
    total_inflow_pending: string;
    total_membership_fee: string;
    total_order_paid: string;
    total_outflow_pending: string;
    total_referral_paid: string;
    num_approved_ads: number;
    num_available_tasks: number;
  };
};
export type SignupReportSchema = {
  data: {
    signup_data: [];
  };
};
