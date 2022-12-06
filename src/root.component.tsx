import { useEffect } from "react";
import { types } from "@jw-project/api";
import { loadAtom, unloadAtom, groupsAtom } from "./atoms";
import { useSetAtom } from "jotai";
import { Table } from "./components/table";
import { Form } from "./components/form";

export default function Root(props: types.ApplicationCustomProps) {
  const load = useSetAtom(loadAtom);
  const unload = useSetAtom(unloadAtom);

  useEffect(() => {
    load();
    return () => {
      unload();
    };
  }, []);

  return (
    <>
      <Form></Form>
      <Table></Table>
    </>
  );
}
