/**
 * In fact, List Item can have any type - make sure list elements are aware
 */
export interface ListItem {
  label?: any;
  value?: any;
  testID?: string;
  disabled?: boolean;
}
