import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { photoService } from '@/lib/firestore';
import { useToast } from '@/hooks/use-toast';
import { Camera, X } from 'lucide-react';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  path: string;
  maxPhotos?: number;
}

export function PhotoUpload({ photos, onPhotosChange, path, maxPhotos = 4 }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxPhotos - photos.length;
    const filesToUpload = files.slice(0, remainingSlots);

    try {
      const uploadPromises = filesToUpload.map(file => 
        photoService.uploadPhoto(file, path)
      );
      
      const uploadedUrls = await Promise.all(uploadPromises);
      onPhotosChange([...photos, ...uploadedUrls]);
      
      toast({
        title: "Photos Uploaded",
        description: `${uploadedUrls.length} photo(s) uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload photos. Please try again.",
        variant: "destructive",
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = async (index: number) => {
    try {
      const photoUrl = photos[index];
      await photoService.deletePhoto(photoUrl);
      
      const newPhotos = photos.filter((_, i) => i !== index);
      onPhotosChange(newPhotos);
      
      toast({
        title: "Photo Removed",
        description: "Photo has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <img 
              src={photo} 
              alt={`Upload ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid={`button-remove-photo-${index}`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        {photos.length < maxPhotos && (
          <div 
            className="border-2 border-dashed border-border rounded-lg h-24 flex flex-col items-center justify-center hover:border-primary transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            data-testid="button-add-photo"
          >
            <Camera className="h-6 w-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Add Photo</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
