"use client";

import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  Settings, 
  CreditCard,
  LogOut,
  Edit3,
  Shield,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function ProfileSection({ icon, title, children, onClick }: ProfileSectionProps) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-400 hover:shadow-lg transition-all duration-500 ease-out cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      </div>
      <div className="text-zinc-600">
        {children}
      </div>
    </div>
  );
}

export default function BuyerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alexander Hamilton",
    email: "alex@hweibo.com",
    phone: "+255 712 345 678",
    location: "Manhattan, New York",
    memberSince: "January 2024"
  });

  return (
    <div className="min-h-screen bg-zinc-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900">Profile</h1>
            <p className="text-zinc-500 mt-2">Manage your account and preferences</p>
          </div>
          <Button 
            variant="outline" 
            className="rounded-full gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
              <User className="w-12 h-12 text-zinc-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-zinc-900">{profile.name}</h2>
              <p className="text-zinc-500 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {profile.email}
              </p>
              <p className="text-zinc-400 text-sm mt-2">Member since {profile.memberSince}</p>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ProfileSection 
            icon={<Phone className="w-6 h-6" />} 
            title="Contact Information"
          >
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-400" />
                {profile.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-400" />
                {profile.location}
              </p>
            </div>
          </ProfileSection>

          <ProfileSection 
            icon={<Package className="w-6 h-6" />} 
            title="Orders"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-zinc-900">12</p>
                <p className="text-sm text-zinc-500">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">3</p>
                <p className="text-sm text-zinc-500">In Transit</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">9</p>
                <p className="text-sm text-zinc-500">Delivered</p>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection 
            icon={<Heart className="w-6 h-6" />} 
            title="Wishlist"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-zinc-900">8</p>
                <p className="text-sm text-zinc-500">Saved Items</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                View All
              </Button>
            </div>
          </ProfileSection>

          <ProfileSection 
            icon={<CreditCard className="w-6 h-6" />} 
            title="Payment Methods"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-zinc-800 rounded" />
                <span className="text-sm">•••• 4242</span>
                <span className="text-xs bg-zinc-100 px-2 py-1 rounded">Default</span>
              </div>
              <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-black p-0">
                + Add new card
              </Button>
            </div>
          </ProfileSection>

          <ProfileSection 
            icon={<Bell className="w-6 h-6" />} 
            title="Notifications"
          >
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300" />
                <span className="text-sm">Order updates</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300" />
                <span className="text-sm">Promotions and deals</span>
              </label>
            </div>
          </ProfileSection>

          <ProfileSection 
            icon={<Settings className="w-6 h-6" />} 
            title="Account Settings"
          >
            <div className="space-y-2">
              <button className="block text-sm text-zinc-600 hover:text-black transition-colors">
                Change password
              </button>
              <button className="block text-sm text-zinc-600 hover:text-black transition-colors">
                Privacy settings
              </button>
              <button className="block text-sm text-zinc-600 hover:text-black transition-colors">
                Language preferences
              </button>
            </div>
          </ProfileSection>
        </div>

        {/* Logout */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="rounded-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
