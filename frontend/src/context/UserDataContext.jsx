import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useFetchUserData } from "../hooks/useFetchUserData";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { isLoggedIn, isGuestSession, authChecked } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchUserLinks, fetchUserGroups, fetchUserTags, fetchUserCountries } =
    useFetchUserData();

  useEffect(() => {
    if (!authChecked) return;

    const load = async () => {
      if (isLoggedIn || isGuestSession) {
        try {
          const links = await fetchUserLinks();
          const countries = await fetchUserCountries();
          if (!isGuestSession) {
            const groups = await fetchUserGroups();
            const tags = await fetchUserTags();
            setUserData({ links, groups, tags, countries });
          } else {
            setUserData({ links, groups: [], tags: [], countries });
          }
        } catch (e) {
          console.error("Error cargando datos del usuario", e);
        }
      }

      setLoading(false);
    };

    load();
  }, [authChecked, isLoggedIn, isGuestSession]);

  const refreshUserData = async ({
    onlyLinks = false,
    onlyGroups = false,
    onlyTags = false,
    onlyCountries = false,
  } = {}) => {
    try {
      const newData = { ...userData };

      if (onlyLinks) {
        // console.log("Only links");
        newData.links = await fetchUserLinks();
      }

      if (onlyGroups) {
        // console.log("Only groups");
        newData.groups = await fetchUserGroups();
      }

      if (onlyTags) {
        // console.log("Only tags");
        newData.tags = await fetchUserTags();
      }

      if (onlyCountries) {
        // console.log("Only countries");
        newData.countries = await fetchUserCountries();
      }

      if (!onlyLinks && !onlyGroups && !onlyTags && !onlyCountries) {
        // console.log("All data");
        newData.links = await fetchUserLinks();
        newData.groups = await fetchUserGroups();
        newData.tags = await fetchUserTags();
        newData.countries = await fetchUserCountries();
      }

      setUserData(newData);
    } catch (e) {
      console.error("Error actualizando datos del usuario:", e);
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        loading,
        refreshUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
