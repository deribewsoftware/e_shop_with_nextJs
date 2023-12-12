import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import  {MdFacebook,} from 'react-icons/md'
import  {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube,} from 'react-icons/ai'

const Footer = () => {
  return (  <div className="mt-16 bg-slate-700 text-slate-200 text-sm">
    <Container>
      <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">

        <FooterList >
          <h1 className="font-bold mb-2 text-base">Shop Categories</h1>
          <Link href="#">phone</Link>
          <Link href="#">Laptop</Link>
          <Link href="#">Desktop</Link>
          <Link href="#">Watch</Link>
          <Link href="#">Accessiry</Link>
        </FooterList>



        <FooterList >
          <h1 className="font-bold mb-2 text-base">Contact Services</h1>
          <Link href="#">phone</Link>
          <Link href="#">Laptop</Link>
          <Link href="#">Desktop</Link>
          <Link href="#">Watch</Link>
          <Link href="#">Accessiry</Link>
        </FooterList>


        <FooterList >
          <h1 className="font-bold mb-2 text-base">CAbout us</h1>
          <p className="mb-2">
          You: That sounds wonderful! I ve been keeping busy too. I had a meeting earlier, but now I have some free time to chat with you, which always makes my day better. Any exciting plans for the rest of the day?

Liya: I m glad we both have some time to connect. Well, after work, I m planning to meet up with some friends for dinner. We're trying out a new restaurant in town. Im really looking forward to it. How about you? Any fun plans on your end?
          </p>
          <p>&copy; {new Date().getFullYear()} E-Shop All Rights reserved</p>
        </FooterList>

        <FooterList >
          <h1 className="font-bold mb-2 text-base">Follows</h1>
          <div className="flex gab:2">
          <Link href="#"><MdFacebook size={24}/></Link>
          <Link href="#"><AiFillTwitterCircle size={24}/></Link>
          <Link href="#"><AiFillInstagram size={24}/></Link>
          <Link href="#"><AiFillYoutube size={24}/></Link>
          </div>
          
        </FooterList>
      </div>
    </Container>
  </div>);
}
 
export default Footer;