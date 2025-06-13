import { SimpleUserProfile } from '../Profile/simple-user-profile';

export interface AggregatedComment {
    CommentId: string;
    PostId: string;
    AuthorId: string;
    CommentContent: string;
    MediaUrl?: string;
    CreatedAt: Date;
    IsEdited: boolean;
    ReactionsCount: number;
    IsLiked: boolean;
    CommentAuthor: SimpleUserProfile;
}

// Static mock data for comments
export const STATIC_COMMENTS: AggregatedComment[] = [
  {
    CommentId: 'c1',
    PostId: '1',
    AuthorId: 'user2',
    CommentContent: 'Amazing photo! Looks so peaceful.',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:00:00Z'),
    IsEdited: false,
    ReactionsCount: 5,
    IsLiked: false,
    CommentAuthor: {
      UserId: 'user2',
      DisplayName: 'Jane Smith',
      UserName: 'janesmith',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user2'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c2',
    PostId: '1',
    AuthorId: 'user3',
    CommentContent: 'Wish I was there! 🌅',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-10T19:05:00Z'),
    IsEdited: false,
    ReactionsCount: 3,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c3',
    PostId: '2',
    AuthorId: 'user1',
    CommentContent: 'That pizza looks delicious!',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-11T12:30:00Z'),
    IsEdited: false,
    ReactionsCount: 7,
    IsLiked: false,
    CommentAuthor: {
      UserId: 'user1',
      DisplayName: 'John Doe',
      UserName: 'johndoe',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user1'
    }
  },
  {
    CommentId: 'c4',
    PostId: '2',
    AuthorId: 'user5',
    CommentContent: 'Recipe please! 😋',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-11T12:32:00Z'),
    IsEdited: true,
    ReactionsCount: 2,
    IsLiked: false,
    CommentAuthor: {
      UserId: 'user5',
      DisplayName: 'Crazy Cat Lady',
      UserName: 'catlover',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user5'
    }
  },
  {
    CommentId: 'c5',
    PostId: '3',
    AuthorId: 'user6',
    CommentContent: 'Great video, very informative!',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-11T16:00:00Z'),
    IsEdited: false,
    ReactionsCount: 10,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user6',
      DisplayName: 'Music Man',
      UserName: 'musicman',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user6'
    }
  },
  {
    CommentId: 'c6',
    PostId: '3',
    AuthorId: 'user7',
    CommentContent: 'Subscribed! Looking forward to more.',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-11T16:05:00Z'),
    IsEdited: false,
    ReactionsCount: 1,
    IsLiked: false,
    CommentAuthor: {
      UserId: 'user7',
      DisplayName: 'The Thinker',
      UserName: 'philosopher',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user7'
    }
  },
  {
    CommentId: 'c7',
    PostId: '4',
    AuthorId: 'user8',
    CommentContent: 'Congrats on the run!',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-12T08:30:00Z'),
    IsEdited: false,
    ReactionsCount: 4,
    IsLiked: false,
    CommentAuthor: {
      UserId: 'user8',
      DisplayName: 'AI Enthusiast',
      UserName: 'ai_enthusiast',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user8'
    }
  },
  {
    CommentId: 'c8',
    PostId: '5',
    AuthorId: 'user4',
    CommentContent: 'Your cat is adorable!',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-12T11:30:00Z'),
    IsEdited: false,
    ReactionsCount: 8,
    IsLiked: true,
    CommentAuthor: {
      UserId: 'user4',
      DisplayName: 'Fitness Fanatic',
      UserName: 'fitlife',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user4'
    }
  },
  {
    CommentId: 'c9',
    PostId: '6',
    AuthorId: 'user3',
    CommentContent: 'Classic rock never gets old!',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-12T14:20:00Z'),
    IsEdited: false,
    ReactionsCount: 6,
    IsLiked: false,
    CommentAuthor: {
      UserId: 'user3',
      DisplayName: 'Tech Guru',
      UserName: 'techguru',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user3'
    }
  },
  {
    CommentId: 'c10',
    PostId: '7',
    AuthorId: 'user2',
    CommentContent: 'Deep thoughts indeed.',
    MediaUrl: undefined,
    CreatedAt: new Date('2024-05-12T22:10:00Z'),
    IsEdited: false,
    ReactionsCount: 2,
    IsLiked: false,
    CommentAuthor: {
      UserId: 'user2',
      DisplayName: 'Jane Smith',
      UserName: 'janesmith',
      ProfilePictureUrl: 'https://i.pravatar.cc/150?u=user2'
    }
  }
];
