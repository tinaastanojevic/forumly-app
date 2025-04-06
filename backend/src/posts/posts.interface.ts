interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  userId: number;
  likes: number[];
  createdAt: Date;
  comments: Comment[];
  edited?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PostWithUser extends Post {
  username: string;
}

interface Comment {
  id: number;
  userId: number;
  text: string;
  createdAt: Date;
  username?: string;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PostToEdit {
  postId: number;
  userId: number;
  content: string;
}

