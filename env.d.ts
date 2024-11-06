declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production";
      MONGO_URL: string;
      JWT_SECMEDI: string;
      MEDISAT_EMAIL:string
      MEDISAT_PASSWORD:string
      Next_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_BASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
    }
  } 
}

export {};
