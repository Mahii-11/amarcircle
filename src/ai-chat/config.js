/*
  The only file you need to edit when you drop this folder into another website.
  Set VITE_AI_CHAT_API_URL in that site's .env, or change the fallback below.
*/
export const AI_CHAT_API_URL =
  import.meta.env?.VITE_AI_CHAT_API_URL ||
  "https://api.banglatechsolution.com.bd/api";
