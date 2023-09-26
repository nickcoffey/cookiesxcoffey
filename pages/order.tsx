import { ChangeEvent, useRef, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneIcon from '@mui/icons-material/LocalPhoneOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined'
import TagIcon from '@mui/icons-material/TagOutlined'
import CookieIcon from '@mui/icons-material/CookieOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import AddIcon from '@mui/icons-material/AddOutlined'
import ChatIcon from '@mui/icons-material/ChatOutlined'
import SendIcon from '@mui/icons-material/SendOutlined'
import SyncIcon from '@mui/icons-material/SyncOutlined'
import WarningIcon from '@mui/icons-material/WarningOutlined'
import CheckIcon from '@mui/icons-material/CheckOutlined'
import { Page, Input, Datepicker } from '../components'
import { httpPost, maskPhone, removePhoneMask } from '../utils'
import type {
  CookieItem,
  EmailRequestBody,
  EmailResponseBody
} from './api/sendEmail'
import type { NextPage } from 'next'
import type { Icon } from '../types'

export type OrderInputs = {
  name: string
  email: string
  phone: string
  deliveryDate: string
  cookieList: CookieItem[]
  message: string
}

const schema = yup.object({
  name: yup
    .string()
    .max(75, 'The name entered is too long.')
    .required('Please enter your name.'),
  email: yup
    .string()
    .email('Please enter a valid email.')
    .max(75, 'The email entered is too long.')
    .required('Please enter your email.'),
  phone: yup
    .string()
    .test('phoneMax', 'Please enter a valid phone number.', value => {
      if (value) {
        const unmaskedValLength = removePhoneMask(value).length
        return unmaskedValLength === 10 || unmaskedValLength === 0
      }
      return true
    }),
  deliveryDate: yup
    .date()
    .typeError('Please enter a delivery date.')
    .min(new Date(), 'Delivery date must be in the future.')
    .required('Please enter a delivery date.'),
  cookieList: yup
    .array()
    .ensure()
    .min(1, 'Cookie details are required to submit an order')
    .of(
      yup.object({
        flavor: yup
          .string()
          .max(75, 'The flavor entered is too long.')
          .required('Please enter a flavor.'),
        count: yup
          .number()
          .typeError('Please enter an amount.')
          .min(1, 'Please enter an amount.')
          .max(500, 'That amount is too high.')
          .required('Please enter an amount.')
      })
    ),
  message: yup
    .string()
    .max(1000, 'The message entered is too long.')
    .required('Please enter a brief message about your order.')
})

const EmptyGridSpace = () => <div className='hidden lg:block lg:col-span-1' />
const newFlavor = { count: 0, flavor: '' }

const Order: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    watch,
    setValue,
    reset
  } = useForm<OrderInputs>({ mode: 'onSubmit', resolver: yupResolver(schema) })

  const cookieListWatch = watch('cookieList')
  const phoneWatch = watch('phone')

  const addFlavor = () => {
    setValue(
      'cookieList',
      cookieListWatch ? [...cookieListWatch, newFlavor] : [newFlavor]
    )
  }

  const removeFlavor = (index: number) => {
    setValue(
      'cookieList',
      cookieListWatch.filter((_, i) => index !== i)
    )
  }

  const onSubmit: SubmitHandler<OrderInputs> = async data => {
    await httpPost<EmailRequestBody, EmailResponseBody>('api/sendEmail', data)
  }

  if (isSubmitSuccessful) {
    setTimeout(reset, 3000)
  }

  useEffect(() => {
    setValue('cookieList', [newFlavor])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page header='Order'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-4 lg:grid-cols-2'
        ref={formRef}
      >
        <Input
          label='Name'
          Icon={PersonIcon}
          errorMsg={errors.name?.message}
          inputProps={register('name')}
          required
        />
        <Input
          label='Email'
          Icon={EmailIcon}
          errorMsg={errors.email?.message}
          inputProps={register('email')}
          required
        />
        <Input
          label='Phone'
          Icon={LocalPhoneIcon}
          errorMsg={errors.phone?.message}
          inputProps={{
            ...register('phone'),
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setValue('phone', maskPhone(event.target.value, phoneWatch), {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: isSubmitted
              })
            }
          }}
        />
        <EmptyGridSpace />
        <Datepicker
          label='Delivery Date'
          Icon={CalendarMonthIcon}
          errorMsg={errors.deliveryDate?.message}
          inputProps={register('deliveryDate')}
          setValue={setValue}
          required
        />
        <div className='lg:col-span-2'>
          <Input
            label='Message'
            Icon={ChatIcon}
            errorMsg={errors.message?.message}
            textAreaProps={register('message')}
            required
          />
        </div>
        <div className='grid gap-4 border-b border-darkprimary group'>
          <h4 className='text-sm text-primary group-focus-within:text-darkprimary'>
            Order Details*
          </h4>
          {errors.cookieList?.message && cookieListWatch?.length < 1 && (
            <span className='text-sm text-primary group-focus-within:text-darkprimary'>
              {errors.cookieList.message}
            </span>
          )}
          {cookieListWatch?.map((_, index) => (
            <div key={index} className='flex gap-4 items-start'>
              <Input
                label='Flavor'
                Icon={CookieIcon}
                errorMsg={
                  errors.cookieList && errors.cookieList[index]?.flavor?.message
                }
                inputProps={{ ...register(`cookieList.${index}.flavor`) }}
                required
              />
              <span className='w-1/3'>
                <Input
                  label='Amount'
                  Icon={TagIcon}
                  errorMsg={
                    errors.cookieList &&
                    errors.cookieList[index]?.count?.message
                  }
                  inputProps={{
                    ...register(`cookieList.${index}.count`),
                    type: 'number'
                  }}
                  required
                />
              </span>
              <button
                type='button'
                onClick={() => removeFlavor(index)}
                className='flex items-end justify-center mt-8 text-black transition duration-150 lg:hover:text-darkprimary'
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={addFlavor}
            className='flex items-center justify-center gap-2 w-full py-3 text-black transition duration-150 lg:hover:text-darkprimary'
          >
            <AddIcon />
            Add Flavor
          </button>
        </div>
        <EmptyGridSpace />
        <div className='lg:col-span-1 lg:flex lg:justify-end'>
          <OrderButton {...{ isSubmitting, isSubmitSuccessful, isSubmitted }} />
        </div>
      </form>
    </Page>
  )
}

type OrderButtonProps = {
  isSubmitting: boolean
  isSubmitSuccessful: boolean
  isSubmitted: boolean
}

const OrderButton = ({
  isSubmitting,
  isSubmitSuccessful,
  isSubmitted
}: OrderButtonProps) => {
  let btnContent = ButtonContentMap['default']

  if (isSubmitting) {
    btnContent = ButtonContentMap['loading']
  } else if (isSubmitted) {
    if (isSubmitSuccessful) {
      btnContent = ButtonContentMap['success']
    } else {
      btnContent = ButtonContentMap['error']
    }
  }

  const { Icon, text } = btnContent
  return (
    <button
      className='flex items-center justify-center w-full gap-2 py-3 mt-2 transition duration-150 rounded-md bg-primary disabled:cursor-not-allowed disabled:hover:bg-lightprimary disabled:bg-lightprimary lg:hover:bg-darkprimary lg:hover:text-white lg:w-1/2'
      disabled={isSubmitting || (isSubmitted && isSubmitSuccessful)}
      type='submit'
    >
      <Icon />
      {text}
    </button>
  )
}

type ButtonContentOptions = 'default' | 'loading' | 'error' | 'success'
const ButtonContentMap: Record<
  ButtonContentOptions,
  { Icon: Icon; text: string }
> = {
  default: { Icon: SendIcon, text: 'Send Order' },
  loading: { Icon: SyncIcon, text: 'Sending Order...' },
  error: { Icon: WarningIcon, text: 'Please Try Again.' },
  success: { Icon: CheckIcon, text: 'Order Received!' }
}

export default Order
