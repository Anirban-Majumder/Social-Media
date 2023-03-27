import type { GetServerSideProps} from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import Header from '../components/Header'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
	tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
	return (
		<div className='dark:bg-darkgrey'>
		<div className="lg:max-w-7xl mx-auto max-h-screen overflow-hidden">
			<Head>
				<title>Ani's Place</title>
        		<link rel="icon" href="/logo.png" />
				<meta content="Ani's Place " property="og:title"/>
				<meta content="/white_logo.png" property="og:image"/>
        		<meta content="Welcome to Ani's Place. This is a Social Media like Twitter and Instagram. Come check it Out!" name="description"/>
				<meta content="Welcome to Ani's Place. This is a Social Media like Twitter and Instagram. Come check it Out!" name="og:description"/>
			</Head>
			<Toaster/>
			<Header/>
			<main className='grid grid-cols-9'>
				<Sidebar/>
				<Feed tweets={tweets}/>
				<Widgets/>
			</main>
		</div>
		</div>
	)
}


export default Home
export const getServerSideProps: GetServerSideProps = async (context) => {
	const tweets = await fetchTweets()
	return {
		props: {
			tweets,
		}
	}
}