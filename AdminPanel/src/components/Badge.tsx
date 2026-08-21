import React from 'react';

interface BadgeProps {
  status: 'Active' | 'Expired' | 'Revoked' | 'Inactive' | 'Released' | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const norm = (status || '').toLowerCase();

  let style = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (norm === 'active') {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-[#34B1AA]';
  } else if (norm === 'expired') {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-[#E0B50F]';
  } else if (norm === 'revoked') {
    style = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (norm === 'released') {
    style = 'bg-slate-100 text-slate-600 border-slate-200';
    dotColor = 'bg-slate-400';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
};
