import Link from "next/link";
import style from '@/style/Footer.module.scss'

const Footer = () => {
  return (
    <footer className={style.footer_container}>
      <div >
        <h2>Share your Link</h2>
      </div>

      <div>
        <h2>Pages</h2>
        <ul>
          <li><Link href="/">Home</Link></li>
        </ul>
      </div>

      <div>
        <h2>Contact</h2>
        <ul>

          <li>
            <a href="https://github.com/HeitorRaimundoPrado" rel="noreferrer" target='_blank'>GitHub Heitor</a>
          </li>
        </ul>
      </div>

      <div>
        <h2 className='h2_sobre'>About</h2>
        <ul>
          <li>
            <Link href="/">
              How To Use
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
export default Footer;
