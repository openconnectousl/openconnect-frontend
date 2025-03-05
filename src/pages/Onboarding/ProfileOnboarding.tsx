// src/pages/Onboarding/ProfileOnboarding.tsx
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { BasicInfoStep } from './steps/BasicInfoStep'
import { EducationStep } from './steps/EducationStep'
import { SkillsStep } from './steps/SkillsStep'
import { SocialMediaStep } from './steps/SocialMediaStep'
import { ProfileOnboardingData, User } from '@/types'
import Spinner from '@/components/Spinner/Spinner.component'
import toast from 'react-hot-toast'

const initialData: ProfileOnboardingData = {
    firstname: '',
    lastname:'',
  title: '',
  faculty: '',
  program: '',
  degree: '',
  uni: '',
  mobile: '',
  bio: '',
  skills: [],
  linkedin: '',
  github: '',
  fb: ''
}

export default function ProfileOnboarding() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  
  // Pre-fill with any existing user data
  const [formData, setFormData] = useState<ProfileOnboardingData>({
    ...initialData,
    firstname: user?.firstname || user?.firstname && user?.lastname ? 
              `${user.firstname} ${user.lastname}` : 
              user?.username || '',
    title: user?.title || '',
    faculty: user?.faculty || '',
    program: user?.program || '',
    degree: user?.degree || '',
    uni: user?.uni || '',
    skills: user?.skills || [],
  })
  
  const steps = [
    { 
      title: 'Basic Information', 
      component: <BasicInfoStep 
        formData={formData} 
        updateFormData={(data) => setFormData({...formData, ...data})} 
        nextStep={() => setStep(2)} 
      /> 
    },
    { 
      title: 'Education', 
      component: <EducationStep 
        formData={formData} 
        updateFormData={(data) => setFormData({...formData, ...data})} 
        nextStep={() => setStep(3)} 
        prevStep={() => setStep(1)} 
      /> 
    },
    { 
      title: 'Skills & Interests', 
      component: <SkillsStep 
        formData={formData} 
        updateFormData={(data) => setFormData({...formData, ...data})} 
        nextStep={() => setStep(4)} 
        prevStep={() => setStep(2)} 
      /> 
    },
    { 
      title: 'Social Media', 
      component: <SocialMediaStep 
        formData={formData} 
        updateFormData={(data) => setFormData({...formData, ...data})} 
        prevStep={() => setStep(3)} 
        onSubmit={handleComplete}
        isSubmitting={isSubmitting}
      /> 
    },
  ]
  
    // src/pages/Onboarding/ProfileOnboarding.tsx
  async function handleComplete() {
    try {
      setIsSubmitting(true)
      
      // Convert formData to User update format
      const userData: Partial<User> = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        title: formData.title,
        faculty: formData.faculty,
        program: formData.program,
        degree: formData.degree,
        uni: formData.uni,
        mobile: formData.mobile,
        bio: formData.bio,
        skills: formData.skills,
        linkedin: formData.linkedin,
        github: formData.github,
        fb: formData.fb,
        hasCompletedProfile: true  // Make sure this is set to true
      }
      
      console.log('Submitting onboarding data:', userData);
      
      await updateProfile(userData)
      toast.success('Profile setup complete!')
      
      // We don't need to manually navigate - the AuthContext's updated
      // hasCompletedOnboarding state will trigger our route guards
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
      toast.error('Failed to save profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-8 shadow-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <p className="text-muted-foreground">Help others discover and connect with you</p>
          </div>
          
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex mb-4">
              {steps.map((s, i) => (
                <div key={i} className="flex-1">
                  <div className={`h-2 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div className="mt-2 flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i + 1 === step 
                        ? 'bg-blue-600 text-white'
                        : i + 1 < step
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      {i + 1 < step ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className="text-xs ml-2">{s.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Current step */}
          <div>
            {steps[step-1].component}
          </div>
        </Card>
      </div>
    </div>
  )
}