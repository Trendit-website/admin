export type UserSchema = {
  data: {
    pages: number;
    total: number;
    users: any[];
  };
};
export type UserDetailsSchema = {
  referral_metrics: { referral_history: number[]; total: number };
  social_profiles: any[];
  task_activity: { activities: any[]; total: number };
  transaction_metrics: {
    currency_code: string;
    currency_name: string;
    total_earned_current_month: number;
    total_earned_overall: number;
    total_spent_current_month: number;
    total_spent_overall: number;
    total_transactions: number;
    transactions_history: any[];
    wallet_balance: string;
  };
  user: {
    birthday: string;
    country: string;
    date_joined: string;
    email: string;
    firstname: string;
    full_name: string;
    gender: string;
    id: number;
    lastname: string;
    local_government: string;
    membership_fee: boolean;
    phone: string;
    primary_bank: {
      account_name: string;
      account_no: string;
      bank_code: string;
      bank_name: string;
      is_primary: boolean;
      user_id: number;
    };
    profile_picture: string;
    referral_link: string;
    roles: any[];
    social_profiles: [];
    state: string;
    username: string;
    religion: string;
    two_fa: {
      enabled: boolean;
      methos: any;
    };
    wallet: {
      balance: string;
      currency_code: string;
      currency_name: string;
      currency_symbol: string;
      user_id: number;
    };
  };
};
