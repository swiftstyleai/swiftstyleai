import { MoreHorizontal } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import {
  deleteInstruction,
  updateInstructionText,
} from '@/db/instructions/browser';

import { type Instruction } from '../contexts/types';

export type InstructionItemProps = {
  data: Instruction;
  onDelete?: (id: string) => void;
};

const InstructionItem = ({ data, onDelete }: InstructionItemProps) => {
  const [instruction, setInstruction] = useState<Instruction>(data);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(instruction.text);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      const updatedInstruction = await updateInstructionText(
        instruction.id,
        editedText
      );
      setInstruction(updatedInstruction);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update instruction. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [instruction.id, editedText]);

  const handleCancel = useCallback(() => {
    setEditedText(instruction.text);
    setIsEditing(false);
  }, [instruction.text]);

  const handleDeleteClick = useCallback(async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteInstruction(instruction.id);
      onDelete?.(instruction.id);
    } catch (err) {
      setError('Failed to delete instruction. Please try again.');
      console.error('Failed to delete instruction:', err);
    } finally {
      setIsDeleting(false);
    }
  }, [instruction.id, onDelete]);

  return (
    <li className='pb-3 sm:pb-4'>
      <div className='flex items-center space-x-4 rtl:space-x-reverse'>
        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <Input
              id='edit-text'
              type='text'
              className='w-full'
              value={editedText}
              onChange={handleInputChange}
              disabled={isSaving}
            />
          ) : (
            <p className='text-sm font-medium'>{instruction.text}</p>
          )}
        </div>
        <div className='inline-flex items-center text-base font-semibold'>
          {isEditing ? (
            <div className='flex items-center gap-2'>
              <Button onClick={handleSave} size='sm' disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup='true' size='icon' variant='ghost'>
                  <MoreHorizontal className='h-4 w-4' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleEditClick}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {error && <div className='text-red-500'>{error}</div>}
    </li>
  );
};

export default InstructionItem;
