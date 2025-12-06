
export interface HabitPair {
  id: number;
  dont: string;
  dontDesc: string;
  do: string;
  doDesc: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface MoodEntry {
  date: string;
  mood: 'senang' | 'normal' | 'cemas' | 'stres' | 'sedih';
  note: string;
}

export interface Comment {
  id: number;
  user: string;
  content: string;
  time: string;
}

export interface ForumPost {
  id: number;
  user: string;
  content: string;
  likes: number;
  time: string;
  tag: string;
  comments: Comment[];
}

export interface RelaxationItem {
  id: number;
  title: string;
  type: 'audio' | 'video' | 'guide';
  duration: string;
  category: 'breathing' | 'meditation' | 'music';
  description: string;
}
