import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostDataById } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/Utils.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';

interface PostDataInterface {
    postData: {
        title: string,
        date: string,
        contentHtml: string
    }
};

export default function Post({ postData }: PostDataInterface) {
    return (
        <Layout>
            <Head>
                <title>{ postData.title }</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{ postData.title }</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={ postData.date } />
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
            </article>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostDataById(params.id as string);
    return {
        props: {
            postData
        }
    }
}