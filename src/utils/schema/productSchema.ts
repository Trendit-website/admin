export type productType = {
  data: {
    current_page: number;
    products: [
      {
        categories: [];
        description: string;
        images: string[];
        name: string;
        original_price: string;
        price: string;
        is_approved: boolean;
        product_id: number;
      },
    ];
    total: number;
    total_pages: number;
  };
};
export type detailsType = {
  data: {
    product: {
      categories: [];
      description: string;
      images: string[];
      name: string;
      original_price: number;
      price: number;
      product_id: number;
      location: string;
      created_at: string;
      seller: {
        firstname: string;
        lastname: string;
        profile_picture: string;
        phone_number: string;
      };
    };
  };
};
export type reviewType = {
  comment: string;
  status: string;
};
