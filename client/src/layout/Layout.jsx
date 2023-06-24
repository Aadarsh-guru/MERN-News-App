import { Helmet } from 'react-helmet'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children, title, description, keywords }) => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <title>{title}</title>
            </Helmet>
            <header>
                <Header />
                <Toaster />
            </header>
            <main style={{ minHeight: '100vh' }}>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

Layout.defaultProps = {
    title: 'Inshorts News App',
    description: "Inshorts News App - Read any news in just 60 words within a minute.",
    keywords: "News Daily-News Trending news short-news sport-news tech-news"
}

export default Layout