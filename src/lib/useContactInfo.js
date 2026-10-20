import { useEffect, useState } from "react";
import { getContactInfoData } from "../services/api";

// Header and Footer both need this; share one request.
let request = null;

const loadContactInfo = () => {
  if (!request) {
    request = getContactInfoData()
      .then((res) => (Array.isArray(res) ? res[0] : res?.data?.[0] ?? res) || null)
      .catch((error) => {
        request = null; // allow a retry on the next mount
        console.error("Error fetching contact info:", error);
        return null;
      });
  }
  return request;
};

export default function useContactInfo() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let active = true;
    loadContactInfo().then((data) => active && setInfo(data));
    return () => {
      active = false;
    };
  }, []);

  return info;
}
