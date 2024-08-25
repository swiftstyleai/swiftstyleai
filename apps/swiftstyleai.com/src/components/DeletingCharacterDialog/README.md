## Deleting Character Dialog

```ts
const { deleteCharacter } = useCharacterDeletion();

deleteCharacter(character);

<DeletingCharacterContext>
  <DeletingCharacterDialog
    onOpenDialog={onOpenDialog}
    onCloseDialog={onCloseDialog}
    onSuccess={onSuccess}
    onFailure={onFailure}
  />

  <DeletedCharacterSuccessfull handler={onSuccess} />
  <DeletedCharacterFailed handler={onFailure} />
</DeletingCharacterContext>;
```
