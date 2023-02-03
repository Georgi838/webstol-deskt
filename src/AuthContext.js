import React, {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import app, {auth} from "./custom/firebase"

const db = getFirestore(app);
const dbUsersUIDcollection = collection(db, "usersUID");
const dbInfoCollection = collection(db, "dbInfo");

const AuthContext = createContext();


export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

const navigate = useNavigate();
const [currentUser, setCurrentUser] = useState();
const [loading, setLoading] = useState(false);
const [_TIME, set_TIME] = useState();

function userSighIn (email, password){
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password).then(u => console.log("LogIn")).catch(err =>{
        setLoading(false);
        alert("Грешен имейл или парола!");
    });
}

function userSingOut () {
    auth.signOut(auth).then(() =>{
        console.log("SignOut")
        navigate("/");
        window.location.reload();
    }).catch(err => {
        setLoading(false);
    });
}

useEffect(() =>{

    const docRef = doc(dbInfoCollection, "time");
    getDoc(docRef).then(res =>{
      set_TIME(res.data().dayToday.toDate().getDay());
    }).catch(err => console.log(err));



    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
            setLoading(true);
            const docRef = doc(dbUsersUIDcollection, user.uid);

            getDoc(docRef).then(res =>{
                if(res.data().role === "administrator"){
                    setLoading(false);
                    setCurrentUser(user);
                    navigate("mainPage");
                }else{
                    setLoading(false);
                    alert("Грешен имейл или парола!");
                    userSingOut();
                }
            })
        }
    })

    return unsubscribe;
    
},[])

const value = {
    currentUser,
    userSighIn,
    userSingOut,
    loading,
    _TIME,
}

  return (
    <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
    
  )
}
