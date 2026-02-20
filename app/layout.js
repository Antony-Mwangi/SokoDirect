import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "SokoDirect",
  description: "Turn your daily sales into credit power",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* We use a standard style tag with 'nonce' or global support in App Router */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          body {
            display: flex;
            flex-direction: column;
            font-family: 'Inter', -apple-system, sans-serif;
            background-color: #f9fafb;
            color: #111827;
            min-height: 100vh;
          }
          main {
            flex: 1;
            width: 100%;
          }
        `}} />
        
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}