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

export async function retrieveScores() {
    try {
        const scoreRef = doc(getFirestore(), 'highscore', 'highscore');
        const scoreSnap = await getDoc(scoreRef);
        if (scoreSnap.exists()) {
            const scoreData = scoreSnap.data().scores;
            return scoreData;
        } else {
            console.error("Error: cannot retrieve scores");
        }
       } catch(error) {
        console.error('Error loading high scores', error);
       }
}

export async function setHighScore(name, score) {
    let highScores = await retrieveScores();
    console.log("name: ", name, "score: ", score);
    console.log('highscores', highScores)
    const newScoreObject = {
        name: name,
        score: score,
    }
    console.log("newScoreObject", newScoreObject);
    if (highScores){
        highScores.push(newScoreObject);
        highScores.sort((a, b) => {
            console.log('a:', a.name, a.score, 'b: ', b.name, b.score);
            if (a.score < b.score) {
                return -1
            }
            return 1
        });
        highScores.pop();
        highScores.forEach(score => console.log(score.name, score.score));
        try {
            const scoreRef = collection(getFirestore(), 'highscore');
            await setDoc(doc(scoreRef, 'highscore'), {
                scores: highScores,
            });
        }
        catch(error) {
          console.error('Error saving high score', error);
        }
    }
}