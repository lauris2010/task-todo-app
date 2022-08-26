import { newRef, db } from "../../../firebase/todoApp";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";

export default async (req, res) => {
  const { id } = req.query;

  try {
    if (req.method === 'PUT') {
      const todoToUpdateRef = doc(db, "todos", id);

      await updateDoc(todoToUpdateRef, {
        ...req.body,
      });

      const updatedDoc = await getDoc(todoToUpdateRef)

      res.status(200).json({
        id: updatedDoc.id,
        data: updatedDoc.data()
      });
    } else if (req.method === 'DELETE') {
      const todoToDeleteRef = doc(db, "todos", id);
      
      await deleteDoc(todoToDeleteRef);
      
      res.status(200).json({
        id,
        deleted: true
      });
    }
    res.status(200).end();
  } catch (ex) {
    res.status(400).json(ex).end();
  }
}