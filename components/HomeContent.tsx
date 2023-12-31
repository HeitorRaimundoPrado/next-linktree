import style from '@/style/HomeContent.module.scss'

const HomeContent = () => {
  return (
    <div>
      <main>
        <header className={style.main_header}>
          <h1>Welcome to Your Link sharing App</h1>
          <h2>Share all your important links in one place.</h2>
        </header>

        <div className={style.content}>
          <section className="how-to-use">
            <h2>How to Use</h2>
            <p>Follow these simple steps to get started:</p>
            <ol>
              <li>Create an account or log in.</li>
              <li>Add your links to your profile.</li>
              <li>Share your unique profile link with others.</li>
            </ol>
          </section>

          <section className="contact">
            <h2>Contact</h2>
            <p>If you have any questions or need support, you can reach us at:</p>
            <p>Email: heitorrdpp@example.com</p>
          </section>

          <section className="github">
            <h2>GitHub</h2>
            <p>Check out our project on GitHub:</p>
            <a href="https://github.com/HeitorRaimundoPrado/next-linktree" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </section>


        </div>
      </main>
    </div>
  )
}
export default HomeContent;
