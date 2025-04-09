// Api/api.js
const API_CONFIG = {
  baseUrl: "https://sugarytestapi.azurewebsites.net/",
  endpoints: {
    list: "TestApi/GetComplains",
    save: "TestApi/SaveComplain",
  },
};

export const fetchComplaints = async () => {
  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.list}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch complaints: ${response.status}`);
  }

  return await response.json();
};

export const saveComplaint = async (formData) => {
  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.save}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: formData.title,
        Body: formData.body,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.Success) {
    throw new Error(data.Message || "Failed to save complaint.");
  }

  return data;
};
