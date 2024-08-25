import { useCallback, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { updateCharacterStatus } from '@/db/characters/browser';
import { type Character } from '../types';

export type CharacterItemProps = {
  data: Character;
};

const CharacterItem = ({ data }: CharacterItemProps) => {
  const [character, setCharacter] = useState<Character>(data);
  const [loading, setLoading] = useState(false);

  const toggleActiveState = useCallback(
    async (checked: boolean) => {
      try {
        setLoading(true);
        const res = await updateCharacterStatus({
          characterId: data.id,
          isActive: checked,
        });
        setCharacter(res);
      } finally {
        setLoading(false);
      }
    },
    [data],
  );

  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{character.name}</p>
          <p className="text-sm truncate">{character.description}</p>
        </div>
        <div className="inline-flex items-center text-base font-semibold">
          <Switch
            onCheckedChange={toggleActiveState}
            disabled={loading}
            checked={character.is_active}
          />
        </div>
      </div>
    </li>
  );
};

export default CharacterItem;
