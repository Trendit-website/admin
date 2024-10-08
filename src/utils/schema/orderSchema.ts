export type OrderSchema = {
  data: {
    tasks: any[];
    pages: number;
    total: number;
  };
};
export type TaskPerfomers = {
  data: {
    total_pages: number;
    current_page: number;
    task_performances: any[];
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
      task_key: string;
    };
    pages: number;
    total: number;
  };
};
