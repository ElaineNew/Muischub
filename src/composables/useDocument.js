import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async() => {
        isPending.value = true
        error.value = null
        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message);
            isPending.value = false
            error.value = 'could not delete the document'
        }
    }

    const updateDoc = async(updates) => {
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.update(updates)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message);
            isPending.value = false
            error.value = 'could not update the document'
        }
    }
    const addComment = async(comments) => {
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.update(comments)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message);
            isPending.value = false
            error.value = 'could not leave the comment'
        }

    }

    return { error, isPending, deleteDoc, updateDoc, addComment }
}


export default useDocument