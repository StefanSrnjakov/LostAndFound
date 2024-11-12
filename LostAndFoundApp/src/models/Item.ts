export interface Item {
    _id: string;
    name: string;
    type: 'lost' | 'found';
    description: string;
    category: string;
    dateFound: Date | null;
    dateLost: Date | null;
    publishedAt: Date | null;
    lastUpdatedAt: Date | null;
    locationFound: string;
    status: 'listed' | 'claimed';
    email: string | null;
    number: string | null;
    image: string | File | null;
    reports: string[];
}