'use client';

import { AuthFormSplitScreen } from "@/components/auth-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  return (
    <AuthFormSplitScreen
      logo={<h1 className="text-2xl font-bold tracking-tight">Senyas.IO</h1>}
      title="Welcome back!"
      description="Access your account and continue your journey with us"
      imageSrc="https://images.unsplash.com/photo-1549490349-8643362247b0?q=80&w=2000&auto=format&fit=crop"
      imageAlt="Empowering communication"
      onSubmit={async (data: LoginFormData) => {
        console.log("Login attempt:", data);
      }}
      forgotPasswordHref="/forgot-password"
      createAccountHref="/signup"
    />
  );
}