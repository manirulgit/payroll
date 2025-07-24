function Contact() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Contact Us</h1>
            <p>If you have any questions, feel free to reach out!</p>
            <form>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder="Your Name" style={{ padding: '10px', width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="email" placeholder="Your Email" style={{ padding: '10px', width: '300px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <textarea placeholder="Your Message" style={{ padding: '10px', width: '300px', height: '100px' }}></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}>Send</button>
            </form>
        </div>
    );
}
export default Contact;