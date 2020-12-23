import { db } from "../config/firebaseConfig";
import firebase from "firebase/app";

export type callback = (
  changes: firebase.firestore.DocumentChange<firebase.firestore.DocumentData>[]
) => void;

interface IFirebaseService {
  getDatas: (callback: callback) => void;
  createData: ({ data }: any) => Promise<any>;
  deleteData: (id: string) => void;
}

export default function fireBaseService(collection: string): IFirebaseService {
  const getDatas = (callback: callback) => {
    db.collection(collection)
      .orderBy("city")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        callback(changes);
      });
  };
  const createData = ({ ...data }: any) => {
    return new Promise((resolve, reject) => {
      db.collection(collection)
        .add(data)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
  const deleteData = (id: string) => {
    db.collection(collection).doc(id).delete();
  };

  return Object.freeze({
    getDatas,
    createData,
    deleteData,
  });
}
