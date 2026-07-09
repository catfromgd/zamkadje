import { useState, useEffect } from 'react'
import './App.css'
import BikeMap from './components/veloMap/BikeMap'
import Velo from './components/velo/Velo'


function App() {
  // Если юзер зашел через velo.твойсайт.ру
  if (window.location.hostname.startsWith('velo.')) {
    return <Velo />
  }






  const [showCookies, setShowCookies] = useState(false)
  const [showWIPModal, setShowWIPModal] = useState(false) // Стейт для модалки недоделанного сайта

  useEffect(() => {
    // Проверка для куки (живет долго)
    const isAccepted = localStorage.getItem('cookies_ok')
    if (!isAccepted) setShowCookies(true)

    // Проверка для модалки "WIP" (показывается один раз за сессию в браузере)
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



  return (
    <div className={styles.site - wrapper}>
      {/* МОДАЛЬНОЕ ОКНО: Сайт не доделан */}
      {showWIPModal && (
        <div className={styles.modal - overlay}>
          <div className={styles.modal - content}>
            <h2>⚠️ это НЕрабочий сайт</h2>
            <p>я выложил это в сеть, чтобы нормально протестировать</p>
            <p>это прост мой сайт не ищите тут смысла</p>
            <button className={styles.modal - btn} onClick={closeWIPModal}>
              Я понял, пусти
            </button>
          </div>
        </div>
      )}

      {/* Шапка твоего личного сайта */}
      <header className={styles.main - header}>
        <div className={styles.logo}>
          <a href="/">zamkadje.xyz</a>
        </div>
        <nav className={styles.nav - links}>
          <a href="#about">Обо мне</a>
          <a href="#projects">Мои проекты</a>
          <a href="https://yourdomain.com" className={styles.nav - btn} target="_blank" rel="noreferrer">
            ВелоКарта
          </a>
        </nav>
      </header>

      {/* Основной контент */}
      <main className={styles.main - content}>
        <section id="about" className={styles.hero - section}>
          <h1>Привет, это мой сайт</h1>
          <p>njklnjklnknlknlknljnlknlkj</p>
        </section>

        {/* Контейнер с проектами */}
        <section id="projects" className={styles.projects - section}>
          <h2>Мои проекты</h2>

          <div className="project-card featured">
            <div className={styles.project - info}>
              <h3>Интерактивная ВелоКарта</h3>
              <p>меня прост бесит что надо вечно искать где-то веломаршруты в карту се чтоб по ним ездить (я то большой фанат велоспорта), поэтому решил сделать это.</p>
              <p>так то не расчитываю на то, что это кто-то использовать будет, но вроде прикольная идея</p>
              <p>собственно, для чего я это выложил вообще: у меня по идейке кнопка ниже должна переводить пользователя на velo.zamkadje.xyz</p>
              <a href="https://velo.zamkadje.xyz" className={styles.project - link - btn} target="_blank" rel="noreferrer">
                Открыть ↗
              </a>
            </div>

            <div className={styles.project - demo - embed}>
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
      <footer className={styles.main - footer}>
        <p>&copy; {new Date().getFullYear()} zamkadje.xyz. хз зачем оно нужно.</p>
        <div className={styles.footer - meta}>
          <a href="#privacy">Конфиденциальность (оно никуда не ведёт)</a>
          <a href="#terms">Соглашение (оно тоже)</a>
        </div>
      </footer>

      {/* Баннер куки */}
      {showCookies && (
        <div className={styles.cookie - banner}>
          <p>Этот сайт использует куки (не использует, но зато сайт пустым не кажется).</p>
          <button onClick={acceptCookies}>Ладно</button>
        </div>
      )}
    </div>
  )
}

export default App
