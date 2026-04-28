import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface FormWrapperProps<T extends z.ZodTypeAny> {
  schema: T
  onSubmit: (data: z.infer<T>) => void
  children: React.ReactNode
  defaultValues?: z.infer<T>
}

export function FormWrapper<T extends z.ZodTypeAny>({ schema, onSubmit, children, defaultValues }: FormWrapperProps<T>) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  )
}