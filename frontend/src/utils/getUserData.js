const getIP = async () => {
  const response = await fetch(
    "https://ipinfo.io?token=" + import.meta.env.VITE_IPInfoToken
  );

  const data = await response.json();
  return data.ip;
};

const getVPN = async ({ ip }) => {
  const response = await fetch(
    `https://ipinfo.io/${ip}?token=${import.meta.env.VITE_IPInfoToken}`
  );

  const data = await response.json();
  return data.vpn;
};

export { getIP };
