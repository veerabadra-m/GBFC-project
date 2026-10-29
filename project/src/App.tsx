import { FormEvent, useState } from 'react';

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Shield,
  Target,
  Users,
  X,
} from 'lucide-react';

import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const coachImage = '/image copy.png';
const classImages = [
  'https://images.pexels.com/photos/4754138/pexels-photo-4754138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4753929/pexels-photo-4753929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5750886/pexels-photo-5750886.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const programs = [
  ['Boxing', 'Footwork, timing, technique, and conditioning for every level.', 0],
  ['Kickboxing', 'Build sharp combinations, balance, speed, and control.', 1],
  ['Muay Thai', 'Develop practical striking fundamentals and round-by-round fitness.', 0],
  ['Mixed Martial Arts (MMA)', 'Train across striking, movement, wrestling, and composure.', 2],
  ['Brazilian Jiu-Jitsu (BJJ)', 'Learn control, positions, escapes, and technical problem-solving.', 1],
  ['Wrestling', 'Build takedown fundamentals, base, pressure, and athletic strength.', 2],
  ['Strength & Conditioning', 'Structured work that builds a stronger, more capable body.', 0],
  ['Circuit Training', 'Keep moving with focused full-body conditioning sessions.', 1],
] as const;

const timetable = [
  ['6 AM', 'Boxing', 'Strength & Conditioning', 'BJJ', 'Kickboxing', 'Circuit Training', 'MMA'],
  ['7 AM', 'Muay Thai', 'Strength & Conditioning', 'Kickboxing', 'Wrestling', 'Circuit Training', 'Boxing'],
  ['8 AM', 'Kickboxing', 'Strength & Conditioning', 'MMA', 'Boxing', 'Circuit Training', 'Wrestling'],
  ['10–11 AM', 'Ladies Batch', 'Ladies Batch', 'Ladies Batch', 'Ladies Batch', 'Ladies Batch', 'Ladies Batch'],
  ['5 PM', 'MMA', 'Strength & Conditioning', 'BJJ', 'Boxing', 'Circuit Training', 'Muay Thai'],
  ['6 PM', 'Boxing', 'Strength & Conditioning', 'Wrestling', 'Muay Thai', 'Circuit Training', 'MMA'],
  ['7 PM', 'Muay Thai', 'Strength & Conditioning', 'MMA', 'Boxing', 'Circuit Training', 'No class scheduled'],
  ['8 PM', 'Wrestling', 'Strength & Conditioning', 'Boxing', 'Muay Thai', 'Circuit Training', 'No class scheduled'],
];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showFullForm, setShowFullForm] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    setFormStatus('error');
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  setFormStatus('sending');

  try {
    const response = await fetch('http://localhost:5000/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.get('name'),
        contact: data.get('contact'),
        interest: data.get('interest') ?? '',
        message: data.get('message') ?? '',
      }),
    });

    if (!response.ok) throw new Error('Request failed');

    setFormStatus('success');
    form.reset();
  } catch (error) {
    console.error('Enquiry failed:', error);
    setFormStatus('error');
  }
};

  return (
    <main className="gbfc-site">
      <nav className="nav-bar" id="home">
        <a className="gbfc-brand" href="#home" aria-label="GBFC home"><img src="/image.png" alt="GBFC — Ground Born Fight Club & Fitness Centre" /></a>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About</a><a href="#programs" onClick={closeMenu}>Programs</a><a href="#timetable" onClick={closeMenu}>Timetable</a><a href="#coach" onClick={closeMenu}>Head Coach</a><a href="#gallery" onClick={closeMenu}>Gallery</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="#membership" className="nav-cta" onClick={closeMenu}>Join now <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </nav>

      <section className="full-hero" id="hero">
        <div className="hero-backdrop" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Ground Born / 01</p>
          <h1>BUILT FROM<br /><em>THE GROUND UP.</em></h1>
          <p className="hero-lead">Train with purpose. Build strength, sharpen your skills, develop discipline, and challenge yourself at GBFC.</p>
          <div className="hero-actions"><a href="#membership" className="button button-primary">Join GBFC <ArrowUpRight size={17} /></a><a href="#programs" className="button button-outline">Explore programs <ArrowDown size={16} /></a><a href="#timetable" className="text-link hero-timetable">View timetable <ArrowUpRight size={16} /></a></div>
          <div className="hero-motto"><span>Strength.</span><span>Discipline.</span><span>Fight.</span></div>
        </div>
        <div className="hero-coach-visual"><img src={coachImage} alt="Shishir Poojary, Head Coach at GBFC" /><div className="portrait-overlay" /><div className="portrait-caption"><span>Head coach</span><strong>Shishir<br />Poojary</strong></div></div>
        <div className="hero-bottom"><span>GBFC / 2026</span><a href="#about">Scroll to enter <ArrowDown size={15} /></a></div>
      </section>

      <section className="coach-lockup"><div><span className="lockup-label">Official head coach</span><strong>SHISHIR POOJARY</strong></div><div className="lockup-role">HEAD COACH <span>—</span> GBFC</div><div className="defence-mark"><Shield size={17} /> 2ND LINE OF DEFENCE <strong>— ARMY</strong></div></section>

      <section className="about-section section-wrap" id="about"><div className="section-kicker"><span>02</span> About GBFC</div><div className="split-heading"><h2>MORE THAN A GYM.<br /><em>A DISCIPLINE.</em></h2><p>GBFC — Ground Born Fight Club &amp; Fitness Centre is a place to train with intent, build consistency, and become more capable through focused work.</p></div><div className="about-grid"><div><Target size={24} /><h3>Mission &amp; philosophy</h3><p>Progress starts with showing up. We keep the standard clear: disciplined training, honest effort, and steady self-improvement.</p></div><div><Dumbbell size={24} /><h3>The environment</h3><p>A focused space for strength training, conditioning, and combat-sports practice at your own level.</p></div><div><Users size={24} /><h3>Training culture</h3><p>Train alongside people who value commitment, respect, and the work it takes to move forward.</p></div></div></section>

      <section className="programs-section section-wrap" id="programs"><div className="section-heading"><div><div className="section-kicker"><span>03</span> Training programs</div><h2>FIND YOUR<br /><em>FIGHT.</em></h2></div><p>Explore the disciplines on the GBFC class schedule. Choose your starting point, then make every session count.</p></div><div className="program-grid">{programs.map(([title, description, imageIndex]) => <article className="program-card" key={title}><div className="program-image"><img src={classImages[imageIndex]} alt={`${title} training demonstration`} /><span className="program-number">0{programs.findIndex((program) => program[0] === title) + 1}</span></div><div className="program-card-body"><h3>{title}</h3><p>{description}</p><a href="#timetable">Explore class <ChevronRight size={16} /></a></div></article>)}</div></section>

      <section className="timetable-section" id="timetable"><div className="section-wrap"><div className="section-heading"><div><div className="section-kicker"><span>04</span> Weekly schedule</div><h2>GBFC CLASS<br /><em>SCHEDULE.</em></h2></div><p>Find your training session and make every hour count.</p></div><div className="table-scroll"><table><caption className="sr-only">GBFC weekly class schedule</caption><thead><tr><th>Time</th>{days.map((day) => <th key={day}>{day}</th>)}</tr></thead><tbody>{timetable.map((row) => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((className, index) => <td className={className === 'Ladies Batch' ? 'ladies-cell' : className === 'No class scheduled' ? 'no-class' : ''} key={`${row[0]}-${days[index]}`}>{className}</td>)}</tr>)}</tbody></table></div><p className="table-note"><span className="ladies-key" /> Ladies Batch <span className="no-class-key" /> No class scheduled</p></div></section>

      <section className="coach-section" id="coach"><div className="coach-photo"><img src={coachImage} alt="Shishir Poojary, Head Coach at GBFC" /><div className="coach-photo-label">GBFC<br /><em>Head coach</em></div></div><div className="coach-content"><div className="section-kicker"><span>05</span> Meet our head coach</div><h2>SHISHIR<br /><em>POOJARY.</em></h2><p className="coach-role">HEAD COACH — GBFC</p><div className="coach-identity"><Shield size={20} /><strong>2ND LINE OF DEFENCE — ARMY</strong></div><p>Shishir Poojary's professional identity is grounded in discipline, dedication, resilience, strength, focus, and commitment. His coaching approach keeps the work direct: train with purpose and build a stronger foundation one session at a time.</p><p className="editable-note">Coach biography, specialties, qualifications, and achievements can be added here when supplied.</p><a href="#membership" className="button button-primary">Train with Shishir <ArrowUpRight size={17} /></a></div></section>

      <section className="gallery-section section-wrap" id="gallery"><div className="section-heading"><div><div className="section-kicker"><span>06</span> The training floor</div><h2>INSIDE<br /><em>GBFC.</em></h2></div><p>Selected training imagery for the GBFC visual direction. Replace these demo images with official gym photography when available.</p></div><div className="gallery-grid"><div className="gallery-tile tall"><img src={classImages[0]} alt="Demo image of kickboxing training" /><span>Train with intent.</span></div><div className="gallery-tile"><img src={classImages[1]} alt="Demo image of boxing training" /><span>Stay ready.</span></div><div className="gallery-tile logo-tile"><img src="/image.png" alt="Official GBFC logo" /><span>Ground born.</span></div></div></section>

      <section className="why-section section-wrap"><div className="section-kicker"><span>07</span> Why train at GBFC</div><div className="why-grid"><div><span className="why-number">01</span><h3>Discipline<br /><em>over motivation.</em></h3><p>Create a rhythm you can return to, even when the day is difficult.</p></div><div><span className="why-number">02</span><h3>Strength<br /><em>with purpose.</em></h3><p>Build practical strength and conditioning that supports the work you want to do.</p></div><div><span className="why-number">03</span><h3>A focused<br /><em>mindset.</em></h3><p>Keep your attention on the next rep, the next round, and the next step.</p></div></div></section>

      <section className="membership-section" id="membership"><div className="membership-inner"><p className="eyebrow">Start your journey</p><h2>YOUR FIGHT<br /><em>STARTS HERE.</em></h2><p>Ready to take the next step in your fitness journey? Connect with GBFC to learn about training sessions and membership.</p><div className="hero-actions"><a href="#contact" className="button button-light">Enquire now <ArrowUpRight size={17} /></a><a href="#timetable" className="button button-outline light-outline">View timetable <ArrowUpRight size={16} /></a></div></div><div className="membership-mark">GBFC</div></section>

            <section className="contact-section section-wrap" id="contact"><div className="section-heading"><div><div className="section-kicker"><span>08</span> Membership enquiry</div><h2>MAKE YOUR<br /><em>MOVE.</em></h2></div><p>Business details can be added below when confirmed. The enquiry form is ready for a submission service to be connected.</p></div><div className="contact-grid"><div className="contact-details"><div><MapPin size={19} /><span>Gym address<br /><strong>Details to be added</strong></span></div><div><Clock3 size={19} /><span>Opening hours<br /><strong>Details to be added</strong></span></div><div><Mail size={19} /><span>Email address<br /><strong>Details to be added</strong></span></div><div><MessageCircle size={19} /><span>WhatsApp / phone<br /><strong>Details to be added</strong></span></div>  
