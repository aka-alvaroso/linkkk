export const useFetchUserData = () => {
  const fetchUserLinks = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}link/user/`, {
      credentials: "include",
    });

    const data = await res.json();
    return data.links;
  };

  const fetchUserGroups = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}group/user/`, {
      credentials: "include",
    });

    const data = await res.json();
    return data;
  };

  const fetchUserTags = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}tag/user/`, {
      credentials: "include",
    });

    const data = await res.json();
    return data;
  };

  const fetchUserCountries = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}countries/get`, {
      credentials: "include",
    });

    const data = await res.json();
    return data;
  };

  return {
    fetchUserLinks,
    fetchUserGroups,
    fetchUserTags,
    fetchUserCountries,
  };
};
