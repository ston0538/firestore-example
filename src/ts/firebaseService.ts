import { db } from "../config/firebaseConfig";
import firebase from "firebase/app";

interface IFirebaseService {
  getDatas: (
    callback: (
      changes: firebase.firestore.DocumentChange<firebase.firestore.DocumentData>[]
    ) => void
  ) => any;
  createData: ({ data }: any) => Promise<any>;
  deleteData: (id: string) => void;
}

export default function fireBaseService(collection: string): IFirebaseService {
  const getDatas = (
    callback: (
      changes: firebase.firestore.DocumentChange<firebase.firestore.DocumentData>[]
    ) => void
  ) => {
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
