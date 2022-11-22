import { Input, MenuItem, Select, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { groups, congregation, types } from "@jw-project/api";
import { loadingAtom, loadAtom, unloadAtom, groupsAtom } from "./atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default function Root(props: types.ApplicationCustomProps) {
  const load = useSetAtom(loadAtom);
  const unload = useSetAtom(unloadAtom);
  const loading = useAtomValue(loadingAtom);
  const groupsList = useAtomValue(groupsAtom);

  useEffect(() => {
    // cx = new Api(firebaseLibApp, firebaseLibFirestore);
    // cx.getGroups();
    // const v = async () => {
    // console.log(  await groups.getGroups());
    // };
    // v();
    load();
    return () => {
      unload();
    };
  }, []);

  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    overseer: z.number().min(10),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValidating, isValid },
  } = useForm<groups.Group>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const data = watch();

  useEffect(() => {
    if (isValid && !isValidating) {
      console.log(data);
    }
  }, [data, isValid, isValidating]);

  const click = () => {
    // cx.setGroups();
  };

  return (
    <>
      lista de grupos:
      {loading && "carregando"}
      {!loading &&
        groupsList.map(({ name }) => {
          <div key={name}>x{name}</div>;
        })}
      {["a", "b", "c"].map((t) => {
        <div key={t}>x{t}</div>;
      })}
      <section>{props.name} is mounted!</section>
      <button onClick={click}>salvar</button>
      <form onSubmit={handleSubmit((d) => groups.saveGroup(d))}>
        <input {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
        <input
          type="number"
          {...register("overseer", { valueAsNumber: true })}
        />
        {errors.overseer?.message && <p>{errors.overseer?.message}</p>}
        <input type="submit" />
      </form>
    </>
  );
}
