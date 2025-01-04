import { db } from "@/firebaseConfig";
import { DocumentResponse, Post } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = "posts"

// storing posts in db
export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post)
}

// getting posts from db
export const getPosts = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"))
        const querySnapshot = await getDocs(q)
        const tempArr: DocumentResponse[] = []

        if (querySnapshot.size > 0) {
            querySnapshot.forEach(doc => {
                const data = doc.data() as Post
                const responseObj: DocumentResponse = {
                    id: doc.id,
                    ...data,
                }
                tempArr.push(responseObj)
            })
            return tempArr
        } else {
            console.log("No such doc")
        }
    } catch (error) {
        console.log(error)
    }
}

// get post only for the logged in user
export const getPostByUserId = (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id))
    return getDocs(q)
}

// get single post
export const getPost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return getDoc(docRef)
}

// delete a post
export const deletePost = (id: string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id))
}

export const updateLikesOnPost = (id: string, userLikes: string[], likes: number) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return updateDoc(docRef, {
        likes: likes,
        userLikes: userLikes
    })
}