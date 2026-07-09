import { useState, useEffect } from 'react'
import BikeMap from './components/veloMap/BikeMap'
import Velo from './components/velo/Velo'
import styles from './App.module.css' // 1. ИСПРАВЛЕНО: Добавлен импорт CSS-модуля

function App() {
  const [showCookies, setShowCookies] = useState(false)
  const [showWIPModal, setShowWIPModal] = useState(false)

  // 2. ИСПРАВЛЕНО: Все хуки теперь находятся строго на самом верху компонента
  useEffect(() => {
    const isAccepted = localStorage.getItem('cookies_ok')
    if (!isAccepted) setShowCookies(true)

    const isWIPNotified = sessionStorage.getItem('wip_notified')
    if (!isWIPNotified) {
      setShowWIPModal(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookies_ok', 'true')
    setShowCookies(false)
  }

  const closeWIPModal = () => {
    sessionStorage.setItem('wip_notified', 'true')
    setShowWIPModal(false)
  }

  // 3. ИСПРАВЛЕНО: Проверка поддомена перенесена ПОСЛЕ хуков
  if (window.location.hostname.startsWith('velo.')) {
    return <Velo />
  }

  return (
    // 4. ИСПРАВЛЕНО: Все классы переведены на camelCase без пробелов и дефисов
    <div className={styles.siteWrapper}>
      {/* МОДАЛЬНОЕ ОКНО: Сайт не доделан */}
      {showWIPModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>⚠️ это НЕрабочий сайт</h2>
            <p>я выложил это в сеть, чтобы нормально протестировать</p>
            <p>это прост мой сайт не ищите тут смысла</p>
            <button className={styles.modalBtn} onClick={closeWIPModal}>
              Я понял, пусти
            </button>
          </div>
        </div>
      )}

      {/* Шапка твоего личного сайта */}
      <header className={styles.mainHeader}>
        <div className={styles.logo}>
          <a href="/">zamkadje.xyz</a>
        </div>
        <nav className={styles.navLinks}>
          <a href="#about">Обо мне</a>
          <a href="#projects">Мои проекты</a>
          <a href="https://velo.zamkadje.xyz" className={styles.navBtn} target="_blank" rel="noreferrer">
            ВелоКарта
          </a>
        </nav>
      </header>

      {/* Основной контент */}
      <main className={styles.mainContent}>
        <section id="about" className={styles.heroSection}>
          <h1>Привет, это мой сайт</h1>
          <p>njklnjklnknlknlknljnlknlkj</p>
        </section>

        {/* Контейнер с проектами */}
        <section id="projects" className={styles.projectsSection}>
          <h2>Мои проекты</h2>

          {/* Внимание: Обычные глобальные классы ("project-card featured") 
              оставляем строками, если они прописаны в глобальном CSS */}
          <div className="project-card featured">
            <div className={styles.projectInfo}>
              <h3>Интерактивная ВелоКарта</h3>
              <p>меня прост бесит что надо вечно искать где-то веломаршруты в карту се чтоб по ним ездить (я то большой фанат велоспорта), поэтому решил сделать это.</p>
              <p>так то не расчитываю на то, что это кто-то использовать будет, но вроде прикольная идея</p>
              <p>собственно, для чего я это выложил вообще: у меня по идейке кнопка ниже должна переводить пользователя на velo.zamkadje.xyz</p>
              <a href="https://velo.zamkadje.xyz" className={styles.projectLinkBtn} target="_blank" rel="noreferrer">
                Открыть ↗
              </a>
            </div>

            <div className={styles.projectDemoEmbed}>
              <BikeMap />
            </div>
          </div>

          <div className="project-card placeholder">
            <h3>Тут могла быть ваша реклама</h3>
            <p>у меня на ноуте отваливается клавиша "о", я пока это печатал всё, она отвалилась уже раз 100, наверное</p>
          </div>
        </section>
      </main>

      {/* Дефолтный футер */}
      <footer className={styles.mainFooter}>
        <p>&copy; {new Date().getFullYear()} zamkadje.xyz. хз зачем оно нужно.</p>
        <div className={styles.footerMeta}>
          <a href="#privacy">Конфиденциальность (оно никуда не ведёт)</a>
          <a href="#terms">Соглашение (оно тоже)</a>
        </div>
      </footer>

      {/* Баннер куки */}
      {showCookies && (
        <div className={styles.cookieBanner}>
          <p>Этот сайт использует куки (не использует, но зато сайт пустым не кажется).</p>
          <button className={styles.cookieBannerBtn} onClick={acceptCookies}>Ладно</button>
        </div>
      )}
    </div>
  )
}

export default App
