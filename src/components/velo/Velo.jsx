import { useState, useEffect } from 'react'
import './Velo.css'
import BikeMap from './components/velo/velo.module.css'

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
    <div className="Velo-container">
      {/* Шапка сайта */}
      <header className="site-header">
        <div className="header-logo">
          <a href="/">VeloProject</a>
        </div>
        <nav className="header-nav">
          <a href="#about">О проекте</a>
          <a href="#features">Возможности</a>
          <a href="https://veloproject.ru" className="nav-btn-primary" target="_blank" rel="noreferrer">
            Открыть карту ↗
          </a>
        </nav>
      </header>

      {/* Основной контент страницы */}
      <main className="site-main">
        <section className="hero-section">
          <h1>Интерактивная карта для велосипедистов</h1>
          <p>Находи лучшие маршруты, парковки и веломастерские в один клик.</p>
          <a href="#map-preview" className="cta-button">Смотреть демо</a>
        </section>

        {/* Секция, куда интегрирован твой модуль карты */}
        <section id="map-preview" className="map-section">
          <h2>Превью модуля карты</h2>
          <div className="map-wrVeloer">
            <BikeMap />
          </div>
        </section>
      </main>

      {/* Подвал сайта */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} VeloProject. Все права защищены.</p>
          <div className="footer-links">
            <a href="#privacy">Политика конфиденциальности</a>
            <a href="#terms">Условия использования</a>
          </div>
        </div>
      </footer>

      {/* Уведомление о Cookie-файлах */}
      {showCookies && (
        <div className="cookie-banner">
          <div className="cookie-text">
            Мы используем файлы cookie, чтобы улучшить работу сайта и сделать его удобнее.
          </div>
          <button className="cookie-btn" onClick={acceptCookies}>
            Принять
          </button>
        </div>
      )}
    </div>
  )
}

export default Velo;
