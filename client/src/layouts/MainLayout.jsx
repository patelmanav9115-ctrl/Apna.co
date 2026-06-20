import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;