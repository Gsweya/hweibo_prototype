export type UserRole = "buyer" | "seller" | "partner";

export interface RegistrationPayload {
  companyName: string;
  role: UserRole;
}

export interface AiPromptRequest {
  prompt: string;
}

export interface AiPromptResponse {
  prompt: string;
  products: string[];
}
