import { OptionSchema as Option } from './option';

export const getSearchedOptions = (options: any, searchTerm: string) => {
  const result = options.filter((option: Option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
  return result;
};

const sortList = (arr: Option[]) => {
  return arr.sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0));
};

export const _isEqual = (firstList: Option[], secondList: Option[]) => {
  const firstSortedList = sortList(firstList);
  const secondSortedList = sortList(secondList);
  return (
    firstSortedList.length === secondSortedList.length &&
    firstSortedList.every(
      (option, index) =>
        option.value === secondSortedList[index].value || option.label === secondSortedList[index].label
    )
  );
};

export const _isControlled = (selected?: Option[]) => selected !== undefined;

export const _isOpenControlled = (open?: boolean) => open !== undefined;

export const _showSelectedItems = (bulk: boolean, searchTerm: string, withCheckbox?: boolean) =>
  bulk && withCheckbox && searchTerm === '';

export const _isSelectAllPresent = (
  searchTerm: string,
  bulkOptions: number,
  withSelectAll: boolean,
  withCheckbox?: boolean
) => withCheckbox && withSelectAll && bulkOptions === 0 && searchTerm === '';

export const scrollTo = (element: Element, top: number) => {
  element.scrollTo(0, top);
};

export const scrollIntoView = (menuElement: HTMLDivElement | null, focusedElement: HTMLElement) => {
  const menuRect = menuElement?.getBoundingClientRect();
  const focusedRect = focusedElement.getBoundingClientRect();
  const overscroll = focusedElement.offsetHeight;

  if (focusedRect.bottom > menuRect!.bottom && menuElement) {
    scrollTo(menuElement, focusedElement.offsetTop - menuRect!.height + overscroll);
  } else if (focusedRect.top < menuRect!.top && menuElement) {
    scrollTo(menuElement, focusedElement.offsetTop - overscroll);
  }
};

export const getSelectAll = (selected: Option[], optionsLength: number, disabledOptionsLength: number) => {
  if (selected.length) {
    if (selected.length > 0 && disabledOptionsLength > 0 && selected.length === optionsLength - disabledOptionsLength) {
      return { indeterminate: true, checked: true }; //
    }
    const indeterminate = selected.length > 0 && selected.length !== optionsLength;
    const checked = selected.length > 0 && selected.length === optionsLength;
    const obj = { checked, indeterminate };
    return obj;
  }
  return { indeterminate: false, checked: false };
};

export const scrollToOptionIndex = (scrollIndex: number, listOptions: any) => {
  const optionID = listOptions && listOptions[scrollIndex]?.optionID;
  const targetOption = document.getElementById(optionID);
  targetOption && targetOption.scrollIntoView && targetOption.scrollIntoView({ block: 'center' });
};
