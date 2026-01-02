"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  company_name: z
    .string()
    .min(1, {
      message: "会社名は1文字以上50文字以下にしてください",
    })
    .max(20),
  url: z
    .string()
    .url({
      message : "有効なURLを入力してください"
    })
    .min(10, {
      message: "URLは10文字以上50文字以下にしてください",
    })
    .max(50),
  execution_time : z
    .string()
}).required();

const Insert = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
          const res = await fetch('/api/insert', {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(values)
          });

          if(!res.ok) {
            alert(`insert failed`);
            return;
          } else {
            alert('insert successful');
            router.push('/');
            return;
          }    
        } catch (error) {
          alert(`insert failed ${error}`);
          return;
        }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>url</FormLabel>
                <FormControl>
                  <Input placeholder="https://amazon.com" {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <SelectItem value="6">12時間ごとにhttpリクエスト</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can select http request time
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default Insert;
