import { SuccessMessageModalProps } from '@/types'
import {
    CheckCircle2,
    Mail,
    ArrowRight,
    Key,
} from 'lucide-react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const SuccessMessage: React.FC<SuccessMessageModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    email,
    type = 'signup',
}) => {
    const isAccountExists =
        type === 'accountExists' ||
        title.toLowerCase().includes('already exists')
    const isPasswordReset =
        type === 'passwordReset' ||
        title.toLowerCase().includes('check your email')
    const isPasswordResetComplete = type === 'passwordResetComplete'

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative"
                >
                    <div
                        className={`w-full ${
                            isAccountExists
                                ? 'bg-blue-600'
                                : isPasswordReset || isPasswordResetComplete
                                  ? 'bg-purple-600'
                                  : 'bg-green-600'
                        } p-4 flex justify-center`}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                            }}
                            className="rounded-full bg-white p-3"
                        >
                            {isAccountExists ? (
                                <Mail className="h-8 w-8 text-blue-600" />
                            ) : isPasswordReset || isPasswordResetComplete ? (
                                <Key className="h-8 w-8 text-purple-600" />
                            ) : (
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            )}
                        </motion.div>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col items-center text-center">
                            <motion.h2
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl font-semibold text-gray-900 mb-2"
                            >
                                {title}
                            </motion.h2>

                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-600 mb-6"
                            >
                                {description}
                            </motion.div>

                            {/* Existing account case */}
                            {isAccountExists && email && (
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full"
                                >
                                    <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
                                        <p className="font-medium text-gray-700">
                                            Email address:
                                        </p>
                                        <p className="text-blue-600 font-bold">
                                            {email}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <Button
                                            onClick={onClose}
                                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                                        >
                                            Sign In with this Email
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>

                                        <Link
                                            to="/forgot-password"
                                            className="w-full"
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full border-blue-200 text-blue-600 flex items-center justify-center"
                                            >
                                                Forgot Password?
                                                <Key className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}

                            {/* Password reset case - sending email */}
                            {isPasswordReset && (
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full"
                                >
                                    {email && (
                                        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
                                            <p className="font-medium text-gray-700">
                                                Email sent to:
                                            </p>
                                            <p className="text-purple-600 font-bold">
                                                {email}
                                            </p>
                                        </div>
                                    )}

                                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4 text-left">
                                        <p className="text-purple-700 font-medium">
                                            We've sent password reset
                                            instructions to your email. Please
                                            check your inbox for a link to reset
                                            your password.
                                        </p>
                                        <p className="text-purple-600 text-sm mt-2">
                                            <span className="font-medium">
                                                Note:
                                            </span>{' '}
                                            The link will expire after 45
                                            minutes for security reasons.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <Button
                                            onClick={onClose}
                                            className="bg-purple-600 hover:bg-purple-700 text-white"
                                        >
                                            Return to Login
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Password reset complete case */}
                            {isPasswordResetComplete && (
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full"
                                >
                                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 text-left">
                                        <p className="text-green-700 font-medium">
                                            Your password has been successfully reset!
                                        </p>
                                        <p className="text-green-600 text-sm mt-2">
                                            You can now log in to your account using your new password.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <Button
                                            onClick={onClose}
                                            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
                                        >
                                            Go to Login
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Sign up success case */}
                            {!isAccountExists && !isPasswordReset && !isPasswordResetComplete && (
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full"
                                >
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 text-left">
                                        <p className="text-blue-700 font-medium">
                                            We've sent a verification link to
                                            your email address. Please check
                                            your inbox and click the link to
                                            activate your account.
                                        </p>
                                        <p className="text-blue-600 text-sm mt-2">
                                            <span className="font-medium">
                                                Tip:
                                            </span>{' '}
                                            If you don't see the email, please
                                            check your spam or junk folder.
                                        </p>
                                    </div>

                                    <Button
                                        onClick={onClose}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Got it, thanks!
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

export default SuccessMessage