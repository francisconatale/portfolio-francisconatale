import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  query, 
  orderBy, 
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import { Project, BlogPost, Skill, ContactMessage } from "@/types";

// Projects
export const getProjects = async (): Promise<Project[]> => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Project));
};

// Blog Posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const q = query(collection(db, "blog_posts"), orderBy("publishDate", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as BlogPost));
};

// Skills
export const getSkills = async (): Promise<Skill[]> => {
  const querySnapshot = await getDocs(collection(db, "skills"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Skill));
};

// Contact Messages
export const sendContactMessage = async (message: Omit<ContactMessage, 'id' | 'timestamp'>) => {
  return await addDoc(collection(db, "contact_messages"), {
    ...message,
    timestamp: Timestamp.now()
  });
};
