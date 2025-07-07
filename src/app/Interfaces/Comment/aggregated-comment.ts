import { SimpleUserProfile } from '../Profile/simple-user-profile';

export interface AggregatedComment {
    commentId: string;
    postId: string;
    authorId: string;
    commentContent: string;
    mediaUrl?: string;
    createdAt: Date;
    isEdited: boolean;
    reactionsCount: number;
    isLiked: boolean;
    commentAuthor: SimpleUserProfile;
}

// Static mock data for comments
export const STATIC_COMMENTS: AggregatedComment[] = [
  {
    commentId: 'c1',
    postId: '1',
    authorId: 'user2',
    commentContent: 'Amazing photo! Looks so peaceful.',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:00:00Z'),
    isEdited: false,
    reactionsCount: 5,
    isLiked: false,
    commentAuthor: {
      userId: 'user2',
      displayName: 'Jane Smith',
      userName: 'janesmith',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user2'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c2',
    postId: '1',
    authorId: 'user3',
    commentContent: 'Wish I was there! 🌅',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-10T19:05:00Z'),
    isEdited: false,
    reactionsCount: 3,
    isLiked: true,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c3',
    postId: '2',
    authorId: 'user1',
    commentContent: 'That pizza looks delicious!',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-11T12:30:00Z'),
    isEdited: false,
    reactionsCount: 7,
    isLiked: false,
    commentAuthor: {
      userId: 'user1',
      displayName: 'John Doe',
      userName: 'johndoe',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user1'
    }
  },
  {
    commentId: 'c4',
    postId: '2',
    authorId: 'user5',
    commentContent: 'Recipe please! 😋',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-11T12:32:00Z'),
    isEdited: true,
    reactionsCount: 2,
    isLiked: false,
    commentAuthor: {
      userId: 'user5',
      displayName: 'Crazy Cat Lady',
      userName: 'catlover',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user5'
    }
  },
  {
    commentId: 'c5',
    postId: '3',
    authorId: 'user6',
    commentContent: 'Great video, very informative!',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-11T16:00:00Z'),
    isEdited: false,
    reactionsCount: 10,
    isLiked: true,
    commentAuthor: {
      userId: 'user6',
      displayName: 'Music Man',
      userName: 'musicman',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user6'
    }
  },
  {
    commentId: 'c6',
    postId: '3',
    authorId: 'user7',
    commentContent: 'Subscribed! Looking forward to more.',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-11T16:05:00Z'),
    isEdited: false,
    reactionsCount: 1,
    isLiked: false,
    commentAuthor: {
      userId: 'user7',
      displayName: 'The Thinker',
      userName: 'philosopher',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user7'
    }
  },
  {
    commentId: 'c7',
    postId: '4',
    authorId: 'user8',
    commentContent: 'Congrats on the run!',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-12T08:30:00Z'),
    isEdited: false,
    reactionsCount: 4,
    isLiked: false,
    commentAuthor: {
      userId: 'user8',
      displayName: 'AI Enthusiast',
      userName: 'ai_enthusiast',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user8'
    }
  },
  {
    commentId: 'c8',
    postId: '5',
    authorId: 'user4',
    commentContent: 'Your cat is adorable!',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-12T11:30:00Z'),
    isEdited: false,
    reactionsCount: 8,
    isLiked: true,
    commentAuthor: {
      userId: 'user4',
      displayName: 'Fitness Fanatic',
      userName: 'fitlife',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user4'
    }
  },
  {
    commentId: 'c9',
    postId: '6',
    authorId: 'user3',
    commentContent: 'Classic rock never gets old!',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-12T14:20:00Z'),
    isEdited: false,
    reactionsCount: 6,
    isLiked: false,
    commentAuthor: {
      userId: 'user3',
      displayName: 'Tech Guru',
      userName: 'techguru',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    commentId: 'c10',
    postId: '7',
    authorId: 'user2',
    commentContent: 'Deep thoughts indeed.',
    mediaUrl: undefined,
    createdAt: new Date('2024-05-12T22:10:00Z'),
    isEdited: false,
    reactionsCount: 2,
    isLiked: false,
    commentAuthor: {
      userId: 'user2',
      displayName: 'Jane Smith',
      userName: 'janesmith',
      profilePictureUrl: 'https://i.pravatar.cc/150?u=user2'
    }
  }
];
