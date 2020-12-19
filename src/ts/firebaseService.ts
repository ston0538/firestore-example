import { db } from "../config/firebaseConfig";

interface IFirebaseService {
  getDatas: () => Promise<any>;
}

export default function fireBaseService(collection: string): IFirebaseService {
  const getDatas = () => {
    return new Promise((resolve, reject) => {
      db.collection(collection)
        .get()
        .then((snapshot: any) => {
          const data = snapshot.docs.map((item: any) => item.data());
          resolve(data);
        });
    });
  };

  return Object.freeze({
    getDatas,
  });
}
