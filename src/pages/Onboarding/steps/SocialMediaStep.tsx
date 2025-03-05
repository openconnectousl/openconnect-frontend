import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProfileOnboardingData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowLeft, Check, Github, Linkedin, Facebook } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Spinner from '@/components/Spinner/Spinner.component'

interface SocialMediaStepProps {
  formData: ProfileOnboardingData
  updateFormData: (data: Partial<ProfileOnboardingData>) => void
  prevStep: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

const socialMediaSchema = z.object({
  linkedin: z.string().url("Please enter a valid URL")
    .nullish() // Allow null or undefined
    .transform(val => val === '' ? undefined : val), // Transform empty string to undefined
  github: z.string().url("Please enter a valid URL")
    .nullish()
    .transform(val => val === '' ? undefined : val),
  fb: z.string().url("Please enter a valid URL")
    .nullish()
    .transform(val => val === '' ? undefined : val),
})

export function SocialMediaStep({ 
  formData, 
  updateFormData, 
  prevStep,
  onSubmit,
  isSubmitting 
}: SocialMediaStepProps) {
  const form = useForm<z.infer<typeof socialMediaSchema>>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      linkedin: formData.linkedin && formData.linkedin.trim() !== '' ? formData.linkedin : undefined,
      github: formData.github && formData.github.trim() !== '' ? formData.github : undefined,
      fb: formData.fb && formData.fb.trim() !== '' ? formData.fb : undefined,
    }
  })
  
    function handleSubmit(values: z.infer<typeof socialMediaSchema>) {
    // Log what we're submitting for debugging
    console.log("Social media values before processing:", values);
    
    // Process values to ensure empty strings become undefined
    const processedValues = {
      linkedin: values.linkedin && values.linkedin.trim() !== '' ? values.linkedin : undefined,
      github: values.github && values.github.trim() !== '' ? values.github : undefined,
      fb: values.fb && values.fb.trim() !== '' ? values.fb : undefined
    };
    
    console.log("Social media values after processing:", processedValues);
    
    // Update form data
    updateFormData(processedValues);
    
    // Submit the form
    onSubmit();
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-2">Connect Your Social Profiles</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Link your social media accounts to enhance your professional network.
            This step is optional but recommended.
          </p>
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5" /> LinkedIn Profile
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Github className="h-5 w-5" /> GitHub Profile
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fb"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Facebook className="h-5 w-5" /> Facebook Profile
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://facebook.com/username" {...field} />
                </FormControl>
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
          <Button type="submit" disabled={isSubmitting} className="flex items-center">
            {isSubmitting ? (
              <>
                <Spinner /> Saving...
              </>
            ) : (
              <>
                Complete Profile <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}