'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { submitApplication } from './actions';

export default function ApplyPage() {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [dragActive, setDragActive] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    cityCountry: '',
    instagram: '',
    height: '',
    bust: '',
    waist: '',
    hips: '',
    shoeSize: '',
  });

  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string | null }>({
    headshot: null,
    profile: null,
    waistUp: null,
    fullLength: null,
  });

  const [imageFiles, setImageFiles] = useState<{ [key: string]: File | null }>({
    headshot: null,
    profile: null,
    waistUp: null,
    fullLength: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [heightWarning, setHeightWarning] = useState(false);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'height') {
      const heightNum = parseInt(value);
      if (heightNum > 0 && heightNum < 160) {
        setHeightWarning(true);
      } else {
        setHeightWarning(false);
      }
    }
  };

  const handleImageUpload = (type: string, file: File) => {
    if (!file.type.startsWith('image/')) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Please upload images under 10MB.");
      return;
    }

    setImageFiles((prev) => ({ ...prev, [type]: file }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreviews((prev) => ({ ...prev, [type]: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(type);
  };

  const handleDragLeave = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(type, file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(type, file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missingFiles = Object.values(imageFiles).some(file => file === null);
    if (missingFiles) {
      alert("Please upload all required polaroids.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('Uploading images...');

    try {
      const uploadedUrls: { [key: string]: string } = {};
      const imageEntries = Object.entries(imageFiles);

      for (let i = 0; i < imageEntries.length; i++) {
        const [key, file] = imageEntries[i];
        if (file) {
          setSubmitStatus(`Uploading ${key} (${i + 1}/${imageEntries.length})...`);
          uploadedUrls[key] = await uploadToCloudinary(file);
        }
      }

      setSubmitStatus('Sending application...');

      const result = await submitApplication({
        ...formData,
        images: {
          headshot: uploadedUrls.headshot,
          profile: uploadedUrls.profile,
          waistUp: uploadedUrls.waistUp,
          fullLength: uploadedUrls.fullLength,
        },
      });

      if (result.success) {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitStatus('');
    }
  };

  const triggerFileUpload = (type: string) => {
    const input = fileInputRefs.current[type];
    if (input) {
      input.click();
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-alabaster flex items-center justify-center px-6 py-20 animate-fade-in w-full">
        <div className="max-w-[500px] mx-auto text-center space-y-12">
          <h1
            className="text-charcoal"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 200,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            RECEIVED.
          </h1>

          <div
            className="text-charcoal space-y-6 leading-relaxed"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: '1rem',
              lineHeight: '1.8',
            }}
          >
            <p>
              Your profile has been placed on the Director&apos;s desk. Due to the volume of submissions,
              we only contact successful candidates.
            </p>
            <p>
              If you do not hear from us within 14 days, please continue to pursue your journey.
            </p>
          </div>

          <div className="pt-12 border-t border-clay/20 w-1/2 mx-auto">
            <div
              className="text-charcoal italic opacity-80"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 400,
                fontSize: '1.5rem',
              }}
            >
              — Naath Model Management
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-alabaster py-24 md:py-32 px-6 w-full overflow-x-hidden">
      <div className="max-w-[500px] mx-auto w-full">
        <section className="mb-24 text-center animate-fade-in">
          <h1
            className="text-charcoal mb-8 leading-none"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 200,
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            THE OPEN CALL.
          </h1>

          <div
            className="text-stone mb-10 leading-relaxed max-w-sm mx-auto"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: '0.875rem',
              lineHeight: '1.8',
            }}
          >
            <p className="mb-4">
              We are looking for unique faces, not perfection. No makeup. Natural light. Simple clothes.
            </p>
            <p>Show us who you are when the world isn&apos;t watching.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="text-charcoal hover:text-clay transition-colors uppercase border-b border-transparent hover:border-clay pb-1 outline-none"
            style={{
              fontFamily: 'var(--font-montreal)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
            }}
          >
            {showGuidelines ? '[-]' : '[+]'} VIEW SUBMISSION GUIDELINES
          </button>

          <div
            className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showGuidelines ? 'max-h-[800px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'
              }`}
          >
            <div className="border-t border-clay/20 pt-10 space-y-8">
              <h3
                className="text-charcoal text-center"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontWeight: 200,
                  fontSize: '1.75rem',
                }}
              >
                Required Poses
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Profile', src: '/assets/images/apply/profile.webp' },
                  { label: 'Front', src: '/assets/images/apply/front.webp' },
                  { label: '3/4 View', src: '/assets/images/apply/3-4.webp' },
                  { label: 'Full Body', src: '/assets/images/apply/full-body.webp' },
                ].map((pose) => (
                  <div key={pose.label} className="space-y-2">
                    <div className="relative aspect-[3/4] border border-clay/30 overflow-hidden bg-bone/30">
                      <Image
                        src={pose.src}
                        alt={`${pose.label} pose reference`}
                        fill
                        className="object-contain grayscale"
                        sizes="(max-width: 768px) 50vw, 200px"
                      />
                    </div>
                    <span
                      className="block text-stone uppercase text-center opacity-60"
                      style={{
                        fontFamily: 'var(--font-montreal)',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {pose.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-24 md:space-y-32 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <section className="space-y-12">
            <h2
              className="text-charcoal mb-8 border-b border-clay/10 pb-4"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontSize: '1.75rem',
                letterSpacing: '-0.01em',
              }}
            >
              I. The Identity
            </h2>

            <div className="space-y-10">
              {[
                { key: 'fullName', label: 'FULL NAME', type: 'text' },
                { key: 'age', label: 'AGE', type: 'number' },
                { key: 'cityCountry', label: 'CITY / COUNTRY', type: 'text' },
                { key: 'instagram', label: 'INSTAGRAM HANDLE', type: 'text' },
              ].map((field) => (
                <div key={field.key} className="relative group">
                  <label
                    className="block mb-3 text-stone uppercase transition-colors group-focus-within:text-charcoal"
                    style={{
                      fontFamily: 'var(--font-montreal)',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-clay/40 focus:outline-none focus:ring-0 focus:border-charcoal transition-all duration-300 pb-2 rounded-none appearance-none"
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: '1.25rem',
                      color: 'var(--charcoal)',
                    }}
                    required
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-12">
            <h2
              className="text-charcoal mb-8 border-b border-clay/10 pb-4"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontSize: '1.75rem',
                letterSpacing: '-0.01em',
              }}
            >
              II. The Metric
            </h2>

            <div className="space-y-10">
              {[
                { key: 'height', label: 'HEIGHT (CM)', type: 'number' },
                { key: 'bust', label: 'BUST (CM)', type: 'number' },
                { key: 'waist', label: 'WAIST (CM)', type: 'number' },
                { key: 'hips', label: 'HIPS (CM)', type: 'number' },
                { key: 'shoeSize', label: 'SHOE SIZE', type: 'text' },
              ].map((field) => (
                <div key={field.key} className="relative group">
                  <label
                    className="block mb-3 text-stone uppercase transition-colors group-focus-within:text-charcoal"
                    style={{
                      fontFamily: 'var(--font-montreal)',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-clay/40 focus:outline-none focus:ring-0 focus:border-charcoal transition-all duration-300 pb-2 rounded-none appearance-none"
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: '1.25rem',
                      color: 'var(--charcoal)',
                    }}
                    required
                  />
                </div>
              ))}
            </div>

            <div className={`overflow-hidden transition-all duration-500 ${heightWarning ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div
                className="text-stone text-sm leading-relaxed border-l border-clay pl-4 py-1 italic"
                style={{
                  fontFamily: 'var(--font-montreal)',
                  fontSize: '0.8rem',
                }}
              >
                Naath represents editorial talent. Exceptions are rare, but unique faces are always
                considered.
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <h2
              className="text-charcoal mb-8 border-b border-clay/10 pb-4"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 200,
                fontSize: '1.75rem',
                letterSpacing: '-0.01em',
              }}
            >
              III. The Polaroids
            </h2>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {[
                { key: 'headshot', label: 'HEADSHOT' },
                { key: 'profile', label: 'PROFILE' },
                { key: 'waistUp', label: 'WAIST UP' },
                { key: 'fullLength', label: 'FULL LENGTH' },
              ].map((frame) => (
                <div key={frame.key} className="space-y-3">
                  <label
                    className="block text-stone uppercase text-center opacity-70"
                    style={{
                      fontFamily: 'var(--font-montreal)',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                    }}
                  >
                    {frame.label}
                  </label>

                  <div
                    className={`relative aspect-[3/4] border border-dashed transition-all duration-300 cursor-pointer overflow-hidden group 
                      ${dragActive === frame.key
                        ? 'border-charcoal bg-clay/10 scale-[0.98]'
                        : 'border-clay/40 bg-bone/30 hover:bg-bone/50 hover:border-clay'
                      }`}
                    onDragEnter={(e) => handleDragEnter(e, frame.key)}
                    onDragLeave={(e) => handleDragLeave(e, frame.key)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, frame.key)}
                    onClick={() => triggerFileUpload(frame.key)}
                  >
                    {imagePreviews[frame.key] ? (
                      <div className="absolute inset-0 transition-opacity duration-500">
                        <img
                          src={imagePreviews[frame.key]!}
                          alt={frame.label}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 text-alabaster font-montreal text-[10px] uppercase tracking-widest bg-charcoal/80 px-3 py-1.5 backdrop-blur-md">Replace</span>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
                        <span className={`text-2xl font-thin transition-colors ${dragActive === frame.key ? 'text-charcoal' : 'text-clay/60'}`}>+</span>
                        <span
                          className={`uppercase transition-colors ${dragActive === frame.key ? 'text-charcoal' : 'text-clay/60'}`}
                          style={{
                            fontFamily: 'var(--font-montreal)',
                            fontSize: '9px',
                            letterSpacing: '0.15em',
                          }}
                        >
                          {dragActive === frame.key ? 'DROP FILE' : 'DROP / TAP'}
                        </span>
                      </div>
                    )}
                    <input
                      ref={(el) => { fileInputRefs.current[frame.key] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileInput(e, frame.key)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-12 pb-24">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-charcoal text-alabaster py-6 uppercase transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-clay active:scale-[0.98] outline-none"
              style={{
                fontFamily: 'var(--font-montreal)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.25em',
              }}
            >
              {isSubmitting ? (submitStatus || 'PROCESSING...') : 'SEND TO BOARD'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}