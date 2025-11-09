// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-10 mt-10 border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-extrabold text-sky-600 mb-3">Doctor App</h2>
          <p className="text-sm leading-6 text-gray-500">
            Find and book top-rated doctors with ease. We’re committed to helping you manage your health effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-sky-700 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-sky-600 transition">Home</a></li>
            <li><a href="/AllDoctor" className="hover:text-sky-600 transition">Doctors</a></li>
            <li><a href="/" className="hover:text-sky-600 transition">About</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-sky-700 mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="os6100050@gmail.com" className="hover:text-sky-600 transition">"os6100050@gmail.com</a></li>
            <li>Phone: +20 111 746 9746</li>
            <li>Address: Cairo, Egypt</li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-4 text-xl text-gray-500">
            <a href="#" className="hover:text-sky-500 transition transform hover:scale-110">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-sky-400 transition transform hover:scale-110">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-pink-400 transition transform hover:scale-110">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-sky-600">Doctor App</span>. All rights reserved.
      </div>
    </footer>
  );
}
