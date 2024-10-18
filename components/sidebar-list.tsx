'use client';
import { useEffect, useState } from 'react';
import { clearChats, getChats } from '@/app/actions';
import { ClearHistory } from '@/components/clear-history';
import { SidebarItems } from '@/components/sidebar-items';
import { ThemeToggle } from '@/components/theme-toggle';
import { cache } from 'react';

interface SidebarListProps {
  userId?: string;
  children?: React.ReactNode;
}

const loadChats = cache(async (userId?: string) => {
  if (!userId) return [];
  return await getChats(userId);
});

export function SidebarList({ userId }: SidebarListProps) {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      const loadedChats = await loadChats(userId);
      setChats(loadedChats);
      setLoading(false);
    };
      fetchChats();
  }, [userId]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">Loading chats...</p>
          </div>
        ) : chats.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        ) : (
          <div className="space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        <ClearHistory clearChats={clearChats} isEnabled={chats.length > 0} />
      </div>
    </div>
  );
}
