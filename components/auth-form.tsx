"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.0, ease: "easeOut" } },
};

type AuthFormProps = {
  logo: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  forgotPasswordHref?: string;
  createAccountHref?: string;
};

export function AuthFormSplitScreen({ logo, title, description, imageSrc, imageAlt, onSubmit, forgotPasswordHref, createAccountHref }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<{ email: string; password: string }>({ 
    resolver: zodResolver(z.object({ email: z.string().email(), password: z.string().min(8) })), 
    defaultValues: { email: "", password: "" } 
  });

  const handleFormSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    await onSubmit(data);
    setIsLoading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col md:flex-row bg-background">
      <div className="flex w-full flex-col items-start justify-center p-12 md:w-1/2 md:pl-32">
        <motion.div className="w-full max-w-lg space-y-12" variants={containerVariants} initial="hidden" animate="visible">
          
          <motion.div variants={itemVariants} className="flex flex-col items-start text-left space-y-4">
            <div className="origin-left scale-[2.5] mb-12">
               <div className="font-black tracking-tighter text-[#ffb3c6] text-glow animate-text-breathe">
                {logo}
               </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white/90">{title}</h1>
            <p className="text-xl text-muted-foreground">{description}</p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                  <FormControl><Input placeholder="name@company.com" {...field} disabled={isLoading} className="h-16 text-lg bg-zinc-900 border-none" /></FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Password</FormLabel>
                  <FormControl><Input type="password" placeholder="••••••••" {...field} disabled={isLoading} className="h-16 text-lg bg-zinc-900 border-none" /></FormControl>
                </FormItem>
              )} />
              <Button type="submit" className="w-full h-16 text-xl font-bold bg-[#ffb3c6] text-black hover:bg-[#ffb3c6]/90">
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Continue
              </Button>
            </form>
          </Form>

          <motion.div variants={itemVariants} className="flex justify-center gap-4 py-2">
            <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
               <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.842,0.547,3.933,1.516l2.897-2.897C17.264,1.867,15.138,0.857,12.545,0.857C6.732,0.857,2.02,5.569,2.02,11.382s4.712,10.525,10.525,10.525c6.072,0,10.104-4.275,10.104-10.288c0-0.707-0.077-1.385-0.222-2.036L12.545,10.239z"/></svg>
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
               <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
               <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.98-2.14 1.72-3.66 1.72-1.48 0-2.45-.88-3.92-.88-1.54 0-2.58 1-3.95 1-1.39 0-2.58-1.12-3.56-2.56-1.89-2.79-2.61-6.89 1.15-9.45 1.05-.71 2.27-1.07 3.55-1.07 1.25 0 2.27.75 3.3.75 1.04 0 2.24-.76 3.65-.76 1.3 0 2.45.54 3.24 1.48-2.62 1.54-2.12 5.09.28 6.64-.32.65-.67 1.35-1.08 1.74zM12.44 6.88c.61-.71 1.02-1.7 1.02-2.72 0-.15-.02-.3-.04-.45-1.05.04-2.32.7-3.08 1.63-.57.69-1.03 1.72-.98 2.76 1.17.09 2.44-.65 3.08-1.22z"/></svg>
            </button>
          </motion.div>

          <Button asChild className="w-full h-16 text-xl font-bold animate-btn-breathe bg-[#ffb3c6] text-black hover:bg-[#ffb3c6]/90">
            <Link href="/lab">Continue as Guest</Link>
          </Button>
        </motion.div>
      </div>

      <div className="relative hidden w-1/2 md:block">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" /> 
      </div>
    </div>
  );
}