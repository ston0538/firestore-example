import { db } from "../config/firebaseConfig";

db.collection("cafes")
  .get()
  .then((snapshot: any) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });
