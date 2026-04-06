export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container py-8 text-gray-600">
        <div className="flex justify-between items-center">
          <p>© {new Date().getFullYear()} SHT. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
