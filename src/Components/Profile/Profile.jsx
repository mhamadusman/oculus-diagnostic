import React, { useState, useEffect } from "react";
import { Pencil as PencilIcon, Camera as CameraIcon } from "lucide-react";
import { useAuth } from '../Auth/AuthContext/AuthContext';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    hospital: "",
    license: "",
    photo: "",
    specialty : ""
  });
  
  const { currentUser, updateProfile, refreshUserData } = useAuth();
  
  // Immediately sync state with currentUser on component mount and when currentUser changes
  useEffect(() => {
    console.log("Current user in useEffect:", currentUser);
    
    // Set loading to true only on first render
    if (loading) {
      loadUserData();
    }
  }, [currentUser]); // Only depend on currentUser changes
  
  const loadUserData = async () => {
    try {
      // Try to use currentUser first if available
      if (currentUser && Object.keys(currentUser).length > 0) {
        console.log("Using existing currentUser data in loadUserData api current:", currentUser);
        updateProfileFromUser(currentUser);
        setLoading(false);
      } else {
        // Otherwise, fetch fresh data
        console.log("Fetching fresh user data...");
        const userData = await refreshUserData();
        console.log("Fresh user data received:", userData);
        if (userData) {
          updateProfileFromUser(userData);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setLoading(false);
    }
  };
  
  // Helper function to update profile state from user object
  const updateProfileFromUser = (user) => {
    console.log("Updating profile pic from current user:", user);
    if (!user) return;
    
    // Get the photo URL and prepend base URL if it's a relative path
    let photoUrl = user.doctor?.profile_picture || user.profile_picture || "";
    
    // Check if the photo URL is a relative path starting with "/"
    if (photoUrl && photoUrl.startsWith("/")) {
      // Replace this with your actual API base URL
      const baseUrl = "http://localhost:8000/api"; // or process.env.REACT_APP_API_URL
      photoUrl = `${baseUrl}${photoUrl}`;
    }
    
    const updatedProfile = {
      name: `${user.user.first_name || ""} ${user.user.last_name || ""}`.trim() || "",
      position: user.doctor?.role || user.role || "",
      email: user.user.email || "",
      phone: user.user.phone || "",
      hospital: user.doctor?.hospital || user.hospital || "",
      license: user.doctor?.license_number || user.license_number || "",
      speciality: user.doctor?.specialty || user.specialty || "",
      photo: photoUrl
    };
    
    console.log("Setting profile data to:", updatedProfile);
    setProfileData(updatedProfile);
  };
  
  // Handle profile picture upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
  if (file) {
    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
    
    setLoading(true);
    try {
      const formData = new FormData();
      // Change this line - remove the nested structure
      formData.append('profile_picture', file);
      
      await updateProfile(formData);
      await loadUserData(); // Reload user data after update
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Parse full name into first_name and last_name
      const nameParts = profileData.name.trim().split(' ');
      const first_name = nameParts[0] || '';
      const last_name = nameParts.slice(1).join(' ') || '';
      
      const updateData = {
        first_name,
        last_name,
        email: profileData.email,
        phone: profileData.phone,
        doctor: {
          hospital: profileData.hospital || '',
          role: profileData.position || '',
          license_number: profileData.license || ''
          
        }
      };
      
      console.log("Updating profile with:", updateData);
      const updatedUserData = await updateProfile(updateData);
      // No need to call loadUserData again since we have the updated data
      
      // Update the profile data directly with the response
      if (updatedUserData) {
        updateProfileFromUser(updatedUserData);
      }
      
      setIsEditing(false);
      alert("Profile updated successfully!");
      
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  // Debug output
  useEffect(() => {
    console.log("Profile data updated:", profileData);
  }, [profileData]);
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>Loading profile...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:mt-14 mt-0">
      <main className="container mx-auto px-4 py-3 lg:px-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 relative">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-gray-100 rounded-full"
              aria-label={isEditing ? "Cancel editing" : "Edit profile"}
            >
              <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>

            {/* Profile Photo Section */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {profileData.photo ? (
                    <img src={profileData.photo} alt="Profile not uploaded" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="text-3xl sm:text-4xl text-gray-400">DR</span>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-gray-900 p-1.5 sm:p-2 rounded-full cursor-pointer">
                    <CameraIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handlePhotoUpload}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-gray-900 text-center">{profileData.name || "Doctor"}</h2>
              <p className="text-gray-600 text-center">{profileData.position || "Position"}</p>
              <p className="text-sm text-gray-500 mt-1 text-center">{profileData.hospital || "Hospital"}</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Hospital
                  </label>
                  <input
                    type="text"
                    value={profileData.hospital}
                    onChange={(e) => setProfileData({...profileData, hospital: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={profileData.license}
                    onChange={(e) => setProfileData({...profileData, license: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Speciality
                  </label>
                  <input
                    type="text"
                    value={profileData.speciality}
                    onChange={(e) => setProfileData({...profileData, speciality: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-gray-900 to-gray-400 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Professional Info Section */}
          <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
                <p className="text-gray-600">Medical License</p>
                <p className="text-gray-900 font-medium">{profileData.license || "Not provided"}</p>
              </div>
              <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
                <p className="text-gray-600">Contact Email</p>
                <p className="text-gray-900 font-medium">{profileData.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact Phone</p>
                <p className="text-gray-900 font-medium">{profileData.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-gray-600">Hospital</p>
                <p className="text-gray-900 font-medium">{profileData.hospital || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;