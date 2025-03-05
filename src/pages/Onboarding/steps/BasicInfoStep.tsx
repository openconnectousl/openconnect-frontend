import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProfileOnboardingData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowRight } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface BasicInfoStepProps {
  formData: ProfileOnboardingData
  updateFormData: (data: Partial<ProfileOnboardingData>) => void
  nextStep: () => void
}

const basicInfoSchema = z.object({
    firstname: z.string().min(2, "First name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),
  title: z.string().min(2, "Professional title is required"),
  mobile: z.string().optional(),
  bio: z.string().min(10, "Please write at least a brief introduction").max(300, "Bio cannot exceed 300 characters").optional()
})

export function BasicInfoStep({ formData, updateFormData, nextStep }: BasicInfoStepProps) {
  const form = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
        firstname: formData.firstname || '',
        lastname: formData.lastname || '',

      title: formData.title || '',
      mobile: formData.mobile || '',
      bio: formData.bio || ''
    }
  })
  
  function onSubmit(values: z.infer<typeof basicInfoSchema>) {
    updateFormData(values)
    nextStep()
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
                  />
                  <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Software Engineer, Student, Professor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your contact number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Me</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell others a bit about yourself..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="flex items-center">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}