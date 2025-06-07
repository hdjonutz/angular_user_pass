type ValueCondition = 'EQL' | 'SMAL' | 'BIG' | 'EBIG' | 'ESMAL';

export interface IFiltersCondition {
  field: string;
  condition: ValueCondition;
  value: any;
}
