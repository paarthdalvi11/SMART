export interface Requirement {
  id: number;
  text: string;
  type: "Functional" | "Non-Functional";
  priority: "Must" | "Should" | "Could" | "Won't";
  status: "Clear" | "Unclear";
  issue?: string;
} 