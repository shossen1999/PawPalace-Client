import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
const auth = getAuth(app);

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider;
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();
    //create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //update user
    const updateUser = (fullName, image) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: image
        })
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        return signOut(auth)
    }
    //observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user on observation', currentUser);
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [axiosPublic])
    const userInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleLogin,
        updateUser
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;