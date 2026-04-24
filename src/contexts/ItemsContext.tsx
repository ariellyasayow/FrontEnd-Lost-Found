import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

import { ITEM_STATUS } from '../constants/itemStatus';
import { mockItems } from '../data/mockItems';
import { useAuth } from '../hooks/useAuth';
import type { CreateItemInput, Item, ItemStatus } from '../types';

type ItemsContextValue = {
  items: Item[];
  lostItems: Item[];
  foundItems: Item[];
  myItems: Item[];
  getItemById: (id: string) => Item | undefined;
  addItem: (input: CreateItemInput) => Item;
  updateItemStatus: (id: string, status: ItemStatus) => void;
};

const DEFAULT_ITEM_IMAGE: Record<'lost' | 'found', string> = {
  lost:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  found:
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
};

export const ItemsContext = createContext<ItemsContextValue | undefined>(
  undefined,
);

export function ItemsProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>(mockItems);
  const { user } = useAuth();

  const lostItems = items.filter((item) => item.category === 'lost');
  const foundItems = items.filter((item) => item.category === 'found');
  const myItems = user
    ? items.filter((item) => item.reportedByUserId === user.id)
    : [];

  const getItemById = (id: string) => items.find((item) => item.id === id);

  const addItem = (input: CreateItemInput) => {
    const newItem: Item = {
      ...input,
      id: `item-${Date.now().toString(36)}`,
      status: input.status ?? ITEM_STATUS.ACTIVE,
      postedAt: new Date().toISOString(),
      imageUrl: input.imageUrl || DEFAULT_ITEM_IMAGE[input.category],
    };

    setItems((currentItems) => [newItem, ...currentItems]);

    return newItem;
  };

  const updateItemStatus = (id: string, status: ItemStatus) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        lostItems,
        foundItems,
        myItems,
        getItemById,
        addItem,
        updateItemStatus,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
