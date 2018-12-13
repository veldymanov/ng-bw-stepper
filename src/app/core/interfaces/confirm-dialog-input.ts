export interface ConfirmDialogInput {
  falseBtnName?: string;
  falseBtnColor?: 'accent' | 'primary' | 'warn';
  message: string;
  trueBtnName?: string;
  trueBtnColor?: 'accent' | 'primary' | 'warn';
}