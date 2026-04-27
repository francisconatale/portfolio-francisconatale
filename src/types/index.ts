export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  tags: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 1-100
  yearsOfExperience: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  timestamp: any; // Firestore Timestamp
}
