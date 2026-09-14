import React, { useState, useRef } from 'react';
import { FaUpload, FaLink, FaTimes, FaImage, FaCheck } from 'react-icons/fa';

/**
 * Reusable ImageInput component:
 * Allows user to either upload a file from device (stored as Base64 Data URL)
 * OR paste a live Image URL, with live preview and optional quick presets.
 */
export default function ImageInput({
  value = '',
  onChange,
  label = 'Image',
  required = false,
  presetOptions = [],
  placeholder = 'https://images.unsplash.com/...',
  previewAspect = 'square' // 'square' | 'wide'
}) {
  const [mode, setMode] = useState(value && value.startsWith('data:') ? 'file' : 'url');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 3MB
    if (file.size > 3 * 1024 * 1024) {
      alert('Selected image exceeds 3MB. Please choose a smaller image.');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const base64Data = loadEvent.target?.result;
      if (typeof base64Data === 'string') {
        onChange(base64Data);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-input-container" style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <label className="admin-form-label" style={{ margin: 0 }}>
          <span>
            {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
          </span>
        </label>
        
        {/* Source Mode Switcher */}
        <div style={{ display: 'flex', gap: '4px', background: '#0a0d14', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            type="button"
            onClick={() => setMode('file')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: mode === 'file' ? 'var(--primary)' : 'transparent',
              color: mode === 'file' ? '#fff' : 'var(--text-muted)',
              transition: 'all 0.15s ease'
            }}
          >
            <FaUpload size={10} /> File Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: mode === 'url' ? 'var(--primary)' : 'transparent',
              color: mode === 'url' ? '#fff' : 'var(--text-muted)',
              transition: 'all 0.15s ease'
            }}
          >
            <FaLink size={10} /> Live URL
          </button>
        </div>
      </div>

      {mode === 'file' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id={`file-upload-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <label
            htmlFor={`file-upload-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '16px',
              background: '#090c13',
              border: '1px dashed rgba(249, 115, 22, 0.4)',
              borderRadius: '10px',
              cursor: 'pointer',
              color: '#e2e8f0',
              textAlign: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <FaUpload style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
            <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>
              {fileName ? fileName : 'Click to select photo from device / gallery'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              Supports JPG, PNG, WEBP (Max 3MB)
            </div>
          </label>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <input
            type="url"
            value={value && !value.startsWith('data:') ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="admin-input"
            style={{ width: '100%' }}
          />
        </div>
      )}

      {/* Optional Preset Quick Chips */}
      {presetOptions && presetOptions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '2px' }}>
            Presets:
          </span>
          {presetOptions.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(preset.url);
                setMode('url');
              }}
              style={{
                background: value === preset.url ? 'rgba(249, 115, 22, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${value === preset.url ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '12px',
                padding: '3px 8px',
                fontSize: '0.72rem',
                color: value === preset.url ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* Live Preview Bar */}
      {value && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '8px',
            padding: '8px 12px',
            background: '#0a0e17',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px'
          }}
        >
          <img
            src={value}
            alt="Preview"
            style={{
              width: previewAspect === 'wide' ? '70px' : '44px',
              height: '44px',
              objectFit: 'cover',
              borderRadius: previewAspect === 'square' && label.toLowerCase().includes('avatar') ? '50%' : '6px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: '#151b27',
              flexShrink: 0
            }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80';
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#4ade80' }}>
                <FaCheck size={10} style={{ display: 'inline', marginRight: '3px' }} /> Image Selected
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                ({value.startsWith('data:') ? 'Device File' : 'Online URL'})
              </span>
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '2px'
              }}
            >
              {value.startsWith('data:') ? (fileName || 'Uploaded image') : value}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            title="Remove Image"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              padding: '5px 8px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <FaTimes size={10} /> Clear
          </button>
        </div>
      )}
    </div>
  );
}
