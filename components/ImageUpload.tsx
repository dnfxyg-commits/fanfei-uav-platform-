import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
  height?: string;
}

export default function ImageUpload({ value, onChange, disabled, className = '', height = 'h-48' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('请选择要上传的图片。');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. 上传到 Supabase Storage 'images' bucket
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. 获取公开访问 URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (data) {
        onChange(data.publicUrl);
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setError(error.message || '上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className={`w-full ${className}`}>
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img 
            src={value} 
            alt="Uploaded" 
            className={`w-full ${height} object-cover`}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={removeImage}
              disabled={disabled}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="删除图片"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <label className={`
            flex flex-col items-center justify-center w-full ${height}
            border-2 border-dashed border-gray-300 rounded-lg 
            cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors
            ${uploading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <>
                  <Loader2 className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
                  <p className="mb-2 text-sm text-gray-500">正在上传...</p>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">点击上传</span> 或拖拽图片到此处
                  </p>
                  <p className="text-xs text-gray-500">支持 PNG, JPG, GIF</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={uploadImage}
              disabled={uploading || disabled}
            />
          </label>
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
