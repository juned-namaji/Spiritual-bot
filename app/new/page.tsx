import { redirect } from 'next/navigation'

export const metadata = {
  title: 'New',
};

export default async function NewPage() {
  redirect('/')
}
