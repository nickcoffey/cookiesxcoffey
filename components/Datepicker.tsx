import { useEffect, useState } from 'react'
import { useDayzed } from 'dayzed'
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import classNames from 'classnames'
import { Input } from './Input'
import { OrderInputs } from './OrderSection'
import { getTruncatedDateStr } from '../utils'
import type { Props as DayzedProps } from 'dayzed'
import type { UseFormSetValue } from 'react-hook-form'
import type { BaseInputProps } from './Input'

type RequiredInputProps = Required<Pick<BaseInputProps, 'inputProps'>>
type DatepickerProps = { setValue: UseFormSetValue<OrderInputs> } & Omit<
  BaseInputProps,
  'textAreaProps' | 'inputProps'
> &
  RequiredInputProps

export const Datepicker = ({ setValue, ...props }: DatepickerProps) => {
  const [date, setDate] = useState<Date>()

  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  useEffect(() => {
    setValue('deliveryDate', date ? getTruncatedDateStr(date) : '')
  }, [date, setValue])

  return (
    <Popover>
      <Popover.Button
        // @ts-ignore
        ref={setReferenceElement}
        className='w-full tracking-widest text-left outline-none'
        as='div'
      >
        <Input {...props} />
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
          className='bg-white'
        >
          <DateDialog
            selected={date}
            onDateSelected={date => setDate(date.date)}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

type DateDialogProps = Pick<DayzedProps, 'selected' | 'onDateSelected'>

const DateDialog = (props: DateDialogProps) => {
  const { calendars, getBackProps, getForwardProps, getDateProps } =
    useDayzed(props)

  return (
    <div className='p-4 rounded-md shadow-md border border-[#f8f8f8] z-10'>
      {calendars.map((calendar, calIndex) => (
        <div className='grid grid-cols-7 gap-2' key={calIndex}>
          {/* HEADER BUTTONS */}
          <div className='flex justify-between col-span-7'>
            <button
              type='button'
              className={btnClasses}
              {...getBackProps({ calendars })}
            >
              Back
            </button>
            <div className='text-center '>
              {monthNamesShort[calendar.month]} {calendar.year}
            </div>
            <button
              type='button'
              className={btnClasses}
              {...getForwardProps({ calendars })}
            >
              Next
            </button>
          </div>
          {/* DAY COLUMN HEADERS */}
          {weekdayNamesShort.map((weekday, weekdayIndex) => (
            <div className='text-center' key={weekdayIndex}>
              {weekday}
            </div>
          ))}
          {/* DATES */}
          {calendar.weeks.map(week =>
            week.map((dateObj, weekIndex) => {
              if (dateObj) {
                const { date, selected, today } = dateObj
                const dateClasses = classNames(
                  'rounded-md p-1 transition duration-150 lg:hover:bg-darkprimary lg:hover:text-white',
                  {
                    ['bg-lightprimary']: today,
                    ['bg-primary']: selected
                  }
                )
                return (
                  <button
                    type='button'
                    className={dateClasses}
                    key={weekIndex}
                    {...getDateProps({ dateObj })}
                  >
                    {date.getDate()}
                  </button>
                )
              }
            })
          )}
        </div>
      ))}
    </div>
  )
}

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const btnClasses =
  'px-3 py-1 rounded-md transition duration-150 bg-primary lg:hover:bg-darkprimary lg:hover:text-white'
