import { Link } from 'react-router-dom';
import { Flower2, ArrowUpRight } from 'lucide-react';
import { DOCTOR } from '../../data/doctor';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">
            <Flower2 size={37} strokeWidth={1.2} />
            <span>Dr. Himani<small>OBSTETRICS &amp; GYNAECOLOGY</small></span>
          </Link>
          <p>Thoughtful care for every stage of you.<br />Alwar, Rajasthan.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/specialties">Specialties</Link>
          <Link to="/career">Education &amp; research</Link>
          <Link to="/contact">Plan your visit</Link>
        </div>
        <div>
          <h3>Let’s connect</h3>
          <a href={`tel:${DOCTOR.contact.phone}`}>{DOCTOR.contact.phoneDisplay} <ArrowUpRight size={14} /></a>
          <a href={`mailto:${DOCTOR.contact.email}`}>{DOCTOR.contact.email}</a>
          <a href={DOCTOR.contact.address.mapsUrl} target="_blank" rel="noreferrer">Geetanjali Hospital, Alwar <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Dr. Himani. All rights reserved.</span>
        <span className="footer-credits">
          Website designed &amp; developed by{' '}
          <a
            href="https://pixeltocloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="credit-link"
          >
            PixelToCloud (pixeltocloud.com)
          </a>
        </span>
        <span>Appointments and available services are confirmed by the clinic.</span>
      </div>
    </footer>
  );
}

