export type SocialSchema = {
  data: {
    social_profiles: any[];
    current_page: number;
    total_pages: number;
    total: number;
  };
};
export type SocialverificationSchema = {
  socialVerificationId: number;
  type: string;
  userId: number;
  link: string;
};
