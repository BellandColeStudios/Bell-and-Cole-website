import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Ship, 
  ClipboardCheck, 
  Handshake, 
  Anchor, 
  Globe, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight,
  User,
  FileText,
  CheckCircle
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Navigation scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll animations for all sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation (auto-play on load)
      const heroTl = gsap.timeline({ delay: 0.3 });
      
      heroTl.fromTo('.hero-image', 
        { x: '-40px', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo('.hero-headline span',
        { y: '20px', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.hero-micro',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.5'
      );

      // Flowing sections animation - smooth fade in
      gsap.utils.toArray<HTMLElement>('.flow-animate').forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Service cards stagger animation
      gsap.fromTo('.service-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Feature sections animation
      gsap.utils.toArray<HTMLElement>('.feature-section').forEach((section) => {
        const image = section.querySelector('.feature-image');
        const text = section.querySelector('.feature-text');
        
        gsap.fromTo(image,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        gsap.fromTo(text,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const inspectionDocuments = [
    'Safety Construction & Class Certificates',
    'Ballast Water & Pollution Prevention',
    'Energy Efficiency & Emissions Compliance',
    'Machinery Performance Reports',
    'Tank & Hold Inspection Records',
    'Dry Dock & Maintenance History'
  ];

  return (
    <div ref={mainRef} className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className={`nav-fixed ${navScrolled ? 'scrolled' : ''}`}>
        <div className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
          Bell&Cole
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            Services
          </button>
          <button onClick={() => scrollToSection('network')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            Network
          </button>
          <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            About
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            Contact
          </button>
          <button className="btn-primary text-sm">Get in touch</button>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="min-h-screen bg-[#F4F2EE] flex items-center pt-20">
        {/* Plus marks decoration */}
        <div className="plus-mark" style={{ top: '15%', left: '4%' }} />
        <div className="plus-mark" style={{ top: '70%', right: '8%' }} />
        <div className="plus-mark" style={{ bottom: '20%', left: '45%' }} />

        <div className="w-full px-[6vw] py-[10vh] flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left Image Card */}
          <div className="hero-image card-rounded w-full lg:w-[38vw] h-[45vh] lg:h-[65vh] relative overflow-hidden shadow-lg">
            <img 
              src="/hero_portrait.jpg" 
              alt="Marine Professional" 
              className="w-full h-full object-cover img-cinematic"
            />
          </div>

          {/* Right Content */}
          <div className="lg:ml-[10vw] w-full lg:w-[42vw]">
            <div className="hero-micro micro-label mb-4">Maritime Facilitation Services</div>
            <div className="hairline w-[10vw] mb-6" />
            
            <h1 className="hero-headline text-[clamp(40px,4.5vw,72px)] font-bold mb-6">
              <span className="block">Bell&Cole</span>
            </h1>
            
            <p className="hero-headline text-lg lg:text-xl text-[#6E6E6E] mb-8 max-w-md leading-relaxed">
              <span className="block">Connecting you with the right partners—</span>
              <span className="block">for charter, bunkering, inspections, and more.</span>
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-6">
              <button className="btn-primary flex items-center gap-2">
                Explore services
                <ArrowRight size={16} />
              </button>
              <button className="btn-text">Learn how we work</button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Services Mosaic */}
      <section id="services" className="bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="flow-animate mb-12">
          <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-4">What we facilitate</h2>
          <p className="text-lg text-[#6E6E6E] max-w-2xl">
            We coordinate with trusted industry partners to deliver comprehensive maritime solutions tailored to your needs.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Left - Image */}
          <div className="service-card card-rounded h-[35vh] lg:h-[40vh] relative overflow-hidden">
            <img 
              src="/services_aft_deck.jpg" 
              alt="Vessel Operations" 
              className="w-full h-full object-cover img-cinematic"
            />
          </div>

          {/* Top Right - Text Card */}
          <div className="service-card card-rounded card-white h-[35vh] lg:h-[40vh] p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Ship className="text-[#2F6BFF]" size={24} />
              <span className="micro-label">Vessel Charter</span>
            </div>
            <h3 className="text-[clamp(22px,2.2vw,32px)] font-bold mb-4">Charter coordination</h3>
            <p className="text-[#6E6E6E] mb-6 leading-relaxed">
              We connect cargo owners with suitable vessels through our network of chartering partners—handling the coordination so you don't have to.
            </p>
            <button className="btn-text flex items-center gap-2 w-fit">
              Learn more
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Bottom Left - Text Card */}
          <div className="service-card card-rounded card-white h-[35vh] lg:h-[40vh] p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <ClipboardCheck className="text-[#2F6BFF]" size={24} />
              <span className="micro-label">Inspections</span>
            </div>
            <h3 className="text-[clamp(22px,2.2vw,32px)] font-bold mb-4">Survey & inspection facilitation</h3>
            <p className="text-[#6E6E6E] mb-6 leading-relaxed">
              We arrange pre-purchase surveys, condition assessments, and compliance inspections through certified maritime surveyors.
            </p>
            <button className="btn-text flex items-center gap-2 w-fit">
              Learn more
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Bottom Right - Image */}
          <div className="service-card card-rounded h-[35vh] lg:h-[40vh] relative overflow-hidden">
            <img 
              src="/services_bridge.jpg" 
              alt="Ship Operations" 
              className="w-full h-full object-cover img-cinematic"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Charter Spotlight */}
      <section className="feature-section bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
          {/* Left Text */}
          <div className="feature-text w-full lg:w-[45vw] lg:pr-12">
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-2">
              Charter
            </h2>
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold text-[#6E6E6E] mb-6">
              made simple.
            </h2>
            <p className="text-lg text-[#6E6E6E] mb-8 leading-relaxed max-w-md">
              We work with chartering specialists to match your cargo requirements with available vessels—short sea, deep sea, and project cargoes.
            </p>
            <button className="btn-primary flex items-center gap-2 mb-4">
              Discuss your needs
              <ArrowRight size={16} />
            </button>
            <p className="text-sm text-[#6E6E6E]">Coordination support for urgent fixtures.</p>
          </div>

          {/* Right Image */}
          <div className="feature-image card-rounded w-full lg:w-[48vw] h-[45vh] lg:h-[65vh] lg:ml-auto relative overflow-hidden shadow-lg">
            <img 
              src="/charter_cargo_ops.jpg" 
              alt="Cargo Operations" 
              className="w-full h-full object-cover img-cinematic"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Inspections */}
      <section className="feature-section bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-0">
          {/* Right Text */}
          <div className="feature-text w-full lg:w-[45vw] lg:pl-12">
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-2">
              Inspections
            </h2>
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold text-[#6E6E6E] mb-6">
              professionally coordinated.
            </h2>
            <p className="text-lg text-[#6E6E6E] mb-8 leading-relaxed max-w-md">
              We facilitate vessel inspections by connecting you with qualified surveyors who can assess condition, compliance, and documentation.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="chip">Pre-purchase surveys</span>
              <span className="chip">Condition assessments</span>
              <span className="chip">Documentation review</span>
            </div>

            <button className="btn-primary flex items-center gap-2">
              Arrange an inspection
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Left Image */}
          <div className="feature-image card-rounded w-full lg:w-[48vw] h-[45vh] lg:h-[65vh] lg:mr-auto relative overflow-hidden shadow-lg">
            <img 
              src="/inspection_surveyor.jpg" 
              alt="Vessel Inspection" 
              className="w-full h-full object-cover img-cinematic"
            />
          </div>
        </div>
      </section>

      {/* Section 5: Inspection Documentation */}
      <section className="bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="flow-animate max-w-5xl mx-auto">
          <div className="card-rounded card-white p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-[#2F6BFF]" size={28} />
              <span className="micro-label">Documentation Support</span>
            </div>
            <h2 className="text-[clamp(28px,2.8vw,44px)] font-bold mb-6">
              Inspection readiness
            </h2>
            <p className="text-lg text-[#6E6E6E] mb-8 leading-relaxed">
              We help you prepare for vessel inspections by guiding you through the documentation requirements. Our coordination ensures surveyors have access to the records they need.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inspectionDocuments.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#F4F2EE] rounded-xl">
                  <CheckCircle size={18} className="text-[#2F6BFF] flex-shrink-0" />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Sales & Purchase */}
      <section className="feature-section bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
          {/* Left Text */}
          <div className="feature-text w-full lg:w-[45vw] lg:pr-12">
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-2">
              Sales & Purchase
            </h2>
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold text-[#6E6E6E] mb-6">
              facilitation.
            </h2>
            <p className="text-lg text-[#6E6E6E] mb-8 leading-relaxed max-w-md">
              We connect buyers and sellers with the right professionals to facilitate vessel transactions—supporting documentation, valuation, and closing coordination.
            </p>
            <button className="btn-primary flex items-center gap-2 mb-6">
              Discuss S&P support
              <ArrowRight size={16} />
            </button>
            <p className="text-sm text-[#6E6E6E]">Market context • Documentation • Closing support</p>
          </div>

          {/* Right Image */}
          <div className="feature-image card-rounded w-full lg:w-[48vw] h-[45vh] lg:h-[65vh] lg:ml-auto relative overflow-hidden shadow-lg">
            <img 
              src="/sp_handshake.jpg" 
              alt="Business Partnership" 
              className="w-full h-full object-cover img-cinematic"
            />
          </div>
        </div>
      </section>

      {/* Section 7: Bunkering */}
      <section className="feature-section bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-0">
          {/* Right Text */}
          <div className="feature-text w-full lg:w-[45vw] lg:pl-12">
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-2">
              Bunkering
            </h2>
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold text-[#6E6E6E] mb-6">
              supply coordination.
            </h2>
            <p className="text-lg text-[#6E6E6E] mb-8 leading-relaxed max-w-md">
              We connect vessel operators with bunkering suppliers across major hubs and off-port limits—coordinating supply for VLSFO, MGO, MDO, and related products.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="chip flex items-center gap-2">
                <Anchor size={14} /> Hub coverage
              </span>
              <span className="chip flex items-center gap-2">
                <Ship size={14} /> OPL supply
              </span>
              <span className="chip flex items-center gap-2">
                <ClipboardCheck size={14} /> Quantity verification
              </span>
            </div>

            <button className="btn-primary flex items-center gap-2">
              Plan bunkering
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Left Image */}
          <div className="feature-image card-rounded w-full lg:w-[48vw] h-[45vh] lg:h-[65vh] lg:mr-auto relative overflow-hidden shadow-lg">
            <img 
              src="/bunker_supply.jpg" 
              alt="Bunkering Operation" 
              className="w-full h-full object-cover img-cinematic"
            />
          </div>
        </div>
      </section>

      {/* Section 8: Global Network */}
      <section id="network" className="bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="flow-animate mb-8">
          <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-4">
            Global reach, local coordination.
          </h2>
          <p className="text-lg text-[#6E6E6E] max-w-2xl leading-relaxed">
            Our network of partners spans major shipping lanes—enabling us to coordinate services where you need them.
          </p>
        </div>

        <div className="flow-animate card-rounded overflow-hidden mb-10 shadow-lg">
          <img 
            src="/global_map.jpg" 
            alt="Global Network" 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flow-animate grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'Northwest Europe & ARA',
            'Mediterranean & Black Sea',
            'Middle East & Indian Subcontinent',
            'Singapore & Southeast Asia',
            'East Asia & Japan',
            'US Gulf & Caribbean'
          ].map((region, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
              <MapPin size={18} className="text-[#2F6BFF] flex-shrink-0" />
              <span className="text-sm font-medium">{region}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: About */}
      <section id="about" className="bg-[#F4F2EE]">
        <div className="flex flex-col lg:flex-row">
          {/* Left Image */}
          <div className="flow-animate w-full lg:w-[46vw] h-[45vh] lg:min-h-[65vh] relative">
            <img 
              src="/about_team.jpg" 
              alt="Team Collaboration" 
              className="w-full h-full object-cover img-cinematic"
              style={{ borderRadius: '0 28px 28px 0' }}
            />
          </div>

          {/* Right Content */}
          <div className="flow-animate w-full lg:w-[48vw] px-[6vw] lg:pl-[4vw] py-[8vh] lg:py-[10vh] flex flex-col justify-center">
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-6">
              How we work.
            </h2>
            <p className="text-lg text-[#6E6E6E] mb-10 leading-relaxed">
              Bell&Cole serves as a coordination hub for maritime services. We don't perform inspections or operate vessels ourselves—we connect you with the right specialists who do.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: <Handshake size={20} />, text: 'Clear communication' },
                { icon: <Globe size={20} />, text: 'Fast coordination' },
                { icon: <ClipboardCheck size={20} />, text: 'Documented processes' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2F6BFF]/10 flex items-center justify-center text-[#2F6BFF]">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Contact */}
      <section id="contact" className="bg-[#111111] text-white py-[10vh] px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Left Content */}
          <div className="flow-animate w-full lg:w-[45vw]">
            <h2 className="text-[clamp(32px,3.2vw,52px)] font-bold mb-6 text-white">
              Let's discuss your requirements.
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Tell us what you need—charter support, inspection coordination, bunkering, or S&P facilitation. We'll connect you with the right partners.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-[#2F6BFF]" />
                <span className="text-gray-300">hello@bellandcole.io</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-[#2F6BFF]" />
                <span className="text-gray-300">+234 907 155 7278</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-[#2F6BFF]" />
                <span className="text-gray-300">+234 701 000 1111</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={20} className="text-[#2F6BFF]" />
                <span className="text-gray-300">Block 6, Pearl Nuga Park Estate<br />Monastery Road, Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flow-animate w-full lg:w-[42vw] lg:ml-auto">
            <div className="bg-white rounded-[28px] p-8 lg:p-10">
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" className="form-input text-gray-900" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" className="form-input text-gray-900" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input type="text" className="form-input text-gray-900" placeholder="Your company" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                  <select className="form-input text-gray-900">
                    <option>Select a service</option>
                    <option>Vessel Charter Coordination</option>
                    <option>Bunkering Support</option>
                    <option>Inspection Facilitation</option>
                    <option>Sales & Purchase Support</option>
                    <option>Petroleum Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea className="form-input text-gray-900 h-28 resize-none" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  Send inquiry
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: CEO Profile */}
      <section className="bg-[#F4F2EE] py-[10vh] px-[6vw]">
        <div className="flow-animate max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* CEO Image */}
            <div className="w-full lg:w-[320px] flex-shrink-0">
              <div className="card-rounded overflow-hidden shadow-lg aspect-[3/4]">
                <img 
                  src="/ceo_image.jpg" 
                  alt="CEO Noah O. Akoko" 
                  className="w-full h-full object-cover img-cinematic"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <User size={16} className="text-[#2F6BFF]" />
                  <span className="text-sm font-semibold text-[#2F6BFF]">Chief Executive Officer</span>
                </div>
                <h3 className="text-xl font-bold">Noah O. Akoko</h3>
              </div>
            </div>

            {/* CEO Bio */}
            <div className="flex-1">
              <div className="micro-label mb-4">Leadership</div>
              <h2 className="text-[clamp(28px,2.8vw,44px)] font-bold mb-6">
                Facilitating Maritime Excellence
              </h2>
              <p className="text-lg text-[#6E6E6E] leading-relaxed mb-6">
                Experienced business development professional with a focus on maritime logistics coordination, S&P transaction support, and energy infrastructure partnerships. Proven ability to identify high-value connections, streamline supply chains, and drive growth in the maritime and petroleum sectors.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-[#6E6E6E]">
                  <Handshake size={16} className="text-[#2F6BFF]" />
                  <span>Partnership Facilitation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6E6E6E]">
                  <Ship size={16} className="text-[#2F6BFF]" />
                  <span>Maritime Coordination</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6E6E6E]">
                  <Anchor size={16} className="text-[#2F6BFF]" />
                  <span>Energy Infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-10 px-[6vw]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-semibold" style={{ fontFamily: 'Space Grotesk' }}>
            Bell&Cole
          </div>
          <p className="text-sm text-gray-500 text-center">
            Block 6, Pearl Nuga Park Estate, Monastery Road<br />
            Lagos, Nigeria
          </p>
          <div className="flex items-center gap-6">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</button>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Terms</button>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Bell&Cole. Maritime facilitation services.
          </p>
          <p className="text-xs text-gray-700 mt-2">
            bellandcole.io
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
