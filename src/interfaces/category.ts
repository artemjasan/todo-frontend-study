export interface CategoryItem {
  id: string;
  name: string;
}

export interface CounterProps {
  initValue: number;
}

export interface CategoryPropsObject {
  counter: CounterProps;
}
