// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import { Eye, EyeOff, Smartphone, User } from 'lucide-react';

const LoginForm = ({ selectedRole, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '',
    phone: '',
    pin: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotifications();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock authentication - in real app, integrate with backend
      const userData = {
        role: selectedRole,
        name: getMockUserName(selectedRole, credentials.username || credentials.phone),
        id: `user_${Date.now()}`,
        phone: credentials.phone,
        facility: getMockFacility(selectedRole)
      };

      await login(userData);
      showNotification('Login successful!', 'success');
      onLoginSuccess?.();
    } catch (error) {
      showNotification('Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getMockUserName = (role, identifier) => {
    const names = {
      mother: 'Jane Atieno',
      'health-worker': 'David Omondi',
      hospital: 'Dr. Sarah Kimani',
      admin: 'System Administrator'
    };
    return names[role] || 'User';
  };

  const getMockFacility = (role) => {
    const facilities = {
      'health-worker': 'Kibera Community Health Unit',
      hospital: 'Kenyatta National Hospital',
      admin: 'Ministry of Health'
    };
    return facilities[role] || null;
  };

  const isMotherLogin = selectedRole === 'mother';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isMotherLogin ? (
            <>
              <Smartphone className="h-4 w-4 inline mr-1" />
              Phone Number *
            </>
          ) : (
            <>
              <User className="h-4 w-4 inline mr-1" />
              Username *
            </>
          )}
        </label>
        <input
          type={isMotherLogin ? "tel" : "text"}
          name={isMotherLogin ? "phone" : "username"}
          value={isMotherLogin ? credentials.phone : credentials.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder={isMotherLogin ? "254712345678" : "Enter your username"}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isMotherLogin ? "PIN *" : "Password *"}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name={isMotherLogin ? "pin" : "password"}
            value={isMotherLogin ? credentials.pin : credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder={isMotherLogin ? "Enter your 4-digit PIN" : "Enter your password"}
            required
            minLength={isMotherLogin ? 4 : 1}
            maxLength={isMotherLogin ? 4 : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {!isMotherLogin && (
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </button>
        </div>
      )}

      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        className="w-full"
      >
        Login to System
      </Button>

      {isMotherLogin && (
        <div className="text-center">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Don't have an account? Register here
          </button>
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Demo: Use any credentials to explore the system
        </p>
      </div>
    </form>
  );
};

export default LoginForm;