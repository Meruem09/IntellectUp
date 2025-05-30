import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const Main = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Clerk Token:", token); // COPY THIS
    };
    fetchToken();
  }, [getToken]);

  return <div className="text-white px-4">Main page</div>;
};

export default Main;
