import { MediaItem } from "./media-item";
import { AuthorProfile } from "./author";
import { Privacy, MediaType } from "./enums";

export interface Post {
    postId: string;
    content: string;
    mediaList: MediaItem[];
    reactsCount: number;
    commentsCount: number;
    isEdited: boolean;
    isLiked: boolean;
    createdAt: Date;
    authorProfile: AuthorProfile;
    privacy: Privacy;
}

export const STATIC_POSTS: Post[] = [
    {
        postId: '1',
        content: 'Just enjoying a beautiful sunset at the beach! #sunset #beach #nature',
        mediaList: [{ type: MediaType.IMAGE, url: 'https://picsum.photos/seed/1/800/600' }],
        reactsCount: 152,
        commentsCount: 12,
        isEdited: false,
        isLiked: true,
        createdAt: new Date('2024-05-10T18:30:00Z'),
        authorProfile: { id: 'user1', userName: 'johndoe', displayName: 'John Doe', profilePictureUrl: 'https://i.pravatar.cc/150?u=user1' },
        privacy: Privacy.PUBLIC
    },
    {
        postId: '2',
        content: 'Trying out a new recipe for homemade pizza. It was delicious! 🍕',
        mediaList: [{ type: MediaType.IMAGE, url: 'https://picsum.photos/seed/2/800/600' }],
        reactsCount: 89,
        commentsCount: 5,
        isEdited: false,
        isLiked: false,
        createdAt: new Date('2024-05-11T12:00:00Z'),
        authorProfile: { id: 'user2', userName: 'janesmith', displayName: 'Jane Smith', profilePictureUrl: 'https://i.pravatar.cc/150?u=user2' },
        privacy: Privacy.PUBLIC
    },
    {
        postId: '3',
        content: 'My new video is up on YouTube! Check it out. Link in bio.',
        mediaList: [{ type: MediaType.VIDEO, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnailUrl: 'https://picsum.photos/seed/3/800/600' }],
        reactsCount: 230,
        commentsCount: 45,
        isEdited: true,
        isLiked: true,
        createdAt: new Date('2024-05-11T15:45:00Z'),
        authorProfile: { id: 'user3', userName: 'techguru', displayName: 'Tech Guru', profilePictureUrl: 'https://i.pravatar.cc/150?u=user3' },
        privacy: Privacy.PUBLIC
    },
    {
        postId: '4',
        content: 'Just finished a 5k run! Feeling great. #running #fitness',
        mediaList: [],
        reactsCount: 45,
        commentsCount: 8,
        isEdited: false,
        isLiked: false,
        createdAt: new Date('2024-05-12T08:00:00Z'),
        authorProfile: { id: 'user4', userName: 'fitlife', displayName: 'Fitness Fanatic', profilePictureUrl: 'https://i.pravatar.cc/150?u=user4' },
        privacy: Privacy.PUBLIC
    },
    {
        postId: '5',
        content: 'My cat is being extra cute today. 😻',
        mediaList: [{ type: MediaType.IMAGE, url: 'https://picsum.photos/seed/5/800/600' }],
        reactsCount: 312,
        commentsCount: 25,
        isEdited: false,
        isLiked: true,
        createdAt: new Date('2024-05-12T11:20:00Z'),
        authorProfile: { id: 'user5', userName: 'catlover', displayName: 'Crazy Cat Lady', profilePictureUrl: 'https://i.pravatar.cc/150?u=user5' },
        privacy: Privacy.PRIVATE
    },
    {
        postId: '6',
        content: 'Listening to some classic rock to get through the workday. What are you listening to?',
        mediaList: [{ type: MediaType.AUDIO, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }],
        reactsCount: 33,
        commentsCount: 15,
        isEdited: false,
        isLiked: false,
        createdAt: new Date('2024-05-12T14:10:00Z'),
        authorProfile: { id: 'user6', userName: 'musicman', displayName: 'Music Man', profilePictureUrl: 'https://i.pravatar.cc/150?u=user6' },
        privacy: Privacy.PUBLIC
    },
    {
        postId: '7',
        content: 'Just a thought... #deepthoughts',
        mediaList: [],
        reactsCount: 15,
        commentsCount: 2,
        isEdited: false,
        isLiked: false,
        createdAt: new Date('2024-05-12T22:00:00Z'),
        authorProfile: { id: 'user7', userName: 'philosopher', displayName: 'The Thinker', profilePictureUrl: 'https://i.pravatar.cc/150?u=user7' },
        privacy: Privacy.ONLYME
    },
    {
        postId: '8',
        content: 'Excited to announce my new project! More details coming soon.',
        mediaList: [],
        reactsCount: 500,
        commentsCount: 100,
        isEdited: false,
        isLiked: true,
        createdAt: new Date('2024-05-13T09:00:00Z'),
        authorProfile: { id: 'user3', userName: 'techguru', displayName: 'Tech Guru', profilePictureUrl: 'https://i.pravatar.cc/150?u=user3' },
        privacy: Privacy.PUBLIC
    },
    {
        postId: '9',
        content: 'Throwback to my trip to Italy last year. #tbt #travel',
        mediaList: [ { type: MediaType.IMAGE, url: 'https://picsum.photos/seed/9/800/600' }, { type: MediaType.IMAGE, url: 'https://picsum.photos/seed/10/800/600' } ],
        reactsCount: 241,
        commentsCount: 33,
        isEdited: true,
        isLiked: true,
        createdAt: new Date('2024-05-13T13:00:00Z'),
        authorProfile: { id: 'user2', userName: 'janesmith', displayName: 'Jane Smith', profilePictureUrl: 'https://i.pravatar.cc/150?u=user2' },
        privacy: Privacy.PUBLIC
    },
    {
        postId: '10',
        content: 'Working on a new blog post about the future of AI. It\'s fascinating stuff!',
        mediaList: [{ type: MediaType.DOCUMENT, url: 'https://example.com/document.pdf' }],
        reactsCount: 78,
        commentsCount: 19,
        isEdited: false,
        isLiked: false,
        createdAt: new Date('2024-05-13T16:00:00Z'),
        authorProfile: { id: 'user8', userName: 'ai_enthusiast', displayName: 'AI Enthusiast', profilePictureUrl: 'https://i.pravatar.cc/150?u=user8' },
        privacy: Privacy.PUBLIC
    }
];