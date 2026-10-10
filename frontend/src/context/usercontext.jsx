import { useEffect, useState } from 'react';
import axios from 'axios';
import DataContext from "./DataContext.jsx";

function Usercontext({ children }) {
  const serverurl = "http://localhost:8000";
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    axios.get(`${serverurl}/api/me`, { withCredentials: true })
      .then((response) => {
        if (isMounted) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        if (isMounted && error.response?.status !== 401) {
          console.error("Unable to restore user session:", error);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [serverurl]);

  const value = { serverurl, user, setUser, isAuthLoading };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export default Usercontext;