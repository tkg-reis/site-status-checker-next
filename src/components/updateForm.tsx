"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerUrlType } from "@/app/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    id : z
    .number(),
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

const UpdateForm = ( { urlData } : { urlData : registerUrlType }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id : urlData.id,
      company_name : urlData.company_name,
      url: urlData.url,
      execution_time : urlData.execution_time
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        alert(`update failed`);
        return;
      } else {
        alert("update successful");
        return;
      }
    } catch (error) {
      alert(`insert failed ${error}`);
      return;
    }
  };
  return (
    <>
    <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">update</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>update url registered info</DialogTitle>
              <DialogDescription>
                You can update url registered info.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>url</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>you can input url.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>company name</FormLabel>
                      <FormControl>
                        <Input placeholder="amazon" {...field} />
                      </FormControl>
                      <FormDescription>you can input company name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="execution_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>execution time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a http request" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">15分ごとにhttpリクエスト</SelectItem>
                          <SelectItem value="2">30分ごとにhttpリクエスト</SelectItem>
                          <SelectItem value="3">1時間ごとにhttpリクエスト</SelectItem>
                          <SelectItem value="4">3時間ごとにhttpリクエスト</SelectItem>
                          <SelectItem value="5">6時間ごとにhttpリクエスト</SelectItem>
                          <SelectItem value="6">
                            12時間ごとにhttpリクエスト
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can select http request time
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Update</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
    </>
  );
};

export default UpdateForm;
