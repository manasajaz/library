import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../adminScreen/login";
import Signup from "../adminScreen/signup";
import Home from "../adminScreen/home";
import GetUser from "../adminScreen/getuser";
import AddBook from "../adminScreen/addbook";
import Dashboard from "../adminScreen/admindashboard"
import EditUser from "../adminScreen/edituser"
import EditBook from "../adminScreen/editbook"
import UserRegister from "../adminScreen/adduser"
import BookDetails from "../adminScreen/bookdetails";
import Faqsform from "../adminScreen/faqsform";
import Faqs from "../adminScreen/faqs";
import Testimonials from "../adminScreen/testimonials";
import TestimonialsForms from "../adminScreen/testimonialform"
import EditTestimonial from '../adminScreen/edittestimonial';
import Editfaqs from '../adminScreen/editfaqs';
import Blogs from '../adminScreen/blogs';
import Orders from "../adminScreen/orders";


export default function AppRouter() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="orders" element={<Orders />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="getuser" element={<GetUser />} />
          <Route path="adduser" element={<UserRegister />} />
          <Route path="addbook" element={<AddBook />} />
          <Route path="book" element={<Home />} />
          <Route path="faqsform" element={<Faqsform />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="testimonialform" element={< TestimonialsForms />} />
          <Route path="bookdetails/:id" element={<BookDetails />} />
          <Route path="admindashboard/*" element={<Dashboard />} />
          <Route path="edituser/:id" element={<EditUser />} />
          <Route path="editbook/:id" element={<EditBook />} />
          <Route path="editfaqs/:id" element={<Editfaqs />} />
          <Route path="edittestimonial/:id" element={<EditTestimonial />} />


        </Routes>
      </Router>
    </>
  );
}
