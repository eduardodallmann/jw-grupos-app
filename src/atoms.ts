import { atom } from "jotai";
import { groups } from "@jw-project/api";
import { unionBy, pullAllBy } from "lodash";

export const loadingAtom = atom(true);

export const groupsAtom = atom<groups.Group[]>([]);

export const loadAtom = atom(null, (get, set) => {
  set(loadingAtom, true);

  groups.snapshotGroup(
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        set(groupsAtom, (current) => {
          const changedDoc = change.doc.data();

          switch (change.type) {
            case "added":
              return unionBy([changedDoc], current, "id");

            case "modified":
              return unionBy([changedDoc], current, "id");

            default:
            case "removed": {
              const r = pullAllBy(current, [changedDoc], "id");
              console.log(r);

              return r;
            }
          }
        });
      });
      set(loadingAtom, false);
    },
    (e) => {
      console.log(e);
    }
  );
});

export const unloadAtom = atom(null, (get, set) => {
  groups.unsubscribe();
});
