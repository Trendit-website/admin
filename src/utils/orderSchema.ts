export type OrderSchema = {
  data: {
    tasks: any[];
    pages: number;
    total: number;
  };
};
export type OrderDetailSchema = {
  data: {
    task: {
      id: number;
      creator: {
        email: string;
        id: number;
      };
      status: string;
      platform: string;
      post_counts: number;
      engagements_count: number;
      target_country: string;
      target_state: string;
      gender: string;
      religion: string;
      fee_paid: string;
      media_path: ""[];
      task_type: string;
      account_link: string;
    };
    pages: number;
    total: number;
  };
};
