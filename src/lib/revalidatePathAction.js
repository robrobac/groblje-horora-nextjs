'use server';
 
import { revalidatePath } from 'next/cache';
 
export default async function revalidatePathAction(path) {
  "use server"
  revalidatePath(path);
  console.log('path revalidated:', path)
}