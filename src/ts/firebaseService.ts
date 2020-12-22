import { db } from "../config/firebaseConfig";

interface IFirebaseService {
  getDatas: () => Promise<any>;
  create: ({ data }: any) => Promise<any>;
}

export default function fireBaseService(collection: string): IFirebaseService {
  const getDatas = () => {
    return new Promise((resolve, reject) => {
      db.collection(collection)
        .get()
        .then((snapshot: any) => {
          const data = snapshot.docs.map((item: any) => item.data());
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const create = ({ ...data }: any) => {
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

  return Object.freeze({
    getDatas,
    create,
  });
}
