import type { Metadata } from 'next';

import { Chat } from '@/components/screens/chats/chat/Chat';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Chat',
	...NO_INDEX_PAGE,
};

export default function ChatPage() {
	return <Chat />;
}
