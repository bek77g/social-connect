'use client';
import { $fetch } from '@/$api/api.fetch';
import { ChatsListItem } from '@/components/screens/chats/list/ChatsListItem';
import Field from '@/components/ui/Field';
import { Loader } from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function ChatsList() {
	const { isLoggedIn } = useAuth();
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const { data, isLoading } = useQuery({
		queryKey: ['chats', debouncedSearchTerm],
		queryFn: () =>
			$fetch.get<{ data: IChat[] }>(
				`/chats?sort=createdAt:desc
				&populate[messages]=*
				&populate[participants][populate][avatar]=*
				&filters[participants][username][$containsi]=${debouncedSearchTerm}`,
				{},
				true
			),
		enabled: isLoggedIn,
	});

	return (
		<>
			<div className='border-t border-b border-border p-layout'>
				<Field
					placeholder='Search chat'
					Icon={Search}
					value={searchTerm}
					onChange={({ target }) => setSearchTerm(target.value)}
				/>
			</div>
			<div>
				{isLoading ? (
					<div className='p-layout'>
						<Loader />
					</div>
				) : data?.data?.length ? (
					data?.data.map(chat => <ChatsListItem key={chat.id} {...chat} />)
				) : (
					<p className='p-layout'>Chats not found!</p>
				)}
			</div>
		</>
	);
}
