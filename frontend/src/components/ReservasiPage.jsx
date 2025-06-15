import React, { useEffect, useState, useRef } from 'react'; // Added useRef
import axios from 'axios';
import '../reservasi.css'; // Make sure this CSS file is updated
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

// Initialize AOS once
AOS.init();

const ReservasiPage = () => {
    // Reference for the doctor container to enable horizontal scroll
    const dokterContainerRef = useRef(null);

    // --- State Variables for Form ---
    const [users, setUsers] = useState([]);
    const [dokters, setDokters] = useState([]);
    const [jadwalList, setJadwalList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(''); // Will be populated with the logged-in user's ID
    const [selectedSpesialis, setSelectedSpesialis] = useState('');
    const [selectedDokterId, setSelectedDokterId] = useState('');
    const [selectedJadwalId, setSelectedJadwalId] = useState('');
    const [selectedTanggal, setSelectedTanggal] = useState(''); // For the date input
    const [pesanTambahan, setPesanTambahan] = useState(''); // For the textarea
    const [loading, setLoading] = useState(true); // Loading state for initial data fetch
    const [error, setError] = useState(null); // Error state for initial data fetch

    // States for user's photo and name to display, and their contact info
    const [selectedUserPhoto, setSelectedUserPhoto] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [selectedUserPhone, setSelectedUserPhone] = useState('');

    // New state for controlling the success popup
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch all necessary data: users, doctors, schedules
                const [usersRes, doktersRes, jadwalRes] = await Promise.all([
                    axios.get('http://localhost:5000/users'),
                    axios.get('http://localhost:5000/dokters'),
                    axios.get('http://localhost:5000/jadwal'),
                ]);

                setUsers(usersRes.data); // This updates the 'users' state
                setDokters(doktersRes.data);
                setJadwalList(jadwalRes.data);

                // --- LOGIC FOR SIMULATING LOGGED-IN USER ---
                // Look for user with ID 2. If not found, fallback to the first user.
                if (usersRes.data.length > 0) {
                    const loggedInUser = usersRes.data.find(user => user.id === 2); // Find user with ID 2
                    if (loggedInUser) { // If user with ID 2 is found
                        setSelectedUser(loggedInUser.id.toString());
                        setSelectedUserName(loggedInUser.nama);
                        setSelectedUserEmail(loggedInUser.email || 'N/A');
                        setSelectedUserPhone(loggedInUser.no_tlp || 'N/A');
                    } else {
                        // Fallback if user with ID 2 is not found, take the first user if available
                        console.warn("User with ID 2 not found. Using the first user as fallback.");
                        const firstUser = usersRes.data[0];
                        setSelectedUser(firstUser.id.toString());
                        setSelectedUserName(firstUser.nama);
                        setSelectedUserEmail(firstUser.email || 'N/A');
                        setSelectedUserPhone(firstUser.no_tlp || 'N/A');
                    }
                }

            } catch (err) {
                console.error('Failed to fetch data for reservation page:', err);
                setError("Failed to load reservation data. Ensure the backend server is running and data is available.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // This effect runs only once when the component mounts

    // --- Update User Photo, Name, Email, and Phone on User Selection (Now automatic) ---
    // This effect will now respond to changes in selectedUser which is set automatically when data loads
    useEffect(() => {
        const user = users.find(u => u.id === parseInt(selectedUser));
        if (user) {
            const photoUrl = user.foto ? `http://localhost:5000/images/${user.foto}` : '';
            setSelectedUserPhoto(photoUrl);
            // selectedUserName is already set in the first useEffect, no need to reset here
            setSelectedUserEmail(user.email || 'N/A');
            setSelectedUserPhone(user.no_tlp || 'N/A');
        } else {
            // If no user is selected (e.g., no data yet or first user not found)
            setSelectedUserPhoto('');
            // selectedUserName is not reset here as it's set in the first useEffect
            setSelectedUserEmail('');
            setSelectedUserPhone('');
        }
    }, [selectedUser, users]); // Depends on selectedUser and users

    // ✅ Horizontal scroll effect with mouse drag
    useEffect(() => {
        const wrapper = dokterContainerRef.current;
        if (!wrapper) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            wrapper.classList.add('scrolling');
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            wrapper.classList.remove('scrolling');
        };

        const handleMouseUp = () => {
            isDown = false;
            wrapper.classList.remove('scrolling');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1.5;
            wrapper.scrollLeft = scrollLeft - walk;
        };

        wrapper.addEventListener('mousedown', handleMouseDown);
        wrapper.addEventListener('mouseleave', handleMouseLeave);
        wrapper.addEventListener('mouseup', handleMouseUp);
        wrapper.addEventListener('mousemove', handleMouseMove);

        return () => {
            wrapper.removeEventListener('mousedown', handleMouseDown);
            wrapper.removeEventListener('mouseleave', handleMouseLeave);
            wrapper.removeEventListener('mouseup', handleMouseUp);
            wrapper.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); // Empty dependency array so it runs only once on component mount

    // --- Form Submission Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!selectedUser || !selectedSpesialis || !selectedDokterId || !selectedJadwalId || !selectedTanggal) {
            alert("Please complete all selections (Specialist, Doctor, Arrival Time, Date) before submitting the reservation.");
            return;
        }

        try {
            // Send reservation data to your backend
            await axios.post('http://localhost:5000/janji', {
                userId: parseInt(selectedUser), // Ensure userId is an integer
                dokterId: parseInt(selectedDokterId), // Ensure dokterId is an integer
                jadwalId: parseInt(selectedJadwalId), // Ensure jadwalId is an integer
                tanggal: selectedTanggal, // Include the selected date
                status: 'pending', // Default status for a new reservation
                catatan: pesanTambahan // Include additional message
            });

            // Show the custom success popup instead of navigating
            setShowSuccessPopup(true);

            // Optionally, reset form fields here after successful submission
            // Only reset fields that the user can still change
            setSelectedSpesialis('');
            setSelectedDokterId('');
            setSelectedJadwalId('');
            setSelectedTanggal('');
            setPesanTambahan('');

        } catch (err) {
            console.error('Failed to submit reservation:', err.response?.data || err.message || err);
            alert('Failed to submit reservation. Please try again or contact the administrator.');
        }
    };

    // Find the selected doctor object to display their photo
    const selectedDokter = dokters.find(d => d.id === parseInt(selectedDokterId));

    // --- Loading and Error States ---
    if (loading) {
        return (
            <section className="hero is-fullheight is-info is-bold">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">Loading reservation data...</p>
                        <progress className="progress is-small is-primary" max="100"></progress>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="hero is-fullheight is-danger is-bold">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">An Error Occurred</p>
                        <p className="subtitle">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div className="reservation-container">
            {/* Success Popup Modal */}
            {showSuccessPopup && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content has-text-centered p-5" style={styles.successPopup}>
                        <h3 className="title is-4 has-text-white">Reservation Successful!</h3>
                        <p className="subtitle is-6 has-text-white">Your reservation has been successfully submitted and is awaiting confirmation. Please check your email regularly.</p>
                        <button
                            className="button is-primary is-light mt-4"
                            onClick={() => setShowSuccessPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="reservation-hero" data-aos="fade-down" data-aos-duration="1000">
                <h1 className="animate__animated animate__fadeInDown">BEST CARING BETTER DOCTOR</h1>
                <p className="breadcrumb">Your Health is Our Priority</p>
            </div>

            {/* Back to Landing Page Button */}
            <div className="has-text-centered" style={{ margin: '20px 0' }}>
                <a href="/" className="button is-primary is-medium animate__animated animate__fadeInUp">
                    ← Back to Landing Page
                </a>
            </div>

            {/* Reservation Form */}
            <motion.div
                className="reservation-form-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2>ONLINE RESERVATION</h2>
                <p>
                    Fill out the form below to schedule your health appointment at Hafizh Clinic.
                    We are committed to providing the best service.
                </p>

                <form className="reservation-form" onSubmit={handleSubmit}>
                    {/* First Form Group: Date and Full Name (Read-only Dropdown with one option) */}
                    <div className="form-group">
                        {/* Date Picker */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="reservation-date">Date</label>
                            <input
                                id="reservation-date"
                                className="input-style"
                                type="date"
                                placeholder="mm/dd/yyyy"
                                value={selectedTanggal}
                                onChange={(e) => setSelectedTanggal(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        {/* Full Name (Dropdown, now not disabled, only has one option) */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="reservation-user">Full Name</label>
                            <div className="select-style">
                                <select
                                    id="reservation-user"
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                    required
                                >
                                    {/* Displaying only one option: the logged-in user */}
                                    {selectedUser && selectedUserName ? (
                                        <option value={selectedUser}>{selectedUserName}</option>
                                    ) : (
                                        <option value="">Loading User Name...</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Display selected user's photo (if available) */}
                    {selectedUserPhoto && (
                        <div className="has-text-centered mt-4 mb-4">
                            <figure className="image is-96x96 is-inline-block">
                                <img
                                    className="is-rounded"
                                    src={selectedUserPhoto}
                                    alt={selectedUserName || "User Avatar"}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        console.log('Error loading user photo:', selectedUserPhoto);
                                    }}
                                />
                            </figure>
                            {!selectedUserPhoto && selectedUserName && (
                                <div style={styles.avatarPlaceholder}>
                                    {selectedUserName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <p className="has-text-weight-semibold mt-2">{selectedUserName}</p>
                        </div>
                    )}

                    {/* New Form Group for Specialist and Doctor */}
                    <div className="form-group">
                        {/* Specialist */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="reservation-spesialis">Specialist</label>
                            <div className="select-style">
                                <select
                                    id="reservation-spesialis"
                                    value={selectedSpesialis}
                                    onChange={(e) => {
                                        setSelectedSpesialis(e.target.value);
                                        setSelectedDokterId(''); // Reset doctor
                                        setSelectedJadwalId(''); // Reset schedule
                                    }}
                                    required
                                >
                                    <option value="">Select Specialist</option>
                                    {dokters.length === 0 ? (
                                        <option disabled>No specialist data available</option>
                                    ) : (
                                        // Use Set to get unique specialists
                                        [...new Set(dokters.map((d) => d.spesialis))].map((sp, index) => (
                                            <option key={index} value={sp}>{sp}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Doctor (conditionally rendered) */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="reservation-dokter">Doctor</label>
                            <div className="select-style">
                                <select
                                    id="reservation-dokter"
                                    value={selectedDokterId}
                                    onChange={(e) => {
                                        setSelectedDokterId(e.target.value);
                                        setSelectedJadwalId(''); // Reset schedule
                                    }}
                                    required
                                    disabled={!selectedSpesialis} // Disable if no specialist is selected
                                >
                                    <option value="">Select Doctor</option>
                                    {dokters.filter((d) => d.spesialis === selectedSpesialis).length === 0 ? (
                                        <option disabled>No doctors available for this specialist</option>
                                    ) : (
                                        dokters
                                            .filter((d) => d.spesialis === selectedSpesialis)
                                            .map((dokter) => (
                                                <option key={dokter.id} value={dokter.id}>
                                                    {dokter.nama}
                                                </option>
                                            ))
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Display selected doctor's photo (if available) */}
                    {selectedDokter && selectedDokter.foto && (
                        <div className="has-text-centered mt-4 mb-4">
                            <figure className="image is-128x128 is-inline-block">
                                <img
                                    className="is-rounded"
                                    src={`http://localhost:5000/images/${selectedDokter.foto}`}
                                    alt={selectedDokter.nama}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/128/d1c4e9/5e35b1?text=Doctor'; // Fallback
                                        console.log('Error loading doctor photo:', `http://localhost:5000/images/${selectedDokter.foto}`);
                                    }}
                                />
                            </figure>
                            <p className="has-text-weight-semibold mt-2">{selectedDokter.nama}</p>
                            <p className="has-text-grey is-size-7">{selectedDokter.spesialis}</p>
                        </div>
                    )}

                    {/* Second Form Group: Email Address and Number of Guests */}
                    <div className="form-group">
                        {/* Email Address (Read-only from selected user) */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="user-email">Email Address</label>
                            <input
                                id="user-email"
                                className="input-style"
                                type="email"
                                placeholder="Email Address"
                                value={selectedUserEmail}
                                readOnly
                                disabled={!selectedUser}
                            />
                        </div>

                        {/* Number of Guests (Disabled, not applicable) */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="jumlah-tamu">Number of Guests</label>
                            <input
                                id="jumlah-tamu"
                                className="input-style"
                                type="number"
                                placeholder="Number of Guests (Not Applicable)"
                                min="1"
                                value="" // Keep value empty
                                disabled // Disable
                            />
                        </div>
                    </div>

                    {/* Third Form Group: Arrival Time (Schedule Select) and Phone Number */}
                    <div className="form-group">
                        {/* Arrival Time (Schedule Select) */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="reservation-time">Arrival Time</label>
                            <div className="select-style">
                                <select
                                    id="reservation-time"
                                    value={selectedJadwalId}
                                    onChange={(e) => setSelectedJadwalId(e.target.value)}
                                    required
                                    disabled={!selectedDokterId} // Disable until doctor is selected
                                >
                                    <option value="">Arrival Time</option>
                                    {jadwalList.length === 0 ? (
                                        <option disabled>No schedule available</option>
                                    ) : (
                                        jadwalList.map((jadwalItem) => (
                                            <option key={jadwalItem.id} value={jadwalItem.id}>
                                                {jadwalItem.hari} - {jadwalItem.waktu}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Phone Number (Read-only from selected user) */}
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="user-phone">Phone Number</label>
                            <input
                                id="user-phone"
                                className="input-style"
                                type="tel"
                                placeholder="Phone Number"
                                value={selectedUserPhone}
                                readOnly
                                disabled={!selectedUser}
                            />
                        </div>
                    </div>

                    {/* Additional Message or Notes (Textarea) */}
                    <div className="form-group full-width">
                        <div className="form-field-wrapper">
                            <label className="label-hidden" htmlFor="additional-message">Additional Message or Notes (max 300 characters)</label>
                            <textarea
                                id="additional-message"
                                className="textarea-style"
                                placeholder="Additional Message or Notes (max 300 characters)"
                                value={pesanTambahan}
                                onChange={(e) => setPesanTambahan(e.target.value)}
                                maxLength={300}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    <button type="submit" className="btn-submit">RESERVATION →</button>
                </form>
            </motion.div>

            {/* --- Content from LandingPage (Doctor List, About Us, Services, Contact) --- */}
            {/* Doctor List */}
            <section id="dokter" className="section has-background-light">
                <h2 className="title has-text-black has-text-centered mb-6" data-aos="fade-up">
                    Doctor List
                </h2>

                {/* Wrapper for horizontal scroll, attached with ref */}
                <div className="dokter-scroll-wrapper" ref={dokterContainerRef}>
                    {/* Content for horizontal scroll */}
                    <div className="dokter-scroll-content">
                        {/* Duplicate doctors to create a continuous scroll effect */}
                        {[...dokters, ...dokters].map((dokter, index) => (
                            <div key={index} className="dokter-card-column">
                                <div className="box dokter-card-content" data-aos="zoom-in" data-aos-delay={index * 100}>
                                    <img
                                        src={`http://localhost:5000/images/${dokter.foto}`}
                                        alt={dokter.nama}
                                        onError={(e) => { e.target.src = '/default-foto.png'; }} // Fallback image
                                    />
                                    <h3 className="subtitle is-5">{dokter.nama}</h3>
                                    <p>{dokter.spesialis}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="about" className="section">
                <div className="container">
                    <div className="columns is-vcentered is-variable is-8">
                        <div className="column is-6 has-text-centered" data-aos="zoom-in">
                            <figure className="image is-4by3" style={{ overflow: 'hidden', borderRadius: '12px' }}>
                                <img
                                    src="/dokterr.jpg"
                                    alt="Clinic Illustration"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                    }}
                                    className="animate__animated animate__fadeIn"
                                />
                            </figure>
                        </div>
                        <div className="column is-6 has-text-left" data-aos="fade-left">
                            <h2 className="title is-3 has-text-black mb-3">
                                About <span style={{ color: 'var(--primary)' }}>Our Clinic</span>
                            </h2>
                            <p className="subtitle is-5 has-text-black mb-4">
                                Klinik Sehat has been established since 2010 and is committed to providing quality healthcare services.
                            </p>
                            <p className="has-text-black mb-4">
                                We serve various health needs from general check-ups, vaccinations, to modern laboratory services. Always prioritizing patient comfort and safety.
                            </p>
                            <a href="/tentang"
                                className="button is-primary is-light animate__animated animate__fadeInUp"
                                data-aos="fade-up"
                                data-aos-delay="500"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="section has-background-light">
                <div className="container">
                    <h2 className="title has-text-black has-text-centered mb-6" data-aos="fade-up">Our Services</h2>
                    <div className="columns is-multiline is-centered">
                        {[
                            { icon: 'fa-stethoscope', color: 'info', title: 'General Check-up', desc: 'General health services for all ages.' },
                            { icon: 'fa-syringe', color: 'success', title: 'Vaccination', desc: 'Various types of vaccines available for children and adults.' },
                            { icon: 'fa-vials', color: 'danger', title: 'Laboratory', desc: 'Blood, urine, and other examinations.' }
                        ].map((item, i) => (
                            <div key={i} className="column is-one-third" data-aos="fade-up" data-aos-delay={i * 300}>
                                <div className="box has-text-centered">
                                    <span className={`icon is-large has-text-${item.color} mb-3`}>
                                        <i className={`fas ${item.icon} fa-2x`}></i>
                                    </span>
                                    <h3 className="subtitle is-5 has-text-black">{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="section" data-aos="fade-up">
                <div className="container has-text-centered">
                    <h2 className="title has-text-black has-text-centered ">Contact Us</h2>
                    <p>📍 Address: Jl. Kesehatan No.10, Bandung, Indonesia</p>
                    <p>📞 Phone: (62) 87263817263</p>
                    <p>📧 Email: @klinikhafizh.com</p>
                </div>
            </section>

            <motion.footer
                style={{ backgroundColor: "#0d6efd", color: "white" }}
                className="footer has-text-centered animate__animated animate__fadeIn"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="content">
                    <p>&copy; 2025 Klinik Hafizh. All rights reserved.</p>
                </div>
            </motion.footer>
        </div>
    );
};

// Styles for avatar placeholder
const styles = {
    avatarPlaceholder: {
        width: '96px',
        height: '96px',
        borderRadius: '50%',
        backgroundColor: '#D1C4E9',
        color: '#5E35B1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '2em',
        margin: '10px auto',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    // Styles for the success popup modal
    successPopup: {
        backgroundColor: 'var(--primary)',
        borderRadius: '12px',
        maxWidth: '400px',
        margin: 'auto',
        position: 'relative',
        zIndex: '1001',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

    },
};

export default ReservasiPage;
