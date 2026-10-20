const BASE_URL = "https://apicircle.bdtechdemo.online/api";

// 🔹 Normalize data (main magic)
const normalizeData = (res) => {
  if (res?.data?.data) return res.data.data;
  if (res?.data) return res.data;
  return res;
};

// 🔹 Handle error nicely
const handleError = async (res) => {
  let message = "Something went wrong";

  try {
    const errorData = await res.json();
    message = errorData?.message || message;
  } catch (e) {
     console.error("Error parsing error response:", e);
  }

  throw new Error(message);
};

// 🔹 Main fetch function
export const fetchData = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {}, raw = false } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    await handleError(res);
  }

  const json = await res.json();

  return raw ? json : normalizeData(json);
};



export const getPackageData = () => fetchData("/package-data");
export const getCommunityData = () => fetchData("/community-data");
export const getFaqData = () => fetchData("/faq-list");
export const getHeroData = () => fetchData("/home-hero-section-data");
export const getAboutUsData = () => fetchData("/about-us-data");
export const getWhyChooseData = () => fetchData("/why-choose-data");
export const getServiceData = () => fetchData("/service-data");
export const getOurStoryData = () => fetchData("/our-story-data");
export const getOurPurposeData = () => fetchData("/our-purpose-data");
export const getJoinCommunityData = () => fetchData("/join-community-data");
// public endpoint (contact-infos/index is the admin list and needs a login token)
export const getContactInfoData = () => fetchData("/contact-info-data");
export const getPageList = () => fetchData("/page-list");
export const getPageData = (slug) => fetchData(`/page-data/${encodeURIComponent(slug)}`);













// post api

export const storeContact = async (formData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/store-contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("Contact API Error:", error);
    throw error;
  }
};