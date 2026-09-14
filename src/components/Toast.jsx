import React from 'react';
import { useShop } from '../context/ShopContext';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast-item ${toast.type || 'success'}`}>
        {toast.type === 'success' && <FaCheckCircle style={{ color: '#22c55e', fontSize: '1.2rem' }} />}
        {toast.type === 'info' && <FaInfoCircle style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />}
        {toast.type === 'danger' && <FaExclamationTriangle style={{ color: '#ef4444', fontSize: '1.2rem' }} />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
