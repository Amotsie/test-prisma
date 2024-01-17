'use client'
import LoginForm from "./components/LoginForm";

async function getWineList() {
  const list = await prisma.wine.findMany();
  return list;
}

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 bt-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white text-center">Login</h1>
      <LoginForm />
    </div>
  )
}
