import { FileX, MoreVertical, Share } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { HttpStatus } from '@/lib/constants';
import { usePushHook } from '@/lib/react-transition-progress/next';

import DeletedCharacterSuccessfull from '@/components/DeletingCharacterDialog/containers/DeletedCharacterSuccessfull';
import DeletingCharacterDialog from '@/components/DeletingCharacterDialog/containers/DeletingCharacterDialog';
import { useDeletingCharacterDialogContext } from '@/components/DeletingCharacterDialog/contexts';
import PlaygroundApp from '@/components/PlaygroundApp/containers/Main';
import { PlaygroundProvider } from '@/components/PlaygroundApp/contexts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { createInstruction } from '@/db/instructions/browser';

import InfoCardForm from './InfoCard/Form';
import InstructionItem from '../components/InstructionItem';
import { useCharactersIDContext } from '../contexts';
import { type Instruction } from '../contexts/types';

const defaultLayout = [32, 48];

const Main = () => {
  const {
    state: stateInstructions,
    addInstruction,
    deleteInstruction,
  } = useCharactersIDContext();

  const { state: stateDeletingCharacterDialog, openDeletingCharacterDialog } =
    useDeletingCharacterDialogContext();
  const { data, list, character } = stateInstructions;
  const instructions = list.map((id: string) => data[id]);

  const [newInstructionText, setNewInstructionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchStatus } = stateDeletingCharacterDialog;
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewInstructionText(e.target.value);
    },
    []
  );

  const handleAddInstruction = useCallback(async () => {
    if (newInstructionText.trim() === '' || !character) return;

    setIsLoading(true);
    setError(null);

    try {
      const newInstruction = await createInstruction({
        text: newInstructionText,
        character_id: character.id,
      });

      addInstruction?.(newInstruction);
      setNewInstructionText('');
    } catch (err) {
      setError('Failed to add instruction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [newInstructionText, character, addInstruction]);

  const handleDeleteCharacter = useCallback(() => {
    if (!character) return;
    openDeletingCharacterDialog && openDeletingCharacterDialog(character);
  }, [character, openDeletingCharacterDialog]);

  const { pushWithProgress } = usePushHook();

  return (
    <>
      <div className='px-4 sm:px-6'>
        <Tabs defaultValue='info'>
          <div className='flex items-center'>
            <TabsList>
              <TabsTrigger value='info'>Info</TabsTrigger>
              <TabsTrigger value='instructions'>Instructions</TabsTrigger>
              <TabsTrigger disabled value='responses'>
                Responses
              </TabsTrigger>
              <TabsTrigger disabled value='knowledge'>
                Knowledge
              </TabsTrigger>
            </TabsList>
            <div className='ml-auto flex items-center gap-2'>
              <Button
                disabled
                variant='outline'
                size='sm'
                className='ml-auto gap-1.5 text-sm'
              >
                <Share className='size-3.5' />
                Share
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size='icon' variant='outline' className='h-8 w-8'>
                    <MoreVertical className='h-3.5 w-3.5' />
                    <span className='sr-only'>More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem
                    onClick={handleDeleteCharacter}
                    disabled={fetchStatus === HttpStatus.LOADING}
                  >
                    <FileX className='mr-2 h-4 w-4' />
                    <span>Delete character</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* className='grid flex-1 gap-4 md:grid-cols-2' */}
          <main>
            <ResizablePanelGroup
              direction='horizontal'
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
                  sizes
                )}`;
              }}
              className='h-full max-h-[800px] items-stretch'
            >
              <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
                <div className='relative pr-4'>
                  <TabsContent
                    value='info'
                    className='flex-col grid w-full items-start gap-8'
                  >
                    <InfoCardForm />

                    <Card>
                      <CardHeader>
                        <CardTitle>Model</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent
                    value='instructions'
                    className='flex-col grid w-full items-start gap-8'
                  >
                    <ScrollArea className='h-full'>
                      <Card className='mt-2'>
                        <CardHeader>
                          <CardTitle>Instructions</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='grid gap-6'>
                            <div className='flex items-center gap-3'>
                              <Input
                                type='text'
                                value={newInstructionText}
                                onChange={handleInputChange}
                                placeholder='Add new instruction'
                                className='w-full'
                                disabled={isLoading}
                              />
                              <Button
                                onClick={handleAddInstruction}
                                size='sm'
                                disabled={isLoading}
                              >
                                {isLoading ? 'Adding...' : 'Add'}
                              </Button>
                            </div>
                            {error && (
                              <div className='text-red-500'>{error}</div>
                            )}
                          </div>
                          <ul className='mt-6'>
                            {instructions.length > 0 ? (
                              instructions.map((instruction: Instruction) => (
                                <InstructionItem
                                  key={instruction.id}
                                  data={instruction}
                                  onDelete={deleteInstruction}
                                />
                              ))
                            ) : (
                              <li>No instructions available.</li>
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent
                    value='responses'
                    className='flex-col grid w-full items-start gap-8'
                  >
                    Not implemented yet
                  </TabsContent>
                  <TabsContent
                    value='knowledge'
                    className='flex-col grid w-full items-start gap-8'
                  >
                    Not implemented yet
                  </TabsContent>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <div className='relative ml-4 mt-4 pb-4 flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50'>
                  <PlaygroundProvider>
                    {character && <PlaygroundApp characterId={character.id} />}
                  </PlaygroundProvider>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </Tabs>
      </div>

      <DeletingCharacterDialog />
      <DeletedCharacterSuccessfull
        handler={() => {
          pushWithProgress('/characters');
        }}
      />
    </>
  );
};

export default Main;
