import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProfileOnboardingData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EducationStepProps {
  formData: ProfileOnboardingData
  updateFormData: (data: Partial<ProfileOnboardingData>) => void
  nextStep: () => void
  prevStep: () => void
}

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  uni: z.string().min(1, "University/Institution is required"),
  faculty: z.string().min(1, "Faculty/Department is required"),
  program: z.string().min(1, "Program/Major is required"),
  year: z.string().min(1, "Year is required"),
})

export function EducationStep({ formData, updateFormData, nextStep, prevStep }: EducationStepProps) {
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: formData.degree || '',
      uni: formData.uni || '',
      faculty: formData.faculty || '',
      program: formData.program || '',
      year: formData.year || '',
    }
  })
  
  function onSubmit(values: z.infer<typeof educationSchema>) {
    updateFormData(values)
    nextStep()
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree/Certification</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Bachelor of Science, PhD, Certificate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="uni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University/Institution</FormLabel>
                <FormControl>
                  <Input placeholder="Name of your university or institution" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty/Department</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Faculty of Engineering" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program/Major</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Year</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="5th">5th Year</SelectItem>
                    <SelectItem value="Graduate">Graduate Student</SelectItem>
                    <SelectItem value="Postdoc">Postdoctoral Researcher</SelectItem>
                    <SelectItem value="Faculty">Faculty Member</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="flex items-center">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}