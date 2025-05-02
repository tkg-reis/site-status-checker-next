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
import { useRouter } from "next/navigation";
 
// zodの復習
const formSchema = z.object({
    username : z
        .string()
        .trim()
        .min(3, {
            message : "ユーザー名は3文字以上10文字以下にしてください.。"
        })
        .max(10),
    email: z
        .string()
        .trim()
        .email({ 
        message: "メールアドレスが無効です。"
        }),
    password: z
        .string()
        .trim()
        .min(8, {
        message: "パスワードは8文字以上20文字以下にしてください",
        })
        .max(20),
}).required();

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username : "",
      email: "",
      password: ""
    },
  });
  
  const router = useRouter();

  async function onRegister(values: z.infer<typeof formSchema>) : Promise<void> {
    try {
        const res = await fetch('/api/register', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(values)
        })
        
        if(!res.ok) {
          const error = res.json();
          alert(`register failed ${error}`);
          return;
        } 
        else {
          alert('register successful');
          router.push('/login');
        }    
      } catch (error) {
        alert(`register failed ${error}`);
        return;
      }
  }


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onRegister)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>you input username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>you input password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  );
};

export default Register;
