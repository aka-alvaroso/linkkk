const getIPData = async () => {
  const response = await fetch(
    "https://pro.ip-api.com/json/?key=" + import.meta.env.VITE_IP_API_KEY
  );

  const data = await response.json();

  return { ip: data.query, country: data.countryCode };
};

const getVPN = async ({ ip }) => {
  const response = await fetch(
    "https://pro.ip-api.com/json/" +
      ip +
      "?fields=66846719&key=" +
      import.meta.env.VITE_IP_API_KEY
  );

  const data = await response.json();
  return {
    proxy: data.proxy,
    hosting: data.hosting,
  };
};

export { getIPData, getVPN };
