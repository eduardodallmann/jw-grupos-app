import { zodResolver } from "@hookform/resolvers/zod";
import { groups } from "@jw-project/api";
import { Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Form = () => {
  const saved = useRef(false);

  const schema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Required" }),
    overseer: z.number().min(10),
  });

  const {
    register,
    watch,
    formState: { errors, isValidating, isValid },
  } = useForm<groups.Group>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const data = watch();

  useEffect(() => {
    saved.current = false;
    if (isValid && !isValidating && !saved.current) {
      saved.current = true;
      groups.saveGroup(data);
    }
  }, [data, isValid, isValidating]);

  return (
    <Paper>
      <form>
        <input {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
        <input
          type="number"
          {...register("overseer", { valueAsNumber: true })}
        />
        {errors.overseer?.message && <p>{errors.overseer?.message}</p>}
        <input type="submit" />
      </form>
    </Paper>
  );
};
