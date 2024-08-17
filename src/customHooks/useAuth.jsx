import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);

                // Admin olub-olmadığını yoxlayırıq
                if (user.email === "vusal.osmanov66@gmail.com") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);

                    // "users" kolleksiyasına istifadəçini əlavə edirik
                    const userRef = doc(db, 'users', user.uid);
                    await setDoc(userRef, {
                        email: user.email,
                        uid: user.uid,
                    });
                }
            } else {
                setCurrentUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return {
        currentUser,
        isAdmin,
        loading,
    };
};

export default useAuth;
