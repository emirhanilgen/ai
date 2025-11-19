import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Phone, ArrowRight, CheckCircle2, X, Star, Clock, Wrench, Sparkles } from 'lucide-react';
import { Logo } from './components/Logo';
import { ServiceCard } from './components/ServiceCard';
import { AIAssistant } from './components/AIAssistant';
import { ServiceCategory, BookingStep } from './types';

// --- Constants ---
const SERVICES: ServiceCategory[] = [
  { id: 'plumbing', title: 'Sıhhi Tesisat', description: 'Kaçak tespiti, batarya değişimi, tıkanıklık açma ve tüm su tesisatı işleri.', iconName: 'Droplets', imageUrl: 'https://picsum.photos/seed/plumber/600/400' },
  { id: 'electric', title: 'Elektrik Tesisatı', description: 'Avize montajı, priz değişimi, sigorta arızaları ve elektrik taahhüt işleri.', iconName: 'Zap', imageUrl: 'https://picsum.photos/seed/electrician/600/400' },
  { id: 'paint', title: 'Boya & Badana', description: 'İç cephe boya, dış cephe, duvar kağıdı ve dekoratif boya uygulamaları.', iconName: 'PaintRoller', imageUrl: 'https://picsum.photos/seed/painter/600/400' },
  { id: 'carpentry', title: 'Mobilya & Montaj', description: 'Mobilya kurulumu, tamiri, özel ölçü dolap ve marangozluk hizmetleri.', iconName: 'Hammer', imageUrl: 'https://picsum.photos/seed/carpenter/600/400' },
  { id: 'ac', title: 'Klima & Kombi', description: 'Klima bakımı, kombi petek temizliği ve arıza onarım servisleri.', iconName: 'Thermometer', imageUrl: 'https://picsum.photos/seed/hvac/600/400' },
  { id: 'renovation', title: 'Tadilat & Dekor', description: 'Anahtar teslim ev yenileme, banyo ve mutfak tadilat projeleri.', iconName: 'Home', imageUrl: 'https://picsum.photos/seed/renovation/600/400' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Ahmet Yılmaz', role: 'Ev Sahibi', comment: 'Gece yarısı su borum patladı, TamirAdam sayesinde 20 dakikada usta kapımdaydı. İnanılmaz hız!', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
  { id: 2, name: 'Ayşe Demir', role: 'İşletmeci', comment: 'Dükkanımın elektrik tesisatı için çağırdım. Gelen usta çok profesyoneldi ve tertemiz çalıştı. Kesinlikle tavsiye ederim.', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
  { id: 3, name: 'Mehmet Öz', role: 'Mimar', comment: 'Projelerimde sürekli bu platformu kullanıyorum. Ustalar sertifikalı ve güvenilir.', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
];

// --- App Component ---

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>(BookingStep.SELECT_SERVICE);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [userDiagnosis, setUserDiagnosis] = useState<string>('');

  const openBooking = (service?: ServiceCategory) => {
    setIsModalOpen(true);
    if (service) {
      setSelectedService(service);
      setBookingStep(BookingStep.CONTACT_DETAILS);
    } else {
      setBookingStep(BookingStep.SELECT_SERVICE);
    }
  };

  const handleAIComplete = (diagnosis: string) => {
    setUserDiagnosis(diagnosis);
    setBookingStep(BookingStep.CONTACT_DETAILS);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setBookingStep(BookingStep.SUCCESS);
    }, 1000);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#services" className="hover:text-primary-600 transition-colors">Hizmetler</a>
            <a href="#how-it-works" className="hover:text-primary-600 transition-colors">Nasıl Çalışır?</a>
            <a href="#testimonials" className="hover:text-primary-600 transition-colors">Yorumlar</a>
          </nav>
          <button 
            onClick={() => openBooking()}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Usta Çağır
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
           <img 
            src="https://picsum.photos/seed/hero_repair/1920/1080" 
            alt="Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-slate-50/80 to-slate-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-sm font-bold tracking-wide mb-6">
              #1 NUMARALI USTA PLATFORMU
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Evinizin Kahramanı <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-500">
                Bir Tık Uzağınızda
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Bozulan musluklar, yanmayan lambalar veya yenilenmesi gereken odalar... 
              TamirAdam ile profesyonel ustalar dakikalar içinde kapınızda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
              >
                Hemen Hizmet Al <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                   const el = document.getElementById('services');
                   el?.scrollIntoView({behavior: 'smooth'});
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Hizmetleri İncele
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" /> Sertifikalı Ustalar
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-500" /> %100 Garanti
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" /> 4.9/5 Müşteri Puanı
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">İhtiyacınız Olan Hizmeti Seçin</h2>
            <p className="text-lg text-slate-500">TamirAdam, evinizin her köşesi için uzman çözümler sunar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index}
                onClick={() => openBooking(service)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white overflow-hidden relative">
         {/* Abstract shapes */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-[128px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[128px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Sistem Nasıl Çalışır?</h2>
            <p className="text-slate-400">3 basit adımda sorununuzu çözüme kavuşturun.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <Phone className="w-10 h-10" />, title: "1. Talep Oluştur", desc: "İhtiyacını seç veya yapay zeka asistanımıza sorununu anlat." },
              { icon: <Clock className="w-10 h-10" />, title: "2. Randevunu Planla", desc: "Sana uygun tarih ve saati belirle, ustamız onaylasın." },
              { icon: <Wrench className="w-10 h-10" />, title: "3. Sorun Çözülsün", desc: "Ustamız gelsin, işini yapsın. Ödemeyi güvenle tamamla." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="w-24 h-24 mx-auto bg-slate-800 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-500 shadow-lg shadow-black/20">
                  <div className="text-white">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Mutlu Müşteriler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
               <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
               >
                 <div className="flex items-center gap-4 mb-6">
                   <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                   <div>
                     <h4 className="font-bold text-slate-900">{t.name}</h4>
                     <p className="text-xs text-slate-500 uppercase tracking-wide">{t.role}</p>
                   </div>
                 </div>
                 <div className="flex text-yellow-400 mb-4">
                   {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
                 </div>
                 <p className="text-slate-600 italic">"{t.comment}"</p>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <p className="text-slate-500 text-sm">
            © 2024 TamirAdam. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {bookingStep === BookingStep.SUCCESS ? 'Talep Alındı!' : 'Servis Talebi'}
                  </h3>
                  <p className="text-sm text-slate-500">
                     {bookingStep === BookingStep.SELECT_SERVICE && 'Size nasıl yardımcı olabiliriz?'}
                     {bookingStep === BookingStep.AI_DIAGNOSIS && 'Akıllı Asistan ile Sorun Tespiti'}
                     {bookingStep === BookingStep.CONTACT_DETAILS && 'İletişim Bilgileri'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                
                {bookingStep === BookingStep.SELECT_SERVICE && (
                  <div className="space-y-4">
                    <div 
                      onClick={() => setBookingStep(BookingStep.AI_DIAGNOSIS)}
                      className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white cursor-pointer hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-between"
                    >
                      <div>
                         <h4 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5" /> Sorunumu Anlatamıyorum</h4>
                         <p className="text-indigo-100 mt-1 text-sm">Yapay zeka asistanımız sorunu tespit etsin.</p>
                      </div>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    
                    <div className="text-center text-sm text-slate-400 font-medium my-2">- VEYA KATEGORİ SEÇİN -</div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {SERVICES.map(s => (
                        <button 
                          key={s.id}
                          onClick={() => {
                            setSelectedService(s);
                            setBookingStep(BookingStep.CONTACT_DETAILS);
                          }}
                          className="p-4 border border-slate-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
                        >
                          <span className="font-bold text-slate-700 group-hover:text-primary-700 block">{s.title}</span>
                          <span className="text-xs text-slate-500">Seçmek için tıkla</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {bookingStep === BookingStep.AI_DIAGNOSIS && (
                  <AIAssistant onComplete={handleAIComplete} />
                )}

                {bookingStep === BookingStep.CONTACT_DETAILS && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {selectedService && (
                      <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4" />
                         Seçilen Hizmet: {selectedService.title}
                      </div>
                    )}
                    {userDiagnosis && (
                       <div className="p-3 bg-indigo-50 text-indigo-800 rounded-lg text-sm italic border border-indigo-100">
                        "Sorun: {userDiagnosis}"
                       </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Ad Soyad</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Adınız" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Telefon</label>
                        <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="0555..." />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">Adres</label>
                      <textarea required rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Açık adresiniz..." />
                    </div>
                    
                    <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all mt-4 flex justify-center items-center gap-2">
                      Randevu Oluştur <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {bookingStep === BookingStep.SUCCESS && (
                  <div className="text-center py-12">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Teşekkürler!</h4>
                    <p className="text-slate-500 mb-8">
                      Talebiniz başarıyla alındı. En yakın ustamız 15 dakika içinde sizinle iletişime geçecek.
                    </p>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      Kapat
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;