import { doc, setDoc, getDocs, query, where, collection } from 'firebase/firestore';
import { db } from './config';

const adminEmail = "vusal.osmanov66@gmail.com";

export const addAdmin = async (email) => {
    try {
        const adminDocRef = doc(db, 'admins', email);
        await setDoc(adminDocRef, { email: email });
        // console.log(`Admin added: ${email}`);
    } catch (error) {
        console.error("Error adding admin: ", error);
    }
};

// İstifadəçi kolleksiyasına istifadəçi əlavə edən funksiya
export const addUser = async (email) => {
    try {
        // Əgər istifadəçi artıq adminlər kolleksiyasında varsa, istifadəçi olaraq əlavə etmə
        const adminQuery = query(collection(db, 'admins'), where('email', '==', email));
        const querySnapshot = await getDocs(adminQuery);

        if (querySnapshot.empty) {
            // Adminlər kolleksiyasında tapılmadısa, istifadəçilər kolleksiyasına əlavə edin
            const userDocRef = doc(db, 'users', email);
            await setDoc(userDocRef, { email: email });
            // console.log('User added: ' + email);
        } else {
            // console.log('User is an admin: ' + email);
        }
    } catch (error) {
        console.error("Error adding user: ", error);
    }
};

// Admin e-poçtunu bir dəfə çağırın
// Bu sətri istifadə etməyi düşünə bilərsiniz, admin yalnız bir dəfə əlavə olunur
addAdmin(adminEmail); 
