import { db } from '../CloudStorageConnector/firebase';
import { collection, getDocs, doc, setDoc} from 'firebase/firestore';
// import { Storage } from '@google-cloud/storage';



function extractPHQ9Questions(questionnaire) {
    let questions = [];
    if (questionnaire.item && Array.isArray(questionnaire.item)) {
        questionnaire.item.forEach(groupItem => {
            if (groupItem.item && Array.isArray(groupItem.item)) {
                groupItem.item.forEach(questionItem => {
                    if (questionItem.text) {
                        questions.push({linkId: questionItem.linkId, text: questionItem.text});
                    }
                });
            }
        });
    }
    return questions;
}

function extractPHQ9ValueOptions(questionnaire) {
    let valueSetOptions = [];
    // Check if the 'contained' property exists and is an array
    if (questionnaire.contained && Array.isArray(questionnaire.contained)) {
        questionnaire.contained.forEach(valueSet => {
            // Check if the 'compose' and 'include' properties exist
            if (valueSet.compose && valueSet.compose.include && Array.isArray(valueSet.compose.include)) {
                valueSet.compose.include.forEach(include => {
                    // Check if the 'concept' property exists and is an array
                    if (include.concept && Array.isArray(include.concept)) {
                        include.concept.forEach(concept => {
                            // Extract the 'valueDecimal' and 'display' properties
                            if (concept.extension && Array.isArray(concept.extension)) {
                                concept.extension.forEach(ext => {
                                    if (ext.url === "http://hl7.org/fhir/StructureDefinition/ordinalValue") {
                                        valueSetOptions.push({ 
                                            valueDecimal: ext.valueDecimal, 
                                            display: concept.display 
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    return valueSetOptions;
}

export function extractPHQ9JSON(questionnaireJSON) {
    const questionOptions = extractPHQ9Questions(questionnaireJSON);
    const answerOptions = extractPHQ9ValueOptions(questionnaireJSON);
    return {questionOptions: questionOptions, answerOptions: answerOptions};
}

// Example usage
const questionnaire = {/* ... your JSON data ... */};







//// unused functions for moving file from GCS to Firestore
// const storage = new Storage();
// const bucketName = 'spezi-dashboard-development.appspot.com';
// const filename = 'PHQ-9.json';

// async function readFileFromGCS() {
//     const contents = await storage.bucket(bucketName).file(filename).download();
//     return JSON.parse(contents.toString('utf-8'));
// }


// async function uploadToFirestore(data) {
//     // Specify your collection and document
//     const collectionPath = 'questionnaires';
//     const documentPath = 'PHQ9';
//     // Creating a reference to the document
//     const docRef = doc(db, collectionPath, documentPath);
//     // Setting the data
//     await setDoc(docRef, data);
//     console.log('Data uploaded to Firestore');
// }

// export async function transferGCSDataToFirestore() {
//     try {
//         const jsonData = await readFileFromGCS();
//         await uploadToFirestore(jsonData);
//     } catch (error) {
//         console.error('Error transferring data:', error);
//     }
// }



