import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UnauthorizedRedirect = () => {
    const router = useRouter();

    // console.log('redirecting')
  
    // Perform redirection when the component is rendered
    useEffect(() => {
      router.push("/"); // Replace "/" with the desired URL you want to redirect to
    }, []);
  
    // This component doesn't render anything since it redirects immediately
    return null;
  };