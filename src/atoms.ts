import { atom } from "jotai";
import { groups } from "@jw-project/api";

export const loadingAtom = atom(true);

export const groupsAtom = atom<groups.Group[]>([]);

export const loadAtom = atom(null, (get, set) => {
  groups.snapshotGroup((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
  });
});

export const unloadAtom = atom(null, (get, set) => {
  groups.unsubscribe();
});
