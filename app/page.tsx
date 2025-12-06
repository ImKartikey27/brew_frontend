import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-200">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
        <div className="space-y-8 animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50 leading-tight">
              Task Management System
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Project setup complete and ready for development
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Structure</CardTitle>
                <CardDescription>Organized folder layout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✓ /app - Next.js App Router pages</p>
                <p>✓ /components - UI and feature components</p>
                <p>✓ /lib - API client, hooks, validations</p>
                <p>✓ /types - TypeScript type definitions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tech Stack</CardTitle>
                <CardDescription>Configured and ready</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✓ Next.js 16 with App Router</p>
                <p>✓ Tailwind CSS 4 with slate theme</p>
                <p>✓ Shadcn/UI components</p>
                <p>✓ React Query, React Hook Form, Zod</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Components Installed</CardTitle>
                <CardDescription>Shadcn/UI UI library</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <span>Button</span>
                  <span>Input</span>
                  <span>Label</span>
                  <span>Card</span>
                  <span>Badge</span>
                  <span>Dialog</span>
                  <span>Dropdown Menu</span>
                  <span>Select</span>
                  <span>Form</span>
                  <span>Skeleton</span>
                  <span>Toast (Sonner)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Configuration</CardTitle>
                <CardDescription>All set up</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✓ TypeScript strict mode enabled</p>
                <p>✓ Axios API client with credentials</p>
                <p>✓ React Query provider configured</p>
                <p>✓ Zod validation schemas created</p>
                <p>✓ API base URL: http://localhost:4000/api/v1</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/login" className="flex">
              <Button className="w-full sm:w-auto">Go to Login</Button>
            </Link>
            <Link href="/register" className="flex">
              <Button variant="outline" className="w-full sm:w-auto">Go to Register</Button>
            </Link>
            <Link href="/dashboard" className="flex">
              <Button variant="secondary" className="w-full sm:w-auto">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
