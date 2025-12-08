import { User, Mail, MapPin, Globe, FileText, Save, X, Sparkles, Camera, Upload, Image as ImageIcon, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { Page, UserProfile } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';

interface EditProfilePageProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
}

export function EditProfilePage({ isLoggedIn, onNavigate, userProfile, onUpdateProfile }: EditProfilePageProps) {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    bio: userProfile.bio,
    location: userProfile.location,
    website: userProfile.website,
  });

  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar);
  const [photoUrl, setPhotoUrl] = useState(userProfile.photoUrl);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(userProfile.coverPhotoUrl);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(userProfile.photoUrl);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(userProfile.coverPhotoUrl);
  
  // Crop states
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>('');
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  const avatars = ['👨‍💻', '👩‍💻', '🧑‍💼', '👨‍🔬', '👩‍🔬', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🥷', '👾', '🤖', '👽'];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <h2 className="text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-6">
            Anda harus login terlebih dahulu untuk mengedit profile
          </p>
          <motion.button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login Sekarang
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageToCrop(result);
        setShowCropModal(true);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl('');
    setPhotoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhotoUrl('');
    setCoverPhotoPreview('');
    if (coverFileInputRef.current) {
      coverFileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onUpdateProfile({
        ...formData,
        avatar: selectedAvatar,
        photoUrl: photoUrl,
        coverPhotoUrl: coverPhotoUrl,
      });
      setIsSaving(false);
      onNavigate('profile');
    }, 1000);
  };

  const handleCancel = () => {
    onNavigate('profile');
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area | null): Promise<string> => {
    if (!pixelCrop) return imageSrc;

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return imageSrc;
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL('image/jpeg', 0.95);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
      setCoverPhotoUrl(croppedImage);
      setCoverPhotoPreview(croppedImage);
      setShowCropModal(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageToCrop]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-white mb-2">Edit Profile</h1>
          <p className="text-gray-400">Update your personal information</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Upload */}
            <div>
              <label className="block text-gray-300 mb-3">
                Profile Photo
              </label>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl relative">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{selectedAvatar}</span>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all border border-purple-500/50 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </motion.button>
                    {photoPreview && (
                      <motion.button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 5MB</p>
                </div>
              </div>
            </div>

            {/* Cover Photo Upload */}
            <div>
              <label className="block text-gray-300 mb-3">
                Cover Photo
              </label>
              <div className="space-y-3">
                <div className="relative group">
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center relative">
                    {coverPhotoPreview ? (
                      <img 
                        src={coverPhotoPreview} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-white/50" />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => coverFileInputRef.current?.click()}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoUpload}
                    className="hidden"
                  />
                  <motion.button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all border border-purple-500/50 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Cover Photo
                  </motion.button>
                  {coverPhotoPreview && (
                    <motion.button
                      type="button"
                      onClick={handleRemoveCoverPhoto}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  )}
                </div>
                <p className="text-xs text-gray-500">Recommended: 1920x400px. JPG, PNG or GIF. Max size 5MB</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700 pt-6">
              <label className="block text-gray-300 mb-3">
                Or Choose Avatar
              </label>
              <div className="grid grid-cols-6 gap-3">
                {avatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-4xl p-4 rounded-lg border-2 transition-all ${
                      selectedAvatar === avatar
                        ? 'border-purple-400 bg-purple-400/10 scale-110'
                        : 'border-slate-600 hover:border-purple-400/50 bg-slate-900/50'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: selectedAvatar === avatar ? 1.1 : 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Full Name
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'name' ? { scale: 1.02 } : { scale: 1 }}
              >
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  placeholder="Your name"
                  required
                />
              </motion.div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'email' ? { scale: 1.02 } : { scale: 1 }}
              >
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
            </div>

            {/* Bio Field */}
            <div>
              <label htmlFor="bio" className="block text-gray-300 mb-2">
                Bio
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'bio' ? { scale: 1.02 } : { scale: 1 }}
              >
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('bio')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              </motion.div>
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="location" className="block text-gray-300 mb-2">
                Location
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'location' ? { scale: 1.02 } : { scale: 1 }}
              >
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  placeholder="Your location"
                />
              </motion.div>
            </div>

            {/* Website Field */}
            <div>
              <label htmlFor="website" className="block text-gray-300 mb-2">
                Website
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'website' ? { scale: 1.02 } : { scale: 1 }}
              >
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('website')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  placeholder="https://yourwebsite.com"
                />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-all shadow-lg shadow-purple-500/30 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSaving ? { scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' } : {}}
                whileTap={!isSaving ? { scale: 0.98 } : {}}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </span>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSaving ? { scale: 1.02 } : {}}
                whileTap={!isSaving ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-2">
                  <X className="w-5 h-5" />
                  Cancel
                </span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Crop Modal */}
      <AnimatePresence>
        {showCropModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCropModal(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-purple-500/30 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl">Crop Cover Photo</h2>
                <motion.button
                  type="button"
                  onClick={() => setShowCropModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Cropper Area */}
              <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden mb-6">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              {/* Zoom Controls */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 text-sm">Zoom</label>
                <div className="flex items-center gap-4">
                  <ZoomOut className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  />
                  <ZoomIn className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <motion.button
                  type="button"
                  onClick={() => setShowCropModal(false)}
                  className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  onClick={showCroppedImage}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Check className="w-5 h-5" />
                  Apply Crop
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
