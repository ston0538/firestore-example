import { db } from "../config/firebaseConfig";
import firebase from "firebase/app";

export type callback = (
  changes: firebase.firestore.DocumentChange<firebase.firestore.DocumentData>[],
  empty: boolean
) => void;

interface IFirebaseService {
  getDatas: (callback: callback, limit?: number) => void;
  createData: ({ data }: any) => Promise<any>;
  deleteData: (id: string) => void;
}
interface ICafe {
  city: string;
  name: string;
  createdAt: string;
}

export default function fireBaseService(collection: string): IFirebaseService {
  let lastVisible: any = null;
  const getDatas = (callback: callback, limit?: number) => {
    return db
      .collection(collection)
      .orderBy("createdAt")
      .startAfter(lastVisible)
      .limit(limit)
      .onSnapshot((snapshot) => {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
        let changes = snapshot.docChanges();
        const empty = snapshot.empty;
        callback(changes, empty);
      });
  };
  const createData = ({ ...data }: ICafe) => {
    return new Promise((resolve, reject) => {
      const { city, name, createdAt }: ICafe = data;
      db.collection(collection)
        .add({
          city,
          name,
          createdAt,
        })
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
