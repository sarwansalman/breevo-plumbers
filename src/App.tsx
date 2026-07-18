/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  Wrench,
  Sparkles,
  Droplet,
  Flame,
  Filter,
  Check,
  ChevronRight,
  ChevronDown,
  Star,
  Menu,
  X,
  FileText,
  AlertTriangle,
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
  Search,
  Sliders,
  Info,
  ThumbsUp,
  ExternalLink
} from 'lucide-react';

// Type definitions for premium interactive elements
interface Service {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  priceEstimate: string;
  tag: string;
  description: string;
  extendedDetails: string[];
  testimonial: {
    quote: string;
    author: string;
    location: string;
    rating: number;
  };
}

interface Review {
  id: number;
  name: string;
  location: string;
  avatarText: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
}

export default function App() {
  // Navigation & General UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  // Before / After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Toronto GTA Area Dispatch Checker State
  const [areaSearchQuery, setAreaSearchQuery] = useState('');
  const [areaSearchResult, setAreaSearchResult] = useState<{
    found: boolean;
    neighborhood: string;
    time: string;
    rate: string;
  } | null>(null);

  // Cost Estimator State
  const [estimatorCategory, setEstimatorCategory] = useState('residential');
  const [estimatorScale, setEstimatorScale] = useState('fixture');
  const [estimatorMaterials, setEstimatorMaterials] = useState('premium');

  // Testimonials filter
  const [activeReviewFilter, setActiveReviewFilter] = useState('All');

  // Booking Form State
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    email: '',
    neighborhood: '',
    serviceType: 'Luxury Bath & Kitchen Renovations',
    urgency: 'Same-Week',
    additionalNotes: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion State
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Active Emergency Banner Auto-ticker
  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);
  const tickers = [
    "🚨 EMERGENCY HOTLINE DISPATCH ACTIVE: 45-Minute Arrival SLA Anywhere in GTA",
    "🍁 RED SEAL CERTIFIED PLUMBERS: Built for Ontario Winters, Pipe Burst Specialists",
    "🛡️ $10 MILLION LIABILITY INSURANCE: Absolute peace of mind for luxury homes and condos",
    "⭐ UNPARALLELED CLIENT CARE: Rated 4.9/5 stars over 900+ real homeowner audits"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTickerIdx((prev) => (prev + 1) % tickers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position for sticky glass header and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracker for high-end scrolling nav
      const sections = ['home', 'why-us', 'services', 'before-after', 'estimator', 'reviews', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Before & After Touch/Mouse dragging handler
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  // 8 Premium Services List
  const services: Service[] = [
    {
      id: 'renovations',
      name: 'Luxury Bath & Kitchen Renovations',
      icon: Sparkles,
      priceEstimate: '$2,500 - $15,000+',
      tag: 'Renovation',
      description: 'Masterfully routed copper lines, bespoke high-end fixture installations, and custom luxury plumbing layouts.',
      extendedDetails: [
        'Complete copper repiping for high-end geometric shower grids',
        'Installation of floating brass/gold designer faucets and luxury clawfoot tubs',
        'High-pressure multi-port digital shower valve systems',
        'Custom drainage loops and structural cabinet plumbing coordination'
      ],
      testimonial: {
        quote: "Breevo completely overhauled our Forest Hill master bath. Absolute architectural luxury. Perfect piping alignment, spotless workspace, and outstanding finish.",
        author: "Eleanor Vance",
        location: "Forest Hill, Toronto",
        rating: 5
      }
    },
    {
      id: 'camera',
      name: 'High-Definition Sewer Camera Inspections',
      icon: Search,
      priceEstimate: '$299 - $599',
      tag: 'Maintenance',
      description: 'Full-spectrum fiber optic sub-grade mapping to accurately evaluate lateral drain condition with zero digging.',
      extendedDetails: [
        '1080p high-intensity self-leveling sewer inspection cameras',
        'Direct locator transponders to map the exact depth and spot of blockages',
        'Complete digital video recording with certified engineering report',
        'Sewer lateral health checkups for real estate pre-purchase safety'
      ],
      testimonial: {
        quote: "Their fiber-optic camera inspection saved us from a potential $20,000 collapse nightmare when we were auditing an older home in High Park. Incredibly clear reports.",
        author: "Robert K.",
        location: "High Park, Toronto",
        rating: 5
      }
    },
    {
      id: 'emergency',
      name: '24/7 Priority Emergency Dispatch',
      icon: Droplet,
      priceEstimate: 'Flat-Rate + Priority Dispatch',
      tag: 'Emergency',
      description: 'Immediate mechanical interception for burst lines, severe backflows, high-rise flooding, and frozen conduits.',
      extendedDetails: [
        'Active 45-minute guaranteed arrival anywhere in the GTA',
        'Commercial-grade flood extraction pumping and high-capacity containment',
        'Sub-zero winter structural pipe welding and rapid-thaw systems',
        'Main water gate shutoff overrides and temporary high-pressure bypasses'
      ],
      testimonial: {
        quote: "Our basement sewer backed up at 2 AM on New Year's Eve. Breevo dispatch got a master plumber to our door in 30 minutes flat. They stopped the flood, fixed the blockage, and thoroughly sanitized.",
        author: "David Fletcher",
        location: "The Danforth, Toronto",
        rating: 5
      }
    },
    {
      id: 'tankless',
      name: 'Tankless Water Heater Engineering',
      icon: Flame,
      priceEstimate: '$3,200 - $5,800',
      tag: 'Eco-Smart',
      description: 'Ultra-efficiency tankless hot water systems designed to endure Canadian sub-zero groundwater temperatures.',
      extendedDetails: [
        'Premium high-end Navien or Bosch condensing flow installations',
        'Endless hot water capacity matched for multi-jet luxury bathrooms',
        'Up to 40% reduction in gas consumption compared to ancient tank styles',
        'Precision venting and stainless-steel internal heat exchanger loops'
      ],
      testimonial: {
        quote: "We upgraded our 4-bedroom home to a premium condensing tankless system with Breevo. Gas utility bills dropped significantly, and we literally never run out of warm water.",
        author: "Dr. Susan Choi",
        location: "Markham, ON",
        rating: 5
      }
    },
    {
      id: 'filtration',
      name: 'Advanced Water Purification Systems',
      icon: Shield,
      priceEstimate: '$1,800 - $4,200',
      tag: 'Wellness',
      description: 'Multi-stage active carbon softeners and medical-grade reverse osmosis filters designed for pure Ontario water.',
      extendedDetails: [
        'Whole-house reverse osmosis and scale-reduction systems',
        'Bespoke iron, chlorine, and mineral neutralizers for premium bath water',
        'Under-sink glass-bottle dispenser integrations',
        'Sub-micron heavy metal filtering to protect luxury copper fixtures'
      ],
      testimonial: {
        quote: "Toronto tap water was wrecking our designer black matte brass fixtures. Breevo installed a complete scale-reduction filtration unit. No more mineral rings, and the drinking water tastes pristine.",
        author: "Liam O'Connor",
        location: "Oakville, ON",
        rating: 5
      }
    },
    {
      id: 'commercial',
      name: 'Commercial Drainage & Interceptors',
      icon: Wrench,
      priceEstimate: 'Custom Architectural Quote',
      tag: 'Commercial',
      description: 'High-throughput commercial food service and retail-grade drainage, grease separation, and system certification.',
      extendedDetails: [
        'Heavy-duty kitchen grease interceptor sizing and structural plumbing',
        'Commercial compliance testing and municipal license certification',
        'High-capacity hydro-jetting and automated pipe maintenance programs',
        'Sump and main drainage layouts for downtown retail developments'
      ],
      testimonial: {
        quote: "Breevo maintains the complex plumbing systems across our four Toronto hospitality venues. They are fast, reliable, highly competent, and always pass municipal inspections on the first go.",
        author: "Chef Mathieu Roy",
        location: "King West, Toronto",
        rating: 5
      }
    },
    {
      id: 'sumppumps',
      name: 'Sump Pumps & Backflow Prevention',
      icon: CheckCircle2,
      priceEstimate: '$1,200 - $3,400',
      tag: 'Defense',
      description: 'Double-redundant industrial battery-backup pump systems and certified backflow assembly installations.',
      extendedDetails: [
        'Heavy-cast iron primary sump pumps with secondary battery-powered backups',
        'Toronto-compliant backflow preventer installations and certified annual audits',
        'Smart cellular alerts that notify you of power failures or high water levels',
        'Exterior weeping tile drainage integration and landscape water diversion'
      ],
      testimonial: {
        quote: "After the flash floods in Toronto, we had Breevo install a dual sump with an advanced smart backup. It gives us absolute peace of mind during spring thaw or severe storms.",
        author: "Sarah Jenkins",
        location: "Etobicoke, ON",
        rating: 5
      }
    },
    {
      id: 'hydronics',
      name: 'Custom Hydronic In-Floor Heating',
      icon: Sliders,
      priceEstimate: '$5,000 - $20,000+',
      tag: 'Renovation',
      description: 'Perfect, energy-efficient radiant floor loops that turn cold winter basements into luxury-heated sanctuaries.',
      extendedDetails: [
        'Bespoke manifolds with precision thermal zone controllers',
        'Oxygen-barrier PEX routing embedded in premium self-leveling concrete',
        'Whisper-quiet boiler-driven circulation matching multi-floor layouts',
        'Digital Nest/Ecobee thermostat integration for ultimate winter warmth'
      ],
      testimonial: {
        quote: "The radiant hydronic heating Breevo designed and laid down for our limestone basement floor is absolute bliss during Canadian winters. Best investment we have ever made.",
        author: "Amanda & Jonathan",
        location: "Rosedale, Toronto",
        rating: 5
      }
    }
  ];

  // Toronto GTA Areas database for live checking
  const gtaAreas = useMemo(() => [
    { name: 'Forest Hill', time: '25-35 mins', rate: 'Premium Standard' },
    { name: 'Rosedale', time: '30-40 mins', rate: 'Premium Standard' },
    { name: 'The Bridle Path', time: '35-45 mins', rate: 'Premium Standard' },
    { name: 'Yorkville', time: '20-30 mins', rate: 'Premium Standard' },
    { name: 'Downtown Toronto', time: '25-40 mins', rate: 'Premium Standard' },
    { name: 'The Annex', time: '20-35 mins', rate: 'Premium Standard' },
    { name: 'High Park', time: '30-45 mins', rate: 'Premium Standard' },
    { name: 'Lawrence Park', time: '30-40 mins', rate: 'Premium Standard' },
    { name: 'The Beaches', time: '35-50 mins', rate: 'Premium Standard' },
    { name: 'North York', time: '35-50 mins', rate: 'Standard GTA' },
    { name: 'Markham', time: '40-55 mins', rate: 'Standard GTA' },
    { name: 'Oakville', time: '45-60 mins', rate: 'Standard GTA' },
    { name: 'Mississauga', time: '40-55 mins', rate: 'Standard GTA' },
    { name: 'Etobicoke', time: '30-45 mins', rate: 'Standard GTA' },
    { name: 'Scarborough', time: '35-50 mins', rate: 'Standard GTA' },
    { name: 'Vaughan', time: '40-55 mins', rate: 'Standard GTA' },
  ], []);

  // Handle live area search
  const handleAreaSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaSearchQuery.trim()) return;
    
    const query = areaSearchQuery.toLowerCase();
    const match = gtaAreas.find(
      (a) => a.name.toLowerCase().includes(query) || query.includes(a.name.toLowerCase())
    );

    if (match) {
      setAreaSearchResult({
        found: true,
        neighborhood: match.name,
        time: match.time,
        rate: match.rate,
      });
    } else {
      // General fall-back matching postal codes starting with M or L
      const looksLikeOntarioPostal = /^[a-zA-Z]\d[a-zA-Z]/i.test(areaSearchQuery);
      if (looksLikeOntarioPostal) {
        setAreaSearchResult({
          found: true,
          neighborhood: 'Toronto Metro Region',
          time: '35-50 mins priority response',
          rate: 'Standard Regional',
        });
      } else {
        setAreaSearchResult({
          found: false,
          neighborhood: areaSearchQuery,
          time: '',
          rate: '',
        });
      }
    }
  };

  // Cost Estimator calculation
  const calculatedEstimate = useMemo(() => {
    let baseMin = 500;
    let baseMax = 900;
    let duration = '2-4 Hours';

    // Category Modifier
    if (estimatorCategory === 'renovation') {
      baseMin = 4500;
      baseMax = 12000;
      duration = '3-7 Days';
    } else if (estimatorCategory === 'commercial') {
      baseMin = 3500;
      baseMax = 9500;
      duration = '2-5 Days';
    } else if (estimatorCategory === 'emergency') {
      baseMin = 350;
      baseMax = 800;
      duration = '1-2 Hours (Immediate response)';
    }

    // Scale Modifier
    if (estimatorScale === 'room') {
      baseMin *= 2.2;
      baseMax *= 2.5;
      if (estimatorCategory !== 'emergency') duration = '1-2 Days';
    } else if (estimatorScale === 'building') {
      baseMin *= 4.5;
      baseMax *= 5.0;
      if (estimatorCategory !== 'emergency') duration = '1-3 Weeks';
    }

    // Materials Modifier
    if (estimatorMaterials === 'premium') {
      baseMin *= 1.35;
      baseMax *= 1.45;
    } else if (estimatorMaterials === 'standard-pex') {
      baseMin *= 0.9;
      baseMax *= 0.9;
    }

    return {
      min: Math.round(baseMin),
      max: Math.round(baseMax),
      duration,
    };
  }, [estimatorCategory, estimatorScale, estimatorMaterials]);

  // Apply quote parameters to the contact form to provide flawless integration
  const applyEstimateToBooking = () => {
    let serviceMap = 'Luxury Bath & Kitchen Renovations';
    if (estimatorCategory === 'emergency') serviceMap = '24/7 Priority Emergency Dispatch';
    else if (estimatorCategory === 'residential') serviceMap = 'Advanced Water Purification Systems';
    else if (estimatorCategory === 'commercial') serviceMap = 'Commercial Drainage & Interceptors';

    let noteText = `Estimated via Breevo Cost Planner:\nScope: ${estimatorScale.toUpperCase()}\nMaterial Grade: ${estimatorMaterials.toUpperCase()}\nProjected Cost Range: $${calculatedEstimate.min.toLocaleString()} - $${calculatedEstimate.max.toLocaleString()}\nEst. Duration: ${calculatedEstimate.duration}`;

    setBookingFormData((prev) => ({
      ...prev,
      serviceType: serviceMap,
      urgency: estimatorCategory === 'emergency' ? 'Immediate Emergency' : 'Same-Week',
      additionalNotes: noteText,
    }));

    // Scroll smoothly down to the booking form
    const formEl = document.getElementById('contact');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submit interceptor as requested
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormData.name || !bookingFormData.phone || !bookingFormData.email) {
      alert("Please fill in your Name, Phone, and Email to complete the booking.");
      return;
    }

    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 1200); // Luxury artificial delay to show a premium spinner
  };

  // 8 Canadian 5-Star Reviews with Canadian names and photos, filterable
  const clientReviews: Review[] = [
    {
      id: 1,
      name: 'Jean-François Tremblay',
      location: 'Yorkville, Toronto',
      avatarText: 'JT',
      rating: 5,
      date: 'June 2026',
      service: 'Renovation',
      comment: "Incredible attention to structural symmetry. Our Yorkville condo required tight, customized brass fittings with strict building safety guidelines. Breevo handled the boards, the engineering, and the execution flawlessly.",
      verified: true,
    },
    {
      id: 2,
      name: 'Eleanor Vance',
      location: 'Forest Hill, Toronto',
      avatarText: 'EV',
      rating: 5,
      date: 'May 2026',
      service: 'Renovation',
      comment: "We hired Breevo for our full mansion remodel in Forest Hill. The mechanical layout they crafted behind our marble walls is literally a work of industrial art. Uncompromising quality and extremely polite Red Seal masters.",
      verified: true,
    },
    {
      id: 3,
      name: 'David Fletcher',
      location: 'The Danforth, Toronto',
      avatarText: 'DF',
      rating: 5,
      date: 'July 2026',
      service: 'Emergency',
      comment: "A sudden water main fracture in our basement was threatening historical records. Breevo dispatch routed an emergency van within 25 minutes of calling. The plumber bypassed the rupture, stabilized the structure, and saved us thousands.",
      verified: true,
    },
    {
      id: 4,
      name: 'Dr. Susan Choi',
      location: 'Markham, ON',
      avatarText: 'SC',
      rating: 5,
      date: 'March 2026',
      service: 'Eco-Smart',
      comment: "Our old water boiler tank gave out on a frosty -15C morning. Breevo analyzed our hot water consumption profile and converted us to a clean tankless manifold system. The continuous heat is game-changing.",
      verified: true,
    },
    {
      id: 5,
      name: 'Liam O\'Connor',
      location: 'Oakville, ON',
      avatarText: 'LO',
      rating: 5,
      date: 'April 2026',
      service: 'Wellness',
      comment: "Highly professional service from scheduling to cleanup. Our family suffers from severe dry skin aggravated by municipal water chlorine. The Breevo reverse osmosis and conditioning setup has solved it completely.",
      verified: true,
    },
    {
      id: 6,
      name: 'Sarah Jenkins',
      location: 'Etobicoke, ON',
      avatarText: 'SJ',
      rating: 5,
      date: 'April 2026',
      service: 'Defense',
      comment: "Installed a smart-sump system with them. After experiencing significant basement water damage in past years, we wanted the best engineering. The Breevo team laid immaculate drainage and automated backups.",
      verified: true,
    },
    {
      id: 7,
      name: 'Robert K.',
      location: 'High Park, Toronto',
      avatarText: 'RK',
      rating: 5,
      date: 'May 2026',
      service: 'Maintenance',
      comment: "The lateral camera diagnostic they performed was the most informative service call I've ever seen. Complete video breakdown of tree root intrusion with immediate, clear solution paths. Truly elite.",
      verified: true,
    },
    {
      id: 8,
      name: 'Marcus & Catherine Reid',
      location: 'Lawrence Park, Toronto',
      avatarText: 'MR',
      rating: 5,
      date: 'June 2026',
      service: 'Maintenance',
      comment: "We had slow structural drain loops in our master en-suite. The Breevo technician carefully dissembled the luxury fixtures, hydro-flushed the lines to restoration state, and reinstalled everything in pristine condition.",
      verified: true,
    }
  ];

  const filteredReviews = useMemo(() => {
    if (activeReviewFilter === 'All') return clientReviews;
    return clientReviews.filter((r) => r.service === activeReviewFilter);
  }, [activeReviewFilter]);

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Dynamic Emergency Announcement Bar */}
      <div className="bg-luxury-navy text-slate-100 border-b border-slate-800 text-xs py-2.5 px-4 sticky top-0 z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 w-full justify-center md:justify-start">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-medium tracking-wide transition-all duration-500 ease-in-out">
              {tickers[currentTickerIdx]}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Phone className="w-3.5 h-3.5" /> Direct Dispatch: (000) 000-0000
            </span>
            <span className="text-slate-500">|</span>
            <span>Toronto & Greater Area</span>
          </div>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className={`w-full sticky top-[38px] z-40 transition-all duration-300 ${
        isScrolled ? 'bg-luxury-navy/95 backdrop-blur-md shadow-lg border-b border-slate-800 text-slate-100' : 'bg-transparent text-slate-900 md:text-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Brand Group */}
          <a href="#top" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Droplet className="w-5.5 h-5.5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight leading-none block">
                BREEVO<span className="text-amber-500 font-light">PLUMBERS</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mt-0.5">
                Luxury Plumbing & Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Home', target: '#top', key: 'home' },
              { label: 'Why Us', target: '#why-us', key: 'why-us' },
              { label: 'Services', target: '#services', key: 'services' },
              { label: 'Before & After', target: '#before-after', key: 'before-after' },
              { label: 'Project Estimator', target: '#estimator', key: 'estimator' },
              { label: 'Reviews', target: '#reviews', key: 'reviews' },
              { label: 'FAQ', target: '#faq', key: 'faq' },
              { label: 'Contact', target: '#contact', key: 'contact' }
            ].map((link) => (
              <a
                key={link.key}
                href={link.target}
                className={`font-sans text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 hover:text-amber-400 ${
                  activeSection === link.key ? 'text-amber-400 font-semibold' : 'text-slate-300'
                } ${!isScrolled ? 'md:text-slate-200' : 'text-slate-300'}`}
              >
                {link.label}
                {activeSection === link.key && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full animate-scale-up"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Call-to-Action Group */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:0000000000" className="flex items-center gap-2 group text-sm font-medium">
              <span className={`p-2 rounded-full ${isScrolled ? 'bg-slate-800' : 'bg-white/10'} group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300`}>
                <Phone className="w-4 h-4 text-amber-400 group-hover:text-slate-950" />
              </span>
              <span className="hover:text-amber-400 transition-colors duration-300">(000) 000-0000</span>
            </a>
            <a 
              href="#contact" 
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 hover:scale-102 hover:shadow-lg hover:shadow-amber-500/20 active:scale-98 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-300 tracking-wide font-display inline-flex items-center gap-1.5"
            >
              Book Dispatch
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger toggler */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-xl bg-slate-800/10 text-slate-800 hover:bg-slate-800/20 hover:text-slate-950 transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-slate-100" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-luxury-navy border-b border-slate-800 animate-fade-in-down absolute left-0 shadow-2xl p-6 flex flex-col gap-5 z-40">
            {[
              { label: 'Home', target: '#top' },
              { label: 'Why Choose Us', target: '#why-us' },
              { label: 'Services', target: '#services' },
              { label: 'Before & After', target: '#before-after' },
              { label: 'Pricing Planner', target: '#estimator' },
              { label: 'Verified Reviews', target: '#reviews' },
              { label: 'FAQ', target: '#faq' },
              { label: 'Contact Dispatch', target: '#contact' }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.target}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-medium text-lg text-slate-300 hover:text-amber-400 transition-colors duration-200 py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="h-[1px] bg-slate-800 my-2"></div>
            <div className="flex flex-col gap-4">
              <a href="tel:0000000000" className="flex items-center gap-3 text-slate-300 py-2">
                <span className="p-2.5 rounded-full bg-slate-800/50">
                  <Phone className="w-4 h-4 text-amber-400" />
                </span>
                <span className="font-semibold text-base font-display">(000) 000-0000</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all duration-300 block font-display shadow-lg shadow-amber-500/10"
              >
                Request Service
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Large Hero Section */}
      <section id="hero" className="relative bg-luxury-navy text-slate-100 overflow-hidden pt-12 pb-24 md:pt-20 md:pb-36 lg:py-40">
        
        {/* Ambient radial blur backdrops for high-end digital agency feel */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Diagonal architectural accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[150px] bg-slate-50 transform origin-bottom-left -skew-y-3 pointer-events-none"></div>

        {/* Hero Background Image Grid Layer */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Bathroom Design" 
            className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 backdrop-blur-sm shadow-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 font-display">
                Toronto's Premier Master Plumbers
              </span>
            </div>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white">
              Redefining Canadian Flow.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Luxury Plumbing
              </span> & Engineering.
            </h1>

            <p className="font-sans text-slate-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              Crafting flawless plumbing, drainage, and mechanical hydronic systems for Toronto's finest residential and commercial spaces. Red Seal Certified Master Plumbers. 24/7 priority emergency dispatch.
            </p>

            {/* Micro-interaction Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2">
              <a
                href="#contact"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-102 active:scale-98 transition-all duration-300 font-display flex items-center justify-center gap-2 group text-base"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl active:scale-98 transition-all duration-300 font-display text-center text-base hover:text-amber-400"
              >
                Explore Services
              </a>
            </div>

            {/* Rapid Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 w-full max-w-xl">
              <div>
                <span className="block text-2xl md:text-3xl font-display font-extrabold text-amber-400">45m</span>
                <span className="block text-xs uppercase tracking-widest font-semibold text-slate-400 mt-1">Arrival SLA</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-display font-extrabold text-amber-400">100%</span>
                <span className="block text-xs uppercase tracking-widest font-semibold text-slate-400 mt-1">Red Seal Plumbers</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-display font-extrabold text-amber-400">$10M</span>
                <span className="block text-xs uppercase tracking-widest font-semibold text-slate-400 mt-1">Fully Insured</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Service Booking Card Column */}
          <div className="lg:col-span-5 w-full animate-scale-up">
            <div className="glass-panel-dark text-slate-100 p-8 rounded-2xl border border-slate-700/60 shadow-2xl relative">
              <div className="absolute top-4 right-4 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                Instant Check
              </div>
              
              <h3 className="font-display font-bold text-xl mb-1.5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Active Dispatch Zones
              </h3>
              <p className="text-slate-400 text-xs mb-6 font-light">
                Enter your neighborhood or first 3 digits of postal code to check immediate emergency service arrival time.
              </p>

              <form onSubmit={handleAreaSearch} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="e.g. Yorkville, Forest Hill, M5S..."
                  value={areaSearchQuery}
                  onChange={(e) => setAreaSearchQuery(e.target.value)}
                  className="bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-500 flex-1 transition-all"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl hover:scale-102 active:scale-98 transition-all duration-300"
                >
                  Check
                </button>
              </form>

              {/* Dynamic Search Results */}
              {areaSearchResult ? (
                <div className={`p-4 rounded-xl border animate-scale-up ${
                  areaSearchResult.found 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                    : 'bg-red-500/10 border-red-500/20 text-red-300'
                }`}>
                  {areaSearchResult.found ? (
                    <div className="flex gap-3">
                      <div className="p-1 rounded-full bg-emerald-500/20 self-start">
                        <Check className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <span className="font-bold block text-sm font-display">{areaSearchResult.neighborhood} Served!</span>
                        <p className="text-xs text-slate-300 mt-1">
                          Our active dispatcher in this sector is estimated to arrive in <strong className="text-amber-400 font-bold">{areaSearchResult.time}</strong>. No emergency premium rate multiplier.
                        </p>
                        <a 
                          href="#contact" 
                          onClick={() => {
                            setBookingFormData(prev => ({ ...prev, neighborhood: areaSearchResult.neighborhood }));
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 mt-3 hover:underline"
                        >
                          Book this area now
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="p-1 rounded-full bg-red-500/20 self-start">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <span className="font-bold block text-sm font-display">Service Location Audited</span>
                        <p className="text-xs text-slate-300 mt-1">
                          We do serve "{areaSearchResult.neighborhood}". Our standby vehicles operate across the whole GTA. Contact our 24/7 hotline directly to route the nearest dispatch vehicle.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs flex gap-3 items-center">
                  <Info className="w-5 h-5 text-amber-500/60 shrink-0" />
                  <span>Serving Downtown Toronto, Yorkville, Forest Hill, Rosedale, High Park, Oakville, North York, Markham, and the wider GTA.</span>
                </div>
              )}

              {/* Instant Emergency Booking CTA */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">24/7 Urgent Dispatch</span>
                  <a href="tel:0000000000" className="text-lg font-display font-extrabold text-amber-400 hover:underline">(000) 000-0000</a>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800 font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  Plumbers Online: 14
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Badge Strip */}
      <section className="bg-white border-y border-slate-100 py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="font-display font-black text-2xl md:text-3xl text-luxury-blue">100%</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-display">Canadian Owned & Operated</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display font-black text-2xl md:text-3xl text-luxury-blue">Red Seal</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-display">Licensed Master Plumbers</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display font-black text-2xl md:text-3xl text-luxury-blue">Flat-Rate</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-display">Upfront Pricing - No Surprises</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display font-black text-2xl md:text-3xl text-luxury-blue">25-Year</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-display">Structural Quality Guarantee</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-amber-600 uppercase tracking-widest font-extrabold text-sm font-display block">The Breevo Quality Standard</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-luxury-blue">
              Why Discerning Toronto Homeowners Choose Breevo
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2"></div>
            <p className="text-slate-600 font-sans text-base md:text-lg font-light leading-relaxed mt-3">
              We approach plumbing through the lens of meticulous structural engineering and luxury client experience. Our work is clean, reliable, and guaranteed for decades.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Image Column with Hover zoom */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-amber-500 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-300"></div>
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
                  alt="Certified Master Plumber welding piping" 
                  className="w-full object-cover h-[450px] transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-amber-500 text-slate-950 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full block w-fit mb-2">Red Seal Standard</span>
                  <p className="font-display font-bold text-xl leading-snug">Precision structural piping engineered for Ontario's extreme winter cycles.</p>
                </div>
              </div>
            </div>

            {/* Why Us Cards Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Award,
                  title: 'Red Seal Master Craftsmanship',
                  desc: 'Every technician undergoes continuous training to verify mastery in copper alignments, mechanical setups, and custom drainage layouts.'
                },
                {
                  icon: Clock,
                  title: '45-Minute Emergency SLA',
                  desc: 'Our fleet of premium dispatch vans is strategically stationed across key nodes in Toronto to support prompt containment when emergencies happen.'
                },
                {
                  icon: Shield,
                  title: 'Transparent Written Contracts',
                  desc: 'We present fully itemized flat-rate options on our digital tablets prior to commencing any work. Zero sneaky fees. Zero surprises.'
                },
                {
                  icon: Sparkles,
                  title: 'White-Glove Cleanliness',
                  desc: 'We protect your high-end floors and finishes using customized dust barrier blankets, clean shoe protectors, and sanitize all active zones post-work.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-slate-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                    <item.icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-luxury-blue group-hover:text-amber-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-amber-600 uppercase tracking-widest font-extrabold text-sm font-display block">Comprehensive Solutions</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-luxury-blue">
              Our Premium Services
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2"></div>
            <p className="text-slate-600 font-sans text-base md:text-lg font-light leading-relaxed mt-3">
              We deliver engineered, robust solutions across both high-end residential renovations and demanding commercial facility grids.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <div 
                key={srv.id}
                className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col items-start justify-between min-h-[350px] hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-500/20 transition-all duration-300 group relative"
              >
                {/* Accent Tag */}
                <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded-full">
                  {srv.tag}
                </span>

                <div className="flex flex-col items-start gap-4 w-full">
                  {/* Icon Panel */}
                  <div className="p-3.5 rounded-xl bg-white text-amber-600 shadow-sm border border-slate-100 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    <srv.icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  
                  <div>
                    <h3 className="font-display font-bold text-lg text-luxury-blue leading-tight mb-2 group-hover:text-amber-600 transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-slate-500 text-xs font-mono font-bold tracking-wide">
                      Est: {srv.priceEstimate}
                    </p>
                    <p className="text-slate-600 text-sm font-light mt-3 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>

                <div className="w-full mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  {/* Interactive Trigger Button */}
                  <button 
                    onClick={() => setSelectedServiceId(srv.id)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <a 
                    href="#contact" 
                    onClick={() => {
                      setBookingFormData(prev => ({ ...prev, serviceType: srv.name }));
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-luxury-blue hover:underline"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Service Interactive Details Modal Component */}
      {selectedServiceId && (
        (() => {
          const srv = services.find((s) => s.id === selectedServiceId);
          if (!srv) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-scale-up relative">
                
                {/* Header Backdrop */}
                <div className="bg-luxury-navy text-white p-6 relative">
                  <button 
                    onClick={() => setSelectedServiceId(null)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full inline-block mb-2">
                    {srv.tag} Portfolio
                  </span>
                  <h3 className="font-display font-extrabold text-2xl pr-8">{srv.name}</h3>
                  <p className="text-slate-300 text-sm font-light mt-2 leading-relaxed">{srv.description}</p>
                </div>

                {/* Body Details */}
                <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                  <h4 className="font-display font-extrabold text-sm text-luxury-blue uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    Engineering Specifications Included:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                    {srv.extendedDetails.map((detail, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-slate-600 font-sans leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 stroke-[2.5]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Built-in Client Review Specific to this Service */}
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-display font-bold text-sm block text-luxury-blue">{srv.testimonial.author}</span>
                        <span className="text-[10px] text-slate-500 block">{srv.testimonial.location}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(srv.testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-sans italic leading-relaxed">
                      "{srv.testimonial.quote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold">Standard Estimate Range</span>
                      <strong className="text-lg font-display font-black text-luxury-blue">{srv.priceEstimate}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setBookingFormData(prev => ({ ...prev, serviceType: srv.name }));
                        setSelectedServiceId(null);
                        const formEl = document.getElementById('contact');
                        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:scale-102 active:scale-98 transition-all duration-300"
                    >
                      Book This Service
                    </button>
                  </div>
                </div>

                {/* Footer close option */}
                <div className="border-t border-slate-100 p-4 flex justify-end bg-slate-50">
                  <button 
                    onClick={() => setSelectedServiceId(null)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 py-1.5 px-4 rounded-lg cursor-pointer"
                  >
                    Close spec sheet
                  </button>
                </div>

              </div>
            </div>
          );
        })()
      )}

      {/* Before & After Interactive Slider Section */}
      <section id="before-after" className="py-24 bg-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-amber-600 uppercase tracking-widest font-extrabold text-sm font-display block">Visual Craftsmanship</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-luxury-blue">
              Before & After Remodeling
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2"></div>
            <p className="text-slate-600 font-sans text-base md:text-lg font-light leading-relaxed mt-3">
              Drag the brass slider handle left or right to interactively view the transformation from dated mechanical piping to high-end designer bath layout.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            
            {/* The Interactive Slider Stage */}
            <div 
              ref={sliderContainerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-800 select-none cursor-ew-resize"
            >
              
              {/* After State (Always fully in background) */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                  alt="After Remodeling - Premium luxury brass layout" 
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute bottom-6 right-6 bg-slate-950/80 backdrop-blur-sm text-slate-100 text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full z-10 border border-white/10">
                  After: Handcrafted Luxury
                </div>
              </div>

              {/* Before State (Clipped based on slider position state) */}
              <div 
                className="absolute inset-0"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200" 
                  alt="Before Remodeling - Dated, rough installation" 
                  className="w-full h-full object-cover pointer-events-none filter grayscale saturate-50"
                />
                <div className="absolute bottom-6 left-6 bg-amber-600/90 text-slate-100 text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full z-10">
                  Before: Dated Rough-In
                </div>
              </div>

              {/* Slider Dragging Handle Bar */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-amber-500 cursor-ew-resize z-20 shadow-lg"
                style={{ left: `${sliderPosition}%` }}
              >
                <div 
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-4 border-white active:scale-90 active:bg-amber-400 transition-transform duration-100"
                >
                  <Sliders className="w-4 h-4 stroke-[2.5] rotate-90" />
                </div>
              </div>

            </div>

            {/* Instruction tooltip below */}
            <div className="flex justify-center items-center gap-2 text-xs text-slate-500 mt-6 font-medium">
              <span className="w-12 h-[1px] bg-slate-300"></span>
              <span>Hold the circle handle and swipe to comparison view</span>
              <span className="w-12 h-[1px] bg-slate-300"></span>
            </div>

          </div>

        </div>
      </section>

      {/* Our 4-Step Process Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center gap-3">
            <span className="text-amber-600 uppercase tracking-widest font-extrabold text-sm font-display block">How We Work</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-luxury-blue">
              The Breevo Engineering Process
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2"></div>
            <p className="text-slate-600 font-sans text-base md:text-lg font-light leading-relaxed mt-3">
              We employ structured protocols across every inspection and repair, keeping you fully in control from first assessment to ultimate handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Visual connecting line for desktop flow */}
            <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10"></div>

            {[
              {
                step: '01',
                title: 'Immediate Diagnosis',
                desc: 'Our dispatchers coordinate direct route mapping. Plumbers execute comprehensive diagnostics using acoustic sensing or thermal imaging.'
              },
              {
                step: '02',
                title: 'Digital Pricing Consultation',
                desc: 'We map out precise structural findings on our mobile dashboard. You choose from clear flat-rate tier sheets. Approved before we start.'
              },
              {
                step: '03',
                title: 'Surgical Workmanship',
                desc: 'We wrap all surrounding areas in protective drop-cloths. Master plumbers execute repairs with top-grade copper, brass, and fixtures.'
              },
              {
                step: '04',
                title: 'Quality Certification',
                desc: 'We run structural hydrostatic tests to confirm seal durability. Clean down the workspace and present our 25-year structural quality certificate.'
              }
            ].map((p, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 text-amber-600 border border-slate-100 flex items-center justify-center font-display font-black text-xl shadow-sm group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                  {p.step}
                </div>
                <h3 className="font-display font-bold text-lg text-luxury-blue mt-2 group-hover:text-amber-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Cost Planner / Project Estimator (Extremely Agency Level Feature!) */}
      <section id="estimator" className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-amber-400 uppercase tracking-widest font-extrabold text-sm font-display block">Transparent Budgeting</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-white">
              Interactive Project Cost Estimator
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2"></div>
            <p className="text-slate-300 font-sans text-base md:text-lg font-light leading-relaxed mt-3">
              Configure your specific plumbing layout needs below to generate an immediate, upfront price and schedule window estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Input configuration column */}
            <div className="lg:col-span-7 bg-slate-950/40 border border-slate-800 p-8 rounded-2xl flex flex-col gap-6">
              
              {/* Category selector */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 font-display">
                  1. Project Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'residential', label: 'Home Repair', sub: 'Standard pipes & valves' },
                    { id: 'renovation', label: 'Luxury Reno', sub: 'Custom custom fixture layout' },
                    { id: 'commercial', label: 'Commercial Fit', sub: 'Interceptors & heavy drain' },
                    { id: 'emergency', label: 'Emergency', sub: 'SLA rapid dispatch' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setEstimatorCategory(cat.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        estimatorCategory === cat.id
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-display font-bold text-sm block">{cat.label}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block leading-tight">{cat.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale Selector */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 font-display">
                  2. Installation Scale
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'fixture', label: 'Single Fixture / Segment', sub: 'One toilet, shower, or pump' },
                    { id: 'room', label: 'Full Room / Zone', sub: 'Complete kitchen or laundry' },
                    { id: 'building', label: 'Full Building System', sub: 'Multi-story luxury mansion' }
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setEstimatorScale(sc.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        estimatorScale === sc.id
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-display font-bold text-sm block">{sc.label}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block leading-tight">{sc.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials grade */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 font-display">
                  3. Material Grade
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'premium', label: 'Luxury Custom Copper & Brass', sub: 'Lifetime copper integrity, designer fixtures' },
                    { id: 'standard-pex', label: 'High-Grade Commercial PEX', sub: 'High-flex engineered polymer lines' },
                    { id: 'not-applicable', label: 'Not Applicable / Diagnostics Only', sub: 'Sewer camera, blockages, or emergency flush' }
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setEstimatorMaterials(mat.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        estimatorMaterials === mat.id
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-display font-bold text-sm block">{mat.label}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block leading-tight">{mat.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Generated results column */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-950 to-luxury-navy border border-slate-800 p-8 rounded-2xl relative">
              <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
                Upfront Estimate
              </div>

              <div className="mb-8">
                <span className="text-slate-400 text-xs uppercase tracking-widest font-bold block mb-2 font-display">
                  Project Estimate Breakdown:
                </span>
                <div className="h-[1px] bg-slate-800 mb-6"></div>

                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-slate-300 text-sm font-light">Projected Price Range:</span>
                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-display font-black text-amber-400 leading-none">
                      ${calculatedEstimate.min.toLocaleString()} - ${calculatedEstimate.max.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">CAD. Flat-rate, fully itemized.</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-y border-slate-800 mb-6">
                  <span className="text-slate-300 text-sm font-light">Estimated Field Duration:</span>
                  <span className="font-display font-bold text-slate-200">{calculatedEstimate.duration}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
                    <Check className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span>Includes complete Red Seal Master plumber diagnostic assessment</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
                    <Check className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span>Post-installation hydrostatic seal testing with full certificate</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
                    <Check className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span>White-Glove site protection and deep post-service sanitation</span>
                  </div>
                </div>
              </div>

              <button
                onClick={applyEstimateToBooking}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-101 active:scale-99 transition-all duration-300 font-display text-center text-sm uppercase tracking-wider cursor-pointer"
              >
                Apply Estimate to Booking Form
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Verified Reviews / Testimonials Section */}
      <section id="reviews" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-amber-600 uppercase tracking-widest font-extrabold text-sm font-display block">Verified Homeowner Audits</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-luxury-blue">
              Client Testimonials
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2"></div>
            <p className="text-slate-600 font-sans text-base md:text-lg font-light leading-relaxed mt-3">
              We maintain a near-flawless 4.9-star average. Read authentic client reviews from across Toronto's neighborhoods.
            </p>
          </div>

          {/* Testimonial Filter Row */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-10">
            {['All', 'Renovation', 'Emergency', 'Wellness', 'Defense', 'Maintenance'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveReviewFilter(filter)}
                className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider transition-all cursor-pointer uppercase ${
                  activeReviewFilter === filter
                    ? 'bg-luxury-blue text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry / Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-scale-up"
              >
                <div className="w-full">
                  {/* Rating Stars and verified badge */}
                  <div className="flex items-center justify-between mb-4 w-full">
                    <div className="flex gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-widest flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Verified Client
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm italic font-sans leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 w-full">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-display font-bold text-sm flex items-center justify-center shadow-inner">
                    {rev.avatarText}
                  </div>
                  <div>
                    <span className="block text-sm font-display font-bold text-luxury-blue">{rev.name}</span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{rev.location} • {rev.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google Review Callout */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-100 p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-lg text-luxury-blue">Rated 4.9 Out of 5.0 on Google Maps</h4>
                <p className="text-slate-500 text-xs mt-1">Based on over 920+ real, third-party client audits across the Greater Toronto Area.</p>
              </div>
            </div>
            <a 
              href="#contact" 
              className="bg-luxury-blue text-white hover:bg-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:scale-102 transition-all shrink-0 font-display"
            >
              Request a Master Plumber
            </a>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-amber-600 uppercase tracking-widest font-extrabold text-sm font-display block">Answering Your Questions</span>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-luxury-blue">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2"></div>
            <p className="text-slate-600 font-sans text-base md:text-lg font-light leading-relaxed mt-3">
              Learn about our diagnostic pricing, certified plumbers, and winter flood defense recommendations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {[
              {
                q: 'How quickly can a Breevo dispatcher arrive during a water emergency?',
                a: 'We guarantee dispatch arrival in 45 minutes or less anywhere in Toronto and central GTA cities. Our master plumbers are strategically placed with fully pre-stocked priority trucks loaded with sump backups, industrial water extractors, high-grade copper joints, and sub-zero pipe-fusing kits.'
              },
              {
                q: 'Do you provide free upfront written estimates before commencing work?',
                a: 'Yes, completely. Prior to starting any physical work, our technician will conduct a thorough diagnostic assessment, review options with you on our tablet, and present a completely transparent flat-rate estimate. The rate we quote is the exact rate you pay. No extra hourly overruns or unexpected fees.'
              },
              {
                q: 'What is the benefit of high-efficiency tankless water heaters in Canadian climates?',
                a: 'Standard tank style heaters must constantly cycle power to warm ancient stored water, incurring continuous electricity or gas burn. High-efficiency condensing tankless systems (like Navien) only fire water-heating coils instantly upon handle trigger, cutting water energy bills by up to 40% while delivering infinite continuous hot water.'
              },
              {
                q: 'Are your plumbers fully licensed, Red Seal certified, and insured in Ontario?',
                a: 'Yes, 100%. Every single Breevo field operative holds active Red Seal Master Plumber or Journeyperson licensing credentials. Furthermore, we carry comprehensive general liability protection coverage of $10 Million, ensuring complete structure security and absolute peace of mind for both residential homeowners and commercial buildings.'
              },
              {
                q: 'Why is certified backflow prevention testing mandatory in Toronto, and do you handle it?',
                a: 'The City of Toronto mandates backflow testing for all commercial facilities and specific residential systems to prevent cross-contamination of public drinking water. Our master technicians are fully certified backflow assembly testers and handle compliance testing, paperwork submission, and annual calibration.'
              },
              {
                q: 'How does hard water affect luxury plumbing fixtures, and what solutions do you offer?',
                a: 'Toronto and GTA municipal water contains solid calcium and magnesium deposits which cause limescale buildup, clogging premium shower jets and staining luxury matte black or gold brass fixtures. We install continuous catalytic scale-reduction water conditioners and medical-grade whole-house carbon filtration units to preserve your plumbing health and fixtures.'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-slate-100/50 transition-colors"
                >
                  <h3 className="font-display font-bold text-base md:text-lg text-luxury-blue pr-4">
                    {item.q}
                  </h3>
                  <div className={`p-1.5 rounded-lg bg-white shadow-sm text-slate-400 transition-transform duration-300 ${faqOpenIndex === idx ? 'rotate-180 text-amber-500' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Animated collapse block */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    faqOpenIndex === idx ? 'max-h-60 border-t border-slate-200/50 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="p-6 text-slate-600 text-sm md:text-base font-light leading-relaxed bg-white">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact & Consultation Scheduler Section */}
      <section id="contact" className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden">
        
        {/* Ambient radial lighting for high-end feel */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-12">
              <div className="flex flex-col items-start gap-4">
                <span className="text-amber-400 uppercase tracking-widest font-extrabold text-sm font-display block">Priority Routing</span>
                <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
                  Schedule Your Technical Consult
                </h2>
                <p className="text-slate-300 font-sans text-base md:text-lg font-light leading-relaxed mt-2">
                  Request a Red Seal licensed master plumber. Fill out the interactive consultation form, or access our 24/7 direct dispatcher hotline.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="flex flex-col gap-6">
                
                {/* Phone Card */}
                <a href="tel:0000000000" className="flex items-center gap-4 bg-slate-950/40 border border-slate-800 p-5 rounded-xl hover:border-amber-500/30 transition-all group">
                  <span className="p-3.5 rounded-xl bg-slate-900 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Direct Dispatch Desk</span>
                    <span className="text-lg font-display font-extrabold text-white group-hover:text-amber-400 transition-colors">(000) 000-0000</span>
                  </div>
                </a>

                {/* Email Card */}
                <a href="mailto:hello@example.ca" className="flex items-center gap-4 bg-slate-950/40 border border-slate-800 p-5 rounded-xl hover:border-amber-500/30 transition-all group">
                  <span className="p-3.5 rounded-xl bg-slate-900 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Electronic Inquiries</span>
                    <span className="text-base font-display font-bold text-white group-hover:text-amber-400 transition-colors">hello@example.ca</span>
                  </div>
                </a>

                {/* Address Card */}
                <div className="flex items-center gap-4 bg-slate-950/40 border border-slate-800 p-5 rounded-xl">
                  <span className="p-3.5 rounded-xl bg-slate-900 text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Engineering Headquarters</span>
                    <span className="text-sm font-sans text-slate-300">123 Main Street, Toronto, Ontario</span>
                  </div>
                </div>

              </div>

              {/* Styled Mock Google Map Visual Component */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 relative overflow-hidden aspect-video shadow-2xl flex flex-col justify-between">
                {/* Mock styled Map graphics */}
                <div className="absolute inset-0 z-0 opacity-40">
                  {/* Visual grid representing the Toronto harbor and block system */}
                  <svg className="w-full h-full text-slate-800" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Simulated Lake Ontario Water edge */}
                    <path d="M -100 250 Q 150 180, 450 250 L 450 350 L -100 350 Z" fill="#003566" opacity="0.3" />
                    {/* Street paths */}
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#ffb703" strokeWidth="1.5" opacity="0.3" />
                    <line x1="180" y1="0" x2="180" y2="300" stroke="#ffb703" strokeWidth="1.5" opacity="0.3" />
                  </svg>
                  {/* Pulse dispatcher node */}
                  <div className="absolute top-[120px] left-[180px] -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-md"></span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] text-slate-300 font-mono tracking-wide w-fit">
                    📍 ONTARIO HUB: 123 Main St, Toronto
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl backdrop-blur-sm text-xs mt-auto">
                    <span className="font-bold text-white block mb-0.5">Mock Location Mapping</span>
                    <p className="text-slate-400 text-[10px] leading-tight">Toronto Central Dispatch Center. standby crews optimized for immediate regional response.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-slate-950/30 border border-slate-800 p-8 md:p-10 rounded-2xl shadow-2xl relative">
                
                {formSubmitted ? (
                  <div className="py-12 px-6 text-center flex flex-col items-center gap-6 animate-scale-up">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shadow-lg border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-2xl text-white mb-2">Estimate Requested Successfully</h3>
                      <p className="text-slate-300 text-sm max-w-md font-light leading-relaxed">
                        Your preliminary project specifications have been parsed. A local dispatcher will compile the certified route-map.
                      </p>
                    </div>

                    {/* Fictional Booking Recap Grid */}
                    <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl w-full max-w-md text-left text-xs text-slate-300 space-y-2.5">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-500 font-bold uppercase">Assigned Service:</span>
                        <span className="text-white font-semibold">{bookingFormData.serviceType}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-500 font-bold uppercase">Contact Client:</span>
                        <span className="text-white font-semibold">{bookingFormData.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-500 font-bold uppercase">Phone SLA:</span>
                        <span className="text-white font-semibold">{bookingFormData.phone}</span>
                      </div>
                      {bookingFormData.additionalNotes && (
                        <div className="pt-1.5 text-slate-400 font-light text-[11px] leading-relaxed">
                          <span className="font-bold text-slate-500 block uppercase text-[10px] mb-1">Attached Specifications:</span>
                          <p className="whitespace-pre-line bg-slate-900/50 p-2.5 rounded border border-slate-800">{bookingFormData.additionalNotes}</p>
                        </div>
                      )}
                    </div>

                    {/* Obligatory Demo Notice Banner */}
                    <div className="w-full max-w-md p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-bold font-display flex items-center gap-3 justify-center">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <span>Demo Website — Form submission disabled.</span>
                    </div>

                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-slate-400 hover:text-white underline font-semibold mt-4 cursor-pointer"
                    >
                      Submit another mock scheduling request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                    
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-bold text-amber-400 font-mono">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Standby Plumbers Available
                    </div>

                    <h3 className="font-display font-black text-xl mb-1 text-white">
                      Request Certified Dispatcher
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2 font-display">
                          Your Full Name <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jean-François Tremblay"
                          value={bookingFormData.name}
                          onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 w-full transition-all"
                        />
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2 font-display">
                          Primary Phone <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. (416) 555-0199"
                          value={bookingFormData.phone}
                          onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value})}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 w-full transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email input */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2 font-display">
                          Email Address <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. jf@torontoflow.ca"
                          value={bookingFormData.email}
                          onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 w-full transition-all"
                        />
                      </div>

                      {/* Neighborhood */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2 font-display">
                          Toronto GTA Neighborhood
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Yorkville"
                          value={bookingFormData.neighborhood}
                          onChange={(e) => setBookingFormData({...bookingFormData, neighborhood: e.target.value})}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 w-full transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Service Category Selection */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2 font-display">
                          Select Required Service
                        </label>
                        <select
                          value={bookingFormData.serviceType}
                          onChange={(e) => setBookingFormData({...bookingFormData, serviceType: e.target.value})}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full transition-all"
                        >
                          {services.map((s, i) => (
                            <option key={i} value={s.name}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Urgency selection */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2 font-display">
                          Urgency Tier
                        </label>
                        <select
                          value={bookingFormData.urgency}
                          onChange={(e) => setBookingFormData({...bookingFormData, urgency: e.target.value})}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full transition-all"
                        >
                          <option value="Same-Week">Same-Week Scheduling (Standard)</option>
                          <option value="Same-Day">Same-Day Priority (24h Window)</option>
                          <option value="Immediate Emergency">🚨 Immediate Emergency Dispatch</option>
                          <option value="Custom Renovation Project">Custom Luxury Renovation Bid</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2 font-display">
                        Project Description or Hydronic Specs
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Please elaborate on your pipe material, fixture models, faucet details, or emergency burst status..."
                        value={bookingFormData.additionalNotes}
                        onChange={(e) => setBookingFormData({...bookingFormData, additionalNotes: e.target.value})}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 w-full transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-slate-950 font-black px-6 py-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-101 active:scale-99 transition-all duration-300 font-display text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                      {formSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                          Verifying Dispatch Coordinates...
                        </>
                      ) : (
                        <>
                          Submit Standby Request
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </>
                      )}
                    </button>

                    {/* Obligatory Demo Notice Banner */}
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs font-bold font-display flex items-center gap-3 justify-center mt-2 select-none">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <span>Demo Website — Form submission disabled.</span>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer Area with Links and Privacy Toggle */}
      <footer className="bg-luxury-navy text-slate-400 pt-16 pb-12 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Group */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                <Droplet className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-display font-extrabold text-lg text-white tracking-tight leading-none block">
                  BREEVO<span className="text-amber-500 font-light">PLUMBERS</span>
                </span>
                <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold block mt-0.5">
                  Luxury Plumbing & Engineering
                </span>
              </div>
            </div>
            <p className="text-xs font-light text-slate-400 leading-relaxed max-w-sm">
              We engineer flawless water flow, advanced hydronics, and pristine kitchen/bathroom mechanical structures for the Greater Toronto Area.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full inline-block font-mono">
                🍁 Red Seal Master Approved
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-widest mb-6">Explore</h4>
            <ul className="flex flex-col gap-3 text-xs">
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">The Breevo Quality SLA</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Our Master Services</a></li>
              <li><a href="#before-after" className="hover:text-amber-400 transition-colors">Before & After Showcase</a></li>
              <li><a href="#estimator" className="hover:text-amber-400 transition-colors">Interactive Cost Calculator</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Verified Homeowner Reviews</a></li>
            </ul>
          </div>

          {/* Service Sectors */}
          <div>
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-widest mb-6">Service Area Hubs</h4>
            <ul className="flex flex-col gap-3 text-xs">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Rosedale & Forest Hill</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">The Annex & Yorkville</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Bridle Path & Lawrence Park</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">High Park & Danforth Metro</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Oakville, Vaughan & Markham</a></li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-widest mb-6">Direct Inquiries</h4>
            <div className="flex flex-col gap-4 text-xs font-sans">
              <p className="leading-relaxed">
                Contact our standby Toronto dispatcher directly for priority routing and immediate responses.
              </p>
              <div>
                <a href="tel:0000000000" className="text-amber-400 text-base font-display font-black hover:underline block">(000) 000-0000</a>
                <a href="mailto:hello@example.ca" className="text-slate-300 hover:text-amber-400 hover:underline block mt-1">hello@example.ca</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Breevo Plumbers Inc. Flowing Perfection. Built for Canada. All rights reserved.</p>
          <div className="flex gap-6">
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 font-semibold underline"
            >
              <FileText className="w-3.5 h-3.5" /> Privacy Policy & SLA Terms
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Toronto, Ontario, Canada</span>
          </div>
        </div>
      </footer>

      {/* Glassmorphic Privacy Policy Dialog Component */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in-up">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden animate-scale-up relative">
            
            <div className="bg-luxury-navy text-slate-100 p-6 flex justify-between items-center border-b border-slate-800">
              <h3 className="font-display font-extrabold text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400 animate-pulse" />
                Breevo Privacy Policy & Service SLA Terms
              </h3>
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto text-sm text-slate-600 font-sans leading-relaxed space-y-4">
              
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-700 text-xs font-bold font-display flex items-center gap-3">
                <Info className="w-5 h-5 shrink-0" />
                <span>Demo Website Notice: All information, testimonials, prices, and locations listed on this website are completely fictional and presented as part of a high-end designer mockup. No actual data is collected or submitted.</span>
              </div>

              <h4 className="font-display font-extrabold text-slate-900 mt-6 text-base">1. Commitment to Privacy</h4>
              <p>
                At Breevo Plumbers, we respect the absolute privacy of our clients, particularly regarding high-end custom residential blueprints and commercial layout maps. This policy outlines how mock metadata behaves under standard site security constraints.
              </p>

              <h4 className="font-display font-extrabold text-slate-900 mt-6 text-base">2. Diagnostic Data Retention</h4>
              <p>
                Any diagnostic camera imagery, hydrostatic pressure logs, or structural plumbing analysis reports generated by our Red Seal technicians are stored in secured local servers. We never transmit structural blueprints or plumbing system configurations to third-party databases.
              </p>

              <h4 className="font-display font-extrabold text-slate-900 mt-6 text-base">3. 45-Minute Emergency SLA Guarantee</h4>
              <p>
                Our 45-minute arrival service level agreement is subject to standard Greater Toronto Area weather events and municipal traffic routing. During extreme sub-zero weather cycles or flash flooding, priority routing is dynamically updated based on critical structure risk metrics.
              </p>

              <h4 className="font-display font-extrabold text-slate-900 mt-6 text-base">4. Upfront Flat-Rate Commitment</h4>
              <p>
                We do not implement hidden environmental or disposal surcharges. All materials utilized, including premium copper, lead-free brass fittings, and specialized PEX manifolds, are completely detailed on itemized invoices prior to start.
              </p>
            </div>

            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono">Last Updated: July 2026 • Toronto, ON</span>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="bg-luxury-blue text-white hover:bg-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs hover:scale-102 transition-all cursor-pointer font-display"
              >
                Accept Terms
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
