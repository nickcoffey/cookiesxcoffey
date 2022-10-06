import { useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '../components'
import { maskPhone, removePhoneMask, httpPost } from '../utils'
import type { ChangeEvent } from 'react'
import type {
  EmailRequestBody,
  EmailResponseBody
} from '../pages/api/sendEmail'

type Inputs = {
  name: string
  email: string
  phone: string
  deliveryDate: Date
  cookieCount: number
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
  cookieCount: yup
    .number()
    .typeError('Please enter how many cookies you would like.')
    .min(1, 'Please request at least one cookie.')
    .max(500, 'The number of cookies entered is too high.')
    .required('Please enter how many cookies you would like.'),
  message: yup
    .string()
    .max(1000, 'The message entered is too long.')
    .required('Please enter a brief message about your order.')
})

export const OrderSection = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    watch,
    setValue,
    reset
  } = useForm<Inputs>({ mode: 'onSubmit', resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await httpPost<EmailRequestBody, EmailResponseBody>('api/sendEmail', data)
  }

  if (isSubmitSuccessful) {
    setTimeout(reset, 3000)
  }

  const phoneWatch = watch('phone')
  const deliveryDateWatch = watch('deliveryDate')

  return (
    <section id='order' className='p-4 pt-0 mt-4'>
      <h2 className='mb-4 text-3xl text-center text-darkprimary'>
        Place an Order
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
        ref={formRef}
      >
        <Input
          label='Name'
          icon='person'
          errorMsg={errors.name?.message}
          inputProps={register('name')}
          required
        />
        <Input
          label='Email'
          icon='email'
          errorMsg={errors.email?.message}
          inputProps={register('email')}
          required
        />
        <Input
          label='Phone'
          icon='phone'
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
        <Input
          label='Delivery Date'
          icon='calendar_month'
          errorMsg={errors.deliveryDate?.message}
          inputProps={{
            ...register('deliveryDate'),
            type: 'date'
          }}
          watchedValue={deliveryDateWatch}
          required
        />
        <Input
          label='Number of Cookies'
          icon='tag'
          errorMsg={errors.cookieCount?.message}
          inputProps={{ ...register('cookieCount'), type: 'number' }}
          required
        />
        <Input
          label='Message'
          icon='chat'
          errorMsg={errors.message?.message}
          textAreaProps={register('message')}
          required
        />
        <OrderButton {...{ isSubmitting, isSubmitSuccessful, isSubmitted }} />
      </form>
    </section>
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

  const { icon, text } = btnContent
  return (
    <button
      className='flex items-center justify-center w-full gap-2 py-3 mt-2 transition duration-150 rounded-md bg-primary disabled:cursor-not-allowed disabled:hover:bg-lightprimary disabled:bg-lightprimary md:hover:bg-darkprimary md:hover:text-white'
      disabled={isSubmitting || (isSubmitted && isSubmitSuccessful)}
      type='submit'
    >
      <span className='material-symbols-outlined'>{icon}</span>
      {text}
    </button>
  )
}

type ButtonContentOptions = 'default' | 'loading' | 'error' | 'success'
const ButtonContentMap: Record<
  ButtonContentOptions,
  { icon: string; text: string }
> = {
  default: { icon: 'send', text: 'Send Order' },
  loading: { icon: 'sync', text: 'Sending Order...' },
  error: { icon: 'warning', text: 'Please Try Again.' },
  success: { icon: 'check', text: 'Order Received!' }
}
