import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/Card"
import { Input } from '../components/Input'
import { Label } from '../components/Label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [age, setAge] = useState('')
  const [ageError, setAgeError] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleAgeChange = (e) => {
    const value = e.target.value
    setAge(value)
    if (value < 18) {
      setAgeError('You must be at least 18 years old to register.')
    } else {
      setAgeError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (age >= 18) {
      setIsRegistered(true)
      // Here, you would typically handle the registration logic (e.g., API call)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-gray-400">
            Create an account by filling out the information below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-gray-200">Full Name</Label>
              <Input 
                id="fullname" 
                type="text" 
                placeholder="Name" 
                required 
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="username123" 
                required 
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="bg-gray-700 border-gray-600 text-gray-100 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-200">Age</Label>
              <Input 
                id="age" 
                type="number" 
                placeholder="18" 
                value={age}
                onChange={handleAgeChange}
                required 
                className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              />
              {ageError && <p className="text-red-500 text-sm">{ageError}</p>}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#753efc] hover:bg-[#753efc] text-white" 
              disabled={ageError}
            >
              Sign Up
            </Button>
          </form>
          {isRegistered && (
            <div className="text-green-500 text-center mt-4">
              Registration successful! Welcome!
            </div>
          )}
          <div className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#753efc] hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          {/* Any footer content can go here, if needed */}
        </CardFooter>
      </Card>
    </div>
  )
}