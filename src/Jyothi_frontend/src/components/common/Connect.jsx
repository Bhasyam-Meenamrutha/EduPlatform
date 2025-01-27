import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

export default function Connect() {
   const [principal, setPrincipal] = useState(null); // Store principal

   async function handleConnect() {
      const authClient = await AuthClient.create();
      authClient.login({
         maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
         identityProvider: "https://identity.ic0.app/#authorize",
         onSuccess: async () => {
            const identity = await authClient.getIdentity();
            const principal = identity.getPrincipal().toText(); // Extract principal as text
            setPrincipal(principal);
         },
      });
   }

   useEffect(() => {
      async function init() {
         const authClient = await AuthClient.create();
         if (await authClient.isAuthenticated()) {
            const identity = await authClient.getIdentity();
            const principal = identity.getPrincipal().toText(); // Extract principal as text
            setPrincipal(principal);
         }
      }
      init();
   }, []);

   async function handleLogout() {
    const authClient = await AuthClient.create();
    authClient.logout(); 
    setPrincipal("");
    clearGlobalPrincipal(); 
    navigate('/');
  }

   return (
      <>
         <div>
            {principal ? (
                <button onClick={handleLogout}>Disconnect</button>
            ) : (
                <button
                id="ConnectBtn"
                onClick={handleConnect}
                style={{
                   cursor: "pointer",
                   marginTop: "32px",
                }}
             >
                Connect
             </button>
            )}
         </div>

         <div>
            {principal ? (
               <p>Your Principal Identity: {principal}</p>
            ) : (
               <p>Please login to see your identity.</p>
            )}
         </div>
      </>
   );
}