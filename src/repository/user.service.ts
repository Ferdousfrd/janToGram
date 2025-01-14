import { db } from "@/firebaseConfig";
import { ProfileResponse, UserProfile } from "@/types";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

// creating new collection of users 
const COLLECTION_NAME = "users"

// func to create user profile in our collection
export const createUserProfile = (user: UserProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user)
    } catch (error) {
        console.log(error)
    }
}

// func to get the users data from collection in db
export const getUserProfile = async (userId: string) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId))
        const querySnapshot = await getDocs(q)
        let tempData: ProfileResponse = {}
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserProfile
                tempData = {
                    id: doc.id,
                    ...userData
                }
            })
            return tempData
        }
        else {
            console.log("No such doc")
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

// func to update user data in collection
export const updateUserProfile = (id: string, user: UserProfile) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return updateDoc(docRef, {
        ...user
    })
}

// getting all the users from firebase excpet the current logged in user
export const getAllUsers = async (userId: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
        const tempArr: ProfileResponse[] = []
        if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserProfile
                const responseObj: ProfileResponse = {
                    id: doc.id,
                    ...userData
                }
                tempArr.push(responseObj)
            })
            return tempArr.filter(item => item.userId != userId)  // excludes the current user obj
        }
        else {
            console.log("no user profile to fetch")
        }
    }
    catch (error) {
        console.log(error)
    }
}