import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { monitors } from "@/app/types/types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    id : z
    .string(),
    company_name: z
      .string()
      .min(1, {
        message: "会社名は1文字以上50文字以下にしてください",
      })
      .max(20),
    url: z
      .string()
      .url({
        message: "有効なURLを入力してください",
      })
      .min(10, {
        message: "URLは10文字以上50文字以下にしてください",
      })
      .max(50),
    execution_time: z.string(),
  })
  .required();

const DeleteForm = ( { urlData } : { urlData : monitors }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      id : urlData.id,
      company_name : urlData.name,
      url: urlData.url,
      execution_time : urlData.execution_time
    },
  });

  const onSubmit = async (values : z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        alert(`delete failed`);
        return;
      } else {
        alert("delete successful");
        router.push("/");
        return;
      }
    } catch (error) {
      alert(`delete failed ${error}`);
      return;
    }
  };
  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input type="hidden" {...form.register("url")} />
          <input type="hidden" {...form.register("company_name")} />
          <input type="hidden" {...form.register("execution_time")} />
          <Button type="submit">Delete</Button>
        </form>
      </Form>
    </>
  );
};

export default DeleteForm;
