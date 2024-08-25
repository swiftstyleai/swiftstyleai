export type DrawerData = {
  open: boolean;
};

export interface InitialAppState {
  // UI
  creatingCharacterDrawer: DrawerData;
  isNavigating: boolean;
}
