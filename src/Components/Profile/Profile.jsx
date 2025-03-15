import React, { useState } from "react";
import { Pencil as PencilIcon, Camera as CameraIcon } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [doctor, setDoctor] = useState({
    name: "Dr. Emily Carter",
    position: "Senior Ophthalmologist",
    email: "emily.carter@oculus.com",
    phone: "+1 (555) 123-4567",
    hospital: "City Eye Center",
    license: "MED123456",
    photo: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add profile update logic here
  };

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
                  {doctor.photo ? (
                    <img src={doctor.photo} alt="Profile" className="w-full h-full object-cover" />
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
                      onChange={(e) => {/* Handle photo upload */}}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-gray-900 text-center">{doctor.name}</h2>
              <p className="text-gray-600 text-center">{doctor.position}</p>
              <p className="text-sm text-gray-500 mt-1 text-center">{doctor.hospital}</p>
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
                    value={doctor.name}
                    onChange={(e) => setDoctor({...doctor, name: e.target.value})}
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
                    value={doctor.position}
                    onChange={(e) => setDoctor({...doctor, position: e.target.value})}
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
                    value={doctor.email}
                    onChange={(e) => setDoctor({...doctor, email: e.target.value})}
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
                    value={doctor.phone}
                    onChange={(e) => setDoctor({...doctor, phone: e.target.value})}
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
                    value={doctor.hospital}
                    onChange={(e) => setDoctor({...doctor, hospital: e.target.value})}
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
                    value={doctor.license}
                    onChange={(e) => setDoctor({...doctor, license: e.target.value})}
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
                  >
                    Save Changes
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
                <p className="text-gray-900 font-medium">{doctor.license}</p>
              </div>
              <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
                <p className="text-gray-600">Contact Email</p>
                <p className="text-gray-900 font-medium">{doctor.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact Phone</p>
                <p className="text-gray-900 font-medium">{doctor.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Hospital</p>
                <p className="text-gray-900 font-medium">{doctor.hospital}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;