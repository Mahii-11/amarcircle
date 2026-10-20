import { AI_CHAT_API_URL } from "../config";

// Minimal self-contained fetch helper (no cache: chat data is always live).
// raw: true  -> return the full JSON body
// otherwise  -> unwrap `data` (single object, or array for lists)
export const fetchData = async (endpoint, options = {}, isSingle = false) => {
  const { method = "GET", body, headers = {}, raw = false } = options;

  const res = await fetch(`${AI_CHAT_API_URL}${endpoint}`, {
    method,
    headers: body ? { "Content-Type": "application/json", ...headers } : { ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = "Something went wrong";
    try {
      const errorData = await res.json();
      message = errorData?.message || errorData?.error || message;
    } catch (e) {
      console.error("Error parsing error response:", e);
    }
    throw new Error(message);
  }

  const json = await res.json();
  if (raw) return json;

  const data = json?.data?.data !== undefined ? json.data.data : json?.data !== undefined ? json.data : json;
  if (isSingle) return Array.isArray(data) ? data[0] || null : data;
  return Array.isArray(data) ? data : data ? [data] : [];
};

export const sendAIChatMessage = (data) =>
  fetchData("/ai-chat/send", { method: "POST", body: data }, true);

export const getAIChatHistory = (sessionId) =>
  fetchData(`/ai-chat/history?session_id=${sessionId}`);

export const confirmAIChatOrder = (data) =>
  fetchData("/ai-chat/order/confirm", { method: "POST", body: data }, true);

export const cancelAIChatOrder = (data) =>
  fetchData("/ai-chat/order/cancel", { method: "POST", body: data }, true);
