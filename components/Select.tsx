import { useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import classNames from 'classnames'
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import type { BaseInputProps } from './Input'

type SelectProps<TOption extends string> = {
  options: TOption[] | readonly TOption[]
  value: TOption
  handleSelect: (selectedOption: TOption) => void
} & Omit<BaseInputProps, 'textAreaProps' | 'inputProps'>

export const Select = <TOption extends string>({
  label,
  required,
  value,
  handleSelect,
  options,
  Icon,
  errorMsg
}: SelectProps<TOption>) => {
  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <Popover>
      {({ open: isOpen }) => (
        <>
          <label
            className={classNames('text-sm text-primary', {
              ['text-darkprimary']: isOpen
            })}
          >
            {label}
            {required && '*'}
          </label>
          <Popover.Button
            // @ts-ignore
            ref={setReferenceElement}
            className={classNames(
              'flex items-center justify-between px-2 py-1 w-full outline-none h-[45px] bg-white rounded-md cursor-pointer ring-1 ring-darkprimary',
              { ['ring']: isOpen }
            )}
            as='div'
          >
            <>
              <span className='flex items-center gap-2'>
                <Icon />
                {value}
              </span>
              <ArrowDownIcon />
            </>
          </Popover.Button>
          <Transition
            enter='transition duration-150 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-150 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Popover.Panel
              // @ts-ignore
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className='bg-white w-full'
            >
              {({ close }) => (
                <ul className='flex flex-col bg-white rounded-md shadow-md border border-[#f8f8f8] z-10'>
                  {options.map((option, index) => {
                    const selected = value === option
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          handleSelect(option)
                          close()
                        }}
                        className={classNames(
                          'flex items-center gap-2 p-2 cursor-pointer rounded-md transition duration-150 lg:hover:bg-darkprimary lg:hover:text-white',
                          {
                            ['px-10 text-black']: !selected,
                            ['text-darkprimary']: selected
                          }
                        )}
                      >
                        {selected && <Icon />}
                        {option}
                      </li>
                    )
                  })}
                </ul>
              )}
            </Popover.Panel>
          </Transition>
          {errorMsg && (
            <span
              className={classNames('text-sm text-primary', {
                ['text-darkprimary']: isOpen
              })}
            >
              {errorMsg}
            </span>
          )}
        </>
      )}
    </Popover>
  )
}
