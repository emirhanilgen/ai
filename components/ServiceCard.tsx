import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServiceCardProps {
  service: ServiceCategory;
  onClick: () => void;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, index }) => {
  // Dynamically access icon component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 cursor-pointer shadow-lg"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
      
      <img 
        src={service.imageUrl} 
        alt={service.title} 
        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary-600 rounded-lg">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold">{service.title}</h3>
        </div>
        <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
          {service.description}
        </p>
        <div className="mt-4 flex items-center text-primary-400 font-semibold text-sm uppercase tracking-wider">
          Hemen Çağır <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};