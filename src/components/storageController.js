import {
    getFirestore,
    collection,
    setDoc,
    doc,
    getDoc,
} from 'firebase/firestore';

export async function getCharacters() {
   try {
    const characterRef = doc(getFirestore(), 'Characters', 'goal');
    const characterSnap = await getDoc(characterRef);
    if (characterSnap.exists()) {
        const characterData = characterSnap.data().mainCharacters;
        return characterData;
    } else {
        console.log("Error: cannot retrieve characters");
    }
   } catch(error) {
    console.error('Error loading shopping cart database', error);
   }
}