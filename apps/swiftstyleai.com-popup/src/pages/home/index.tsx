import { Gem } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FixedWiewportContainer from '@/components/layouts/FixedWiewport/Container';
import FixedWiewportHeader from '@/components/layouts/FixedWiewport/Header';
import FixedWiewportMain from '@/components/layouts/FixedWiewport/Main';
import { APP_URL, siteConfig } from '@/constants';
import { getCharacters } from '@/db/characters/browser';
import { CardTitle, CardDescription } from '@/components/ui/card';
import FixedWiewportFooter from '@/components/layouts/FixedWiewport/Footer';
import { Button } from '@/components/ui/button';
import CharacterItem from './components/CharacterItem';
import CharacterItemSkeleton from './components/CharacterItemSkeleton';
import { type Character } from './types';
import ColorLogo from '@/components/logo/ColorLogo';

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [_, setError] = useState<string | null>(null); // New error state

  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true when starting fetch
      const ws = await getCharacters();
      setCharacters(ws);
    } catch (err) {
      setError((err as Error).message); // Cast err to Error to access message
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FixedWiewportContainer className="px-4">
      <FixedWiewportHeader>
        <header
          className="z-50 w-full py-7 relative mx-auto"
          aria-label="Global"
        >
          <Link
            className="flex items-center text-xl font-semibold"
            to={`${APP_URL}`}
            aria-label={siteConfig.title}
            target="_blank"
            rel="noreferrer"
          >
            <ColorLogo
              width={56}
              height={56}
              animation="breath"
              className="inline"
            />
            <p className="pl-4 logo">{siteConfig.title}</p>
          </Link>
        </header>
      </FixedWiewportHeader>

      <FixedWiewportMain>
        <CardTitle>Characters</CardTitle>
        <CardDescription className="my-1">
          Select a character to guide AI content creation.
        </CardDescription>
        <ul className="mt-6">
          {!loading &&
            characters &&
            characters.map((character: Character) => <CharacterItem key={character.id} data={character} />)}
          {loading && (
            <>
              <CharacterItemSkeleton />
              <CharacterItemSkeleton />
            </>
          )}
        </ul>
      </FixedWiewportMain>
      <FixedWiewportFooter className="pt-10">
        <Button className="w-full" asChild>
          <a href={`${APP_URL}`} target="_blank" rel="noreferrer">
            <Gem className="mr-2 h-4 w-4" />
            Unlock Premium
          </a>
        </Button>
      </FixedWiewportFooter>
    </FixedWiewportContainer>
  );
};

export default Home;
