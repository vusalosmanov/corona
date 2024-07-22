import { useState } from 'react'
import { db } from '../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
const useGetData = (collectionName) => {

    const [data, setData] = useState([])
    const collectionRef = collection(db, collectionName)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            // Real time firestore data uptade //
            await onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            })

        }
        getData()
    }, []);

    return { data, loading };
}

export default useGetData