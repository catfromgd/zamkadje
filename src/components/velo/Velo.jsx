import { useState, useEffect } from 'react'
import BikeMap from '../veloMap/BikeMap'
import styles from './components/velo/velo.module.css'

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
    <div className={styles.Velo-container}>
      {/* Шапка сайта */}
      <header className={styles.site-header}>
        <div className={styles.header-logo}>
          <a href="/">VeloProject</a>
        </div>
        <nav className={styles.header-nav}>
          <a href="#about">О проекте</a>
          <a href="#features">Возможности</a>
          <a href="https://veloproject.ru" className={styles.nav-btn-primary} target="_blank" rel="noreferrer">
            Открыть карту ↗
          </a>
        </nav>
      </header>

      {/* Основной контент страницы */}
      <main className={styles.site-main}>
        <section className={styles.hero-section}>
          <h1>Интерактивная карта для велосипедистов</h1>
          <p>Находи лучшие маршруты, парковки и веломастерские в один клик.</p>
          <a href="#map-preview" className={styles.cta-button}>Смотреть демо</a>
        </section>

        {/* Секция, куда интегрирован твой модуль карты */}
        <section id="map-preview" className={styles.map-section}>
          <h2>Превью модуля карты</h2>
          <div className={styles.map-wrVeloer}>
            <BikeMap />
          </div>
        </section>
      </main>

      {/* Подвал сайта */}
      <footer className={styles.site-footer}>
        <div className={styles.footer-content}>
          <p>&copy; {new Date().getFullYear()} VeloProject. Все права защищены.</p>
          <div className={styles.footer-links}>
            <a href="#privacy">Политика конфиденциальности</a>
            <a href="#terms">Условия использования</a>
          </div>
        </div>
      </footer>

      {/* Уведомление о Cookie-файлах */}
      {showCookies && (
        <div className={styles.cookie-banner}>
          <div className={styles.cookie-text}>
            Мы используем файлы cookie, чтобы улучшить работу сайта и сделать его удобнее.
          </div>
          <button className={styles.cookie-btn} onClick={acceptCookies}>
            Принять
          </button>
        </div>
      )}
    </div>
  )
}

export default Velo;
