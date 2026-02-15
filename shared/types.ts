export type UserRole = "buyer" | "seller" | "partner";

export interface RegistrationPayload {
  companyName: string;
  role: UserRole;
}

export interface AiPromptRequest {
  prompt: string;
}

export interface RankedProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price_cents: number;
  currency: string;
  images: string[];
  rank: number;
}

export interface AiPromptResponse {
  prompt: string;
  products: RankedProduct[];
  mode?: "prototype" | "real";
  model?: string | null;
  fallback_used?: boolean;
}
