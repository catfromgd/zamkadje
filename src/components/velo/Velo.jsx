import { useState, useEffect } from 'react'
import BikeMap from '../veloMap/BikeMap'
import styles from './velo.module.css'

function Velo() {
  const [showCookies, setShowCookies] = useState(false)

  // Проверяем, соглашался ли пользователь с куки ранее
  useEffect(() => {
    const isAccepted = localStorage.getItem('cookiesAccepted')
    if (!isAccepted) {
      setShowCookies(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowCookies(false)
  }

  return (
    <div className={styles.veloContainer}>
      {/* Шапка сайта */}
      <header className={styles.siteHeader}>
        <div className={styles.headerLogo}>
          <a href="/">VeloProject</a>
        </div>
        <nav className={styles.headerNav}>
          <a href="#about">О проекте</a>
          <a href="#features">Возможности</a>
          <a href="https://veloproject.ru" className={styles.navBtnPrimary} target="_blank" rel="noreferrer">
            Открыть карту ↗
          </a>
        </nav>
      </header>

      {/* Основной контент страницы */}
      <main className={styles.siteMain}>
        <section className={styles.heroSection}>
          <h1>Интерактивная карта для велосипедистов</h1>
          <p>Находи лучшие маршруты, парковки и веломастерские в один клик.</p>
          <a href="#map-preview" className={styles.ctaButton}>Смотреть демо</a>
        </section>

        {/* Секция, куда интегрирован модуль карты */}
        <section id="map-preview" className={styles.mapSection}>
          <h2>Превью модуля карты</h2>
          <div className={styles.mapWrapper}>
            <BikeMap />
          </div>
        </section>
      </main>

      {/* Подвал сайта */}
      <footer className={styles.siteFooter}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} VeloProject. Все права защищены.</p>
          <div className={styles.footerLinks}>
            <a href="#privacy">Политика конфиденциальности</a>
            <a href="#terms">Условия использования</a>
          </div>
        </div>
      </footer>

      {/* Уведомление о Cookie-файлах */}
      {showCookies && (
        <div className={styles.cookieBanner}>
          <div className={styles.cookieText}>
            Мы используем файлы cookie, чтобы улучшить работу сайта и сделать его удобнее.
          </div>
          <button className={styles.cookieBtn} onClick={acceptCookies}>
            Принять
          </button>
        </div>
      )}
    </div>
  )
}

export default Velo;
