export default function Card({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    subtle: 'bg-gray-50 border border-gray-100'
  };

  return (
    <div className={`rounded-lg p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
