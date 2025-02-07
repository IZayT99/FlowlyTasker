import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col items-center text-center">
          <Link href="/#" aria-current="page" className="flex gap-2 items-center mb-4">
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              priority={true}
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <strong className="font-extrabold tracking-tight text-lg">{config.appName}</strong>
          </Link>
          <p className="text-sm text-base-content/80 mb-2">{config.appDescription}</p>
          <p className="text-sm text-base-content/60">Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </div>
        
        <div className="flex flex-wrap justify-center mt-10 text-center">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-10">
            <div className="footer-title font-semibold text-base-content tracking-widest text-sm mb-3">LINKS</div>
            <div className="flex flex-col gap-2 text-sm">
              {config.resend.supportEmail && (
                <a href={`mailto:${config.resend.supportEmail}`} target="_blank" className="link link-hover">Support</a>
              )}
              <Link href="/#pricing" className="link link-hover">Pricing</Link>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-10">
            <div className="footer-title font-semibold text-base-content tracking-widest text-sm mb-3">LEGAL</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/tos" className="link link-hover">Terms of services</Link>
              <Link href="/privacy-policy" className="link link-hover">Privacy policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
