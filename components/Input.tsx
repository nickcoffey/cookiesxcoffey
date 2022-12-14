import TextareaAutosize from 'react-textarea-autosize'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

export type BaseInputProps = {
  label: string
  icon: string
  errorMsg?: string
  required?: boolean // only used to show asterik, does nothing with validation
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'style'
  >
  textAreaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'className' | 'style'
  >
}

type Props = RequireOnlyOne<BaseInputProps, 'inputProps' | 'textAreaProps'>

export const Input = ({
  label,
  icon,
  errorMsg,
  required,
  inputProps,
  textAreaProps
}: Props) => (
  <div className='flex flex-col gap-1 group'>
    <label className='text-sm text-primary group-focus-within:text-darkprimary'>
      {label}
      {required && '*'}
    </label>
    {textAreaProps ? (
      <div className='flex gap-2 px-2 py-1 bg-white rounded-md group-focus-within:ring ring-1 ring-darkprimary'>
        {icon && <span className='pt-2 material-symbols-outlined'>{icon}</span>}
        <TextareaAutosize
          className='w-full h-full py-2 outline-none resize-none'
          minRows={3}
          {...textAreaProps}
        />
      </div>
    ) : (
      <div className='flex items-center gap-2 px-2 py-1 bg-white rounded-md group-focus-within:ring ring-1 ring-darkprimary'>
        {icon && <span className='material-symbols-outlined'>{icon}</span>}
        <input className='w-full h-full py-2 outline-none' {...inputProps} />
      </div>
    )}
    {errorMsg && (
      <span className='text-sm text-primary group-focus-within:text-darkprimary'>
        {errorMsg}
      </span>
    )}
  </div>
)
