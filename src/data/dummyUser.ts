// src/constants/dummyUser.ts
import { User, UserProfileResponse } from '@/types'

export const dummyUser: User = {
    id: 'dev-user-001',
    email: 'devuser@example.com',
    username: 'devuser',
    user_type: 'admin',
    has_completed_profile: true,
    firstname: 'Dev',
    lastname: 'User',
    title: 'Frontend Developer',
    bio: 'This is a dummy developer user for development environment.',
    faculty: 'Engineering',
    program: 'Computer Science',
    avatar: '',
    skills: ['React', 'TypeScript', 'Node.js'],
    linkedin: 'https://linkedin.com/in/devuser',
    github: 'https://github.com/devuser',
    fb: 'https://facebook.com/devuser',
    uni: 'University of Development',
    year: '4',
    degree: 'BSc (Hons) in Software Engineering',
    mobile: '+94770000000',
    updated_at: new Date().toISOString(),
    created_at: '',
    activated: false,
    version: 0,
}

export const dummyProfile: UserProfileResponse = {
    profile: dummyUser,
}
