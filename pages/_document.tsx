/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Clockify CSV Generator</title>
                <meta property="og:title" content="Clockify CSV Generator" key="title" />
                <meta name="description" content="Clockify CSV Generator is a Next.js project that allows users to convert Toggl and awork CSV files into a Clockify-compatible CSV format. The generated CSV file can be manually uploaded to Clockify for importing time entries. Clockify is a popular time tracking tool used by individuals and teams to monitor their work hours." />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}