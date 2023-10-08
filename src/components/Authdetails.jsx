import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function Authdetails() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
            });

            return () => {
                listen();
            }

        }, []);

        function userSignOut() {
            signOut(auth).then(() => {
                console.log("sign out successfully");
            }).catch(error => console.log(error));
        }
        
    return (
        <div>
            {authUser ? <><p>{`Signed In as ${authUser.email}`}</p><button onClick={userSignOut}>Sign out</button></> : <p>Signed out</p>}
        </div>
    )
}