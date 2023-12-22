export enum BookAction {
  NewBook = 'new_book',
  NewBookWizard = 'new_book_wizard',
}

export const bookFloatingActions = [
  {
    text: 'New Book',
    icon: require('../../assets/icons/add.png'),
    name: BookAction.NewBook,
    position: 0,
  },
  {
    text: 'New Book Wizard',
    icon: require('../../assets/icons/add.png'),
    name: BookAction.NewBookWizard,
    position: 1,
  },
];
