interface Image {
  url?: string;
  width?: string;
  height?: string;
  type?: string;
}

export interface APIOutput {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

export interface OGOutput {
  meta: {
    description?: string;
    title?: string;
  };
  og: {
    image?: Image;
    description?: string;
    title?: string;
    site_name?: string;
    type?: string;
    url?: string;
    video?: string;
  };
  twitter?: {
    site?: string;
    creator?: string;
    image?: string;
  };
}