<div className="contact-social-icons">
  <a
    href="https://wa.me/918722782512"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contact GBFC on WhatsApp"
    title="WhatsApp"
  >
    <FaWhatsapp />
  </a>

  <a
    href="https://www.instagram.com/groundbornfightclub/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Follow GBFC on Instagram"
    title="Instagram"
  >
    <FaInstagram />
  </a>
</div>
  </div><form className="enquiry-form" onSubmit={submitEnquiry} noValidate><label>Full name<input name="name" required placeholder="Your name" /></label><label>Phone number or email<input name="contact" required placeholder="How can we reach you?" /></label>{showFullForm && <><label>Training interest<select name="interest" defaultValue=""><option value="" disabled>Select a program</option>{programs.map(([title]) => <option key={title}>{title}</option>)}</select></label><label>Message<textarea name="message" rows={4} placeholder="Tell us what you would like to train..."></textarea></label></>}<button type="button" className="form-expand" onClick={() => setShowFullForm(!showFullForm)}>{showFullForm ? 'Show fewer fields' : 'Add training details'} <ChevronRight size={15} /></button><button type="submit" className="button button-primary" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending...' : 'Send enquiry'} <ArrowUpRight size={17} /></button>{formStatus === 'success' && <p className="form-message success"><Check size={15} /> Thank you! Your enquiry has been sent. We will contact you soon.</p>}{formStatus === 'error' && <p className="form-message error">We couldn't send your enquiry. Please check the required fields and try again.</p>}</form></div></section>

      <footer className="footer"><a className="gbfc-brand footer-brand" href="#home"><img src="/image.png" alt="GBFC" /></a><div><strong>Ground Born Fight Club &amp; Fitness Centre</strong><span>© 2026 GBFC. All rights reserved.</span></div>
  </footer>
    </main>
  );
}

export default App;