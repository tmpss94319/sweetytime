import React, { useState, useEffect } from 'react';
import Styles from './header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

// 功能還沒寫

export default function Header(props) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header className={Styles['header']}>
      <Link href={'/productList'} className={Styles['bigLink']}>
        Products
      </Link>

      <Link href={'/shopList'} className={Styles['bigLink']}>
        Shops
      </Link>

      <Link href={'/LessonList'} className={Styles['bigLink']}>
        Lessons
      </Link>

      <div className={Styles['halfCircle']}>
        <Link href={'/'}>
          <Image
            className={Styles['logo']}
            src={'/icon/sweet_time_logo1.png'}
            alt=""
            width={93}
            height={50}
          />
        </Link>
      </div>

      <Link href={'/TeacherList'} className={Styles['bigLink']}>
        Teachers
      </Link>

      <Link href={'/News'} className={Styles['bigLink']}>
        News
      </Link>

      <div className={`${Styles['icons']} ${Styles['bigLink']}`}>
        <Link href={'/'} className={Styles['icon']}>
          <Image
            src={'/icon/portrait.svg'}
            alt=""
            width={30}
            height={30}
          />
        </Link>
        <Link href={'/cart'}>
          <Image src={'/icon/cart.svg'} alt="" width={25} height={25} />
        </Link>
      </div>

      <Link href={'/'} className={Styles['smallLink']}>
        <Image
          src={'/icon/sweet_time_logo1.png'}
          alt=""
          width={74}
          height={40}
        />
      </Link>
      <Link href="/" className={`${navOpen ? Styles['openLink'] : Styles['smallLink']}`} onClick={() => {setNavOpen(!navOpen);}}>
        <Image src={'/icon/navButton.svg'} alt="" width={25} height={25} />
      </Link>
    </header>
  );
}
