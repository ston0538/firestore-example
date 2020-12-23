import { db } from "../config/firebaseConfig";

interface IFirebaseService {
  getDatas: () => Promise<any>;
  createData: ({ data }: any) => Promise<any>;
  deleteData: (id: string) => void;
}

export default function fireBaseService(collection: string): IFirebaseService {
  const getDatas = () => {
    return new Promise((resolve, reject) => {
      db.collection(collection)
        .get()
        .then((snapshot: any) => {
          const data = snapshot.docs.map((item: any) => item);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
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
