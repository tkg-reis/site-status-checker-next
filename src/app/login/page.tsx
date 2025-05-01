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
import { useRouter } from "next/router";

// zodの復習
const formSchema = z.object({
  email: z
    .string()
    .email({ 
      message: "メールアドレスが無効です。"
    }),
  password: z
    .string()
    .min(8, {
      message: "パスワードは8文字以上20文字以下にしてください",
    })
    .max(20),
}).required();

const Login = () => {

  const router = useRouter();
  // RFFの復習
  // shdcn/uiの復習
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onLogin = async(values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
          const res = await fetch('/api/login', {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            }
          })

          if(!res.ok) {
            const error = await res.json();
            alert(`register failed ${error.message}`);
            return;
          } else {
            alert('register successful');
            router.push('/');
          }    
        } catch (error) {
          alert(`register failed ${error}`);
          return;
        }
  }


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormDescription>you input email adress.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>you input password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </>
  );
};

export default Login;
